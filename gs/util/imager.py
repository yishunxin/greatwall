#-*- coding:utf-8 -*-
import numpy as np
from scipy import ndimage
import SimpleITK as sitk
import time
from gs.util.imageseg import seg_lungmask
import logging

logger = logging.getLogger('gen')

WHOLE_FOLDER = '/masks/whole/'
LUNG_FOLDER = '/masks/lung/'
NODULE_FOLDER = '/masks/nodule/'
LUNGSEG_GOOD_MEAN_MIN = 10000
LUNGSEG_GOOD_NSTD_MAX = 3


'''
This funciton reads a '.mhd' file using SimpleITK and return the image array,
origin and spacing of the image.
X Y Z
'''
def load_itk(filename):
    itkimage = sitk.ReadImage(filename)
    image = sitk.GetArrayFromImage(itkimage)
    # X Y Z
    image = np.transpose(image)
    origin = np.array(itkimage.GetOrigin())
    spacing = np.array(itkimage.GetSpacing())
    print "itk:{} {} {}".format(image.shape, origin, spacing)
    return image, origin, spacing

def load_dicom(filename):
    reader = sitk.ImageSeriesReader()
    dicom_names = reader.GetGDCMSeriesFileNames(filename)
    dicom_names = list(dicom_names)
    dicom_names.reverse()
    reader.SetFileNames(dicom_names)
    itkimage = reader.Execute()
    image = sitk.GetArrayFromImage(itkimage)

    image = np.transpose(image)
    origin = np.array(itkimage.GetOrigin())
    spacing = np.array(itkimage.GetSpacing())
    return image, origin, spacing

def load_dicom_bynames(filenames):
    reader = sitk.ImageSeriesReader()
    reader.SetFileNames(filenames)
    itkimage = reader.Execute()
    image = sitk.GetArrayFromImage(itkimage)

    image = np.transpose(image)
    origin = np.array(itkimage.GetOrigin())
    spacing = np.array(itkimage.GetSpacing())
    return image, origin, spacing

'''
This function is used to convert the world coordinates to voxel coordinates using
the origin and spacing of the ct_scan
'''
def world_2_voxel(world_coordinates, origin, spacing):
    stretched_voxel_coordinates = np.absolute(world_coordinates - origin)
    voxel_coordinates = stretched_voxel_coordinates / spacing
    return voxel_coordinates

'''
This function is used to convert the voxel coordinates to world coordinates using
the origin and spacing of the ct_scan.
'''
def voxel_2_world(voxel_coordinates, origin, spacing):
    stretched_voxel_coordinates = voxel_coordinates * spacing
    world_coordinates = stretched_voxel_coordinates + origin
    return world_coordinates

def seq(start, stop, step=1):
    n = int(round((stop - start)/float(step)))
    if n > 1:
        return([start + step*i for i in range(n+1)])
    else:
        return([])

def resize_spacing(image, raw_origin, raw_spacing, resize_spacing):
    resize_factor = raw_spacing / resize_spacing
    new_real_shape = image.shape * resize_factor
    new_shape = np.round(new_real_shape)
    real_resize = new_shape / image.shape
    resize_image = ndimage.interpolation.zoom(image, real_resize)
    # padding to input shape
    # size = image.shape[0]
    # original_shape = resize_image.shape
    # offset = (size - original_shape[1])
    # upper_offset = np.round(offset / 2)
    # lower_offset = offset - upper_offset
    # new_origin = voxel_2_world([-upper_offset, -lower_offset, 0], raw_origin, resize_spacing)
    # rimages = []
    # for z in range(resize_image.shape[2]):
    #     rimage = np.full((size, size), -1000)
    #     rimage[upper_offset:-lower_offset, upper_offset:-lower_offset] = resize_image[:, :, z]
    #     rimages.append(rimage)
    return resize_image


def gen_3dimage(image_path, sid, series_type='ITK', resize_spacing=[1, 1, 1], dicom_names=None):
    if series_type == 'ITK':
        img, origin, spacing = load_itk(image_path)
    elif series_type == 'DCM':
        if dicom_names:
            img, origin, spacing = load_dicom_bynames(dicom_names)
        else:
            img, origin, spacing = load_dicom(image_path)

    if resize_spacing is None:
        new_spacing = spacing
        new_origin = origin
    else:
        resize_factor = spacing / resize_spacing
        new_real_shape = img.shape * resize_factor
        new_shape = np.round(new_real_shape)
        real_resize = new_shape / img.shape
        new_spacing = spacing / real_resize

    lung_mask, ret, bounds = seg_lungmask(img, z_axis=2)
    if lung_mask is False:
        logger.error("seg lung fail, path[%s], sid[%s]", image_path, sid)
        return False, False, False, False, False, False, False, False
    if ret == 2:
        logger.warn("seg lung 3d fail, 2d succ, path[%s], sid[%s]", image_path, sid)

    if resize_spacing is None:
        lung = img
        mask = lung_mask
    else:
        # resize image
        lung_img = ndimage.interpolation.zoom(img, real_resize)
        lung_mask = ndimage.interpolation.zoom(lung_mask, real_resize)

        # padding to input shape
        size = img.shape[0]
        original_shape = lung_img.shape
        offset = (size - original_shape[1])
        upper_offset = np.round(offset / 2)
        lower_offset = offset - upper_offset
        new_origin = voxel_2_world([-upper_offset, -lower_offset, 0], origin, new_spacing)
        lungs = []
        masks = []
        for z in range(lung_img.shape[2]):
            lung_img_512 = np.full((size, size), -1000)
            lung_mask_512 = np.full((size, size), 0)
            lung_img_512[upper_offset:-lower_offset, upper_offset:-lower_offset] = lung_img[:, :, z]
            lung_mask_512[upper_offset:-lower_offset, upper_offset:-lower_offset] = lung_mask[:, :, z]
            lungs.append(lung_img_512)
            masks.append(lung_mask_512)
        lung = np.stack(lungs, axis=2)
        mask = np.stack(masks, axis=2)
    return True, lung, mask, new_origin, new_spacing, origin, spacing, bounds
