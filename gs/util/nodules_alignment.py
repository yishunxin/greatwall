#!/usr/bin/env python
# -*- coding:utf-8 -*-

import numpy as np
import matplotlib.pyplot as plt
import SimpleITK as sitk
import networkx as nx
from networkx import *
from scipy import ndimage as ndi
import time

class Alignment(object):
    def __init__(self, fixed_path, moving_path, fixed_mask_path, moving_mask_path, fixed_spacing, moving_spacing):
        # 如果跟1差距不大就不乘spacing了
        if np.sum(np.abs(1-np.array(fixed_spacing)) > 0.0001) or np.sum(np.abs(1-np.array(moving_spacing)) > 0.0001):
            self.__isSpacing = True
        else:
            self.__isSpacing = False
        self.__fixed_image, self.__fixed_trans = self.__load_image(fixed_path, fixed_mask_path, fixed_spacing)
        self.__fixed_spacing = fixed_spacing
        self.__moving_image, self.__moving_trans = self.__load_image(moving_path, moving_mask_path, moving_spacing)
        self.__moving_spacing = moving_spacing
        self.__final_transform = self.__calculate_transform()

    # 计算对应关系 coords1是fixed_image上的坐标点,
    # coords2是moving_image上的坐标点, spacing是分辨率mm/px, cutoff默认20mm
    def calculate_corres(self, coords1, coords2, cutoff=20):
        coords1_left = coords1[:]
        coords2_left = coords2[:]

        moved_coords2 = []
        for i in xrange(len(coords2)):
            moved_coords2.append(self.__calculate_trans_moving_point(coords2[i]))
        mapping = self.__alignment_nodules(coords1=coords1, coords2=moved_coords2, cutoff=cutoff)

        alignment = []
        for key, value in mapping.items():
            alignment.append([coords1[key], coords2[value]])
            coords1_left.remove(coords1[key])
            coords2_left.remove(coords2[value])

        for coord in coords1_left:
            trans = self.__calculate_trans_fixed_point(coord)
            alignment.append([coord, [-1, -1, int(round(trans[2]))]])

        for coord in coords2_left:
            trans = self.__calculate_trans_moving_point(coord)
            alignment.append([[-1, -1, int(round(trans[2]))], coord])

        return alignment

    def __load_image(self, img_path, mask_path, spacing):
        if img_path.endswith('.npy'):
            image = np.load(img_path)
        elif img_path.endswith('.npz'):
            image = np.load(img_path)['arr_0']
        else:
            raise Exception("wrong image format")

        if mask_path.endswith('.npy'):
            mask = np.load(mask_path)
        elif mask_path.endswith('.npz'):
            mask = np.load(mask_path)['arr_0']
        else:
            raise Exception("wrong mask format")

        mask[mask < 0] = 0
        for i in xrange(mask.shape[2]):
            if np.sum(mask[:,:,i])*(spacing[0]*spacing[0]) < 2500:
                mask[:,:,i] = 0

        ma_index = np.where(mask == True)
        x_min = np.min(ma_index[0])
        x_max = np.max(ma_index[0])
        y_min = np.min(ma_index[1])
        y_max = np.max(ma_index[1])
        z_min = np.min(ma_index[2])
        z_max = np.max(ma_index[2])

        w = x_max - x_min
        h = y_max - y_min
        l = z_max - z_min

        x0 = int(x_min - 0.1 * w if x_min - 0.1 * w > 0 else 0)
        x1 = int(x_max + 0.1 * w if x_max + 0.1 * w < mask.shape[0] - 1 else mask.shape[0] - 1)
        y0 = int(y_min - 0.1 * h if y_min - 0.1 * h > 0 else 0)
        y1 = int(y_max + 0.1 * h if y_max + 0.1 * h < mask.shape[1] - 1 else mask.shape[1] - 1)
        z0 = int(z_min - 0.1 * l if z_min - 0.1 * l > 0 else 0)
        z1 = int(z_max + 0.1 * l if z_max + 0.1 * l < mask.shape[2] - 1 else mask.shape[2] - 1)

        image = image[x0:x1 + 1, y0:y1 + 1, z0:z1 + 1]

        if self.__isSpacing:
            return self.__normalize_image(ndi.zoom(image.astype(np.float32), 0.2 * np.array(spacing))), (x0, y0, z0)
        else:
            return self.__normalize_image(ndi.zoom(image.astype(np.float32), 0.2 )), (x0, y0, z0)

    def __normalize_image(self, image, MIN_BOUND=-1000.0, MAX_BOUND=300.0):
        #The HU bound to filter lung
        image = (image - MIN_BOUND) / (MAX_BOUND - MIN_BOUND)
        image[image > 1] = 1.
        image[image < 0] = 0.
        return image

    def __calculate_transform(self):
        fixed_image = sitk.GetImageFromArray(self.__fixed_image)
        moving_image = sitk.GetImageFromArray(self.__moving_image)

        R = sitk.ImageRegistrationMethod()
        R.SetMetricAsMeanSquares()
        R.SetOptimizerAsRegularStepGradientDescent(0.1, .01, 200)
        R.SetInitialTransform(sitk.AffineTransform(fixed_image.GetDimension()))
        R.SetInterpolator(sitk.sitkLinear)
        return R.Execute(fixed_image, moving_image)

    #计算fixed_image上的对应坐标, (x, y, z)是moving_image上的坐标点
    def __calculate_trans_moving_point(self, point):
        point = np.array(point) - np.array(self.__moving_trans) # moving_image 原点变换
        point = point * self.__moving_spacing if self.__isSpacing else point  #moving zoom变换
        point = [point[2], point[1], point[0]] # x, y, z -> z, y, x,
        transform = self.__final_transform.GetInverse().TransformPoint(point)
        transform = [transform[2], transform[1], transform[0]] #z, y, x -> x, y, z
        transform = transform / self.__fixed_spacing if self.__isSpacing else transform #变换到fixed zoom image上
        return np.array(transform) + np.array(self.__fixed_trans) #变换到最初的fixed_image坐标

    #计算moving_image上的对应坐标, (x, y, z)是fixed_image上的坐标点
    def __calculate_trans_fixed_point(self, coord):
        point = np.array(coord) - np.array(self.__fixed_trans)  # fixed_image 原点变换
        point = point * self.__fixed_spacing if self.__isSpacing else point # fixed zoom变换
        point = [point[2], point[1], point[0]]  # x, y, z -> z, y, x,
        transform = self.__final_transform.TransformPoint(point)
        transform = [transform[2], transform[1], transform[0]]  # z, y, x -> x, y, z
        transform = transform / self.__moving_spacing if self.__isSpacing else transform  # 变换到moving zoom image上
        return np.array(transform) + np.array(self.__moving_trans)  # 变换到moving_image坐标

    def __alignment_nodules(self, coords1, coords2, cutoff):
        FG = nx.Graph()
        for i in xrange(len(coords1)):
            for j in xrange(len(coords2)):
                if self.__isSpacing:
                    dist = np.sqrt(np.sum(((np.array(coords1[i]) - np.array(coords2[j])) * self.__fixed_spacing) ** 2))
                else:
                    dist = np.sqrt(np.sum((np.array(coords1[i]) - np.array(coords2[j])) ** 2))
                if dist > cutoff: continue
                dist = 1000000 - dist
                edge = (i, j + len(coords1), dist)
                FG.add_weighted_edges_from([edge])
        matching = max_weight_matching(FG)

        results = {}
        for key, value in matching.items():
            if key < len(coords1):
                results[key] = value - len(coords1)

        return results

if __name__ == '__main__':
    # now = time.time()
    # img_path1 = '/data2/npydata_pair/lung/1.2.840.113619.2.334.3.2831163956.738.1495762912.902.3_120KV.npz'
    # ma_path1 = '/data2/npydata_pair/lungmask/1.2.840.113619.2.334.3.2831163956.738.1495762912.902.3_120KV.npz'
    # img_path2 = '/data2/npydata_pair/lung/1.3.46.670589.33.1.63602533952399674400002.5282709438601049866.npz'
    # ma_path2 = '/data2/npydata_pair/lungmask/1.3.46.670589.33.1.63602533952399674400002.5282709438601049866.npz'
    # alignment = Alignment(img_path1, img_path2, ma_path1, ma_path2)
    # # print time.time() - now
    # coords1 = [[295,279,7], [280,295,11], [118,297,22], [126,311,30], [226,164,69], [381,191,42]]
    # coords2 = [[138,295,18], [138,363,27], [169,405,62]]
    # result = alignment.calculate_corres(coords1=coords1, coords2=coords2, spacing=[0.8, 0.8, 2.5])
    # print result
    # print time.time() - now

    img_path1 = '/data2/demosys/npydata/lung/1.2.840.113619.2.327.3.2831204209.164.1468576671.915.3.npz'
    ma_path1 = '/data2/demosys/npydata/lungmask/1.2.840.113619.2.327.3.2831204209.164.1468576671.915.3.npz'
    spacing_path1 = '/data2/demosys/npydata/info/1.2.840.113619.2.327.3.2831204209.164.1468576671.915.3.npz'
    spacing1 = np.load(spacing_path1)['new_spacing']
    coords1 = [[312, 292, 18], [171, 251, 34], [339, 300, 60], [241, 262, 95], [159, 292, 36], [153, 341, 99],
             [307, 297, 14], [171, 359, 51], [213, 223, 31]]

    img_path2 = '/data2/demosys/npydata/lung/1.3.46.670589.33.1.63630953149145845500002.5519128645736364977.npz'
    ma_path2 = '/data2/demosys/npydata/lungmask/1.3.46.670589.33.1.63630953149145845500002.5519128645736364977.npz'
    spacing_path2 = '/data2/demosys/npydata/info/1.3.46.670589.33.1.63630953149145845500002.5519128645736364977.npz'
    spacing2 = np.load(spacing_path2)['new_spacing']
    coords2 = [[335, 292, 16], [164, 397, 94], [257, 298, 91], [160, 323, 35], [377, 327, 58], [330, 298, 13],
             [132, 313, 55], [217, 232, 33], [348, 341, 22], [345, 269, 50], [383, 238, 78], [300, 233, 40]]

    img_path3 = '/data2/demosys/npydata/lung/1.3.12.2.1107.5.1.4.73221.30000017112723102483100028233.npz'
    ma_path3 = '/data2/demosys/npydata/lungmask/1.3.12.2.1107.5.1.4.73221.30000017112723102483100028233.npz'
    spacing_path3 = '/data2/demosys/npydata/info/1.3.12.2.1107.5.1.4.73221.30000017112723102483100028233.npz'
    spacing3 = np.load(spacing_path3)['new_spacing']
    coords3 = [[331,316,21],[325,322,16],[371,349,71],[145,397,121],[148,321,45],[255,298,113],[336,366,28],
               [157,243,79],[219,233,41],[390,295,42],[128,248,73],[184,316,77],[170,326,79],[425,338,113],
               [238,369,27],[210,348,46],[347,288,61],[120,302,70]]

    alignment = Alignment(img_path2, img_path1, ma_path2, ma_path1, spacing2, spacing1)
    result = alignment.calculate_corres(coords1=coords2, coords2=coords1)
    print len(result)
    for i in result:
        print i
