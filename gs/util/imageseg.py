#*-* coding:utf-8 -*-
import numpy as np
from skimage import measure, morphology
from mpl_toolkits.mplot3d.art3d import Poly3DCollection
from skimage.segmentation import clear_border
import matplotlib.pyplot as plt
from skimage.filters import roberts, sobel
import scipy
from scipy import ndimage
import os
from gs.conf.model import XR, YR, BASE_SIZE
from skimage import morphology
import logging
import dicom
LUNGSEG_GOOD_NSTD_MAX = 3
LUNGSEG_GOOD_MEAN_MIN = 10000

logger = logging.getLogger('seg')

def largest_label_volume(im, bg=-1):
    vals, counts = np.unique(im, return_counts=True)
    counts = counts[vals != bg]
    # print counts
    vals = vals[vals != bg]
    if len(counts) > 0:
        index = np.argmax(counts)
        return vals[index]
    else:
        return None


def check_border(mask):
    scale = float(mask.shape[2])/BASE_SIZE
    xr = map(lambda a: int(a*scale), XR)
    yr = map(lambda a: int(a*scale), YR)
    for z in range(mask.shape[0]/2, mask.shape[0]):
        if np.sum(mask[z, yr[0], :]) > 100:
            return False
        if np.sum(mask[z, yr[1], :]) > 100:
            return False
        if np.sum(mask[z, :, xr[0]]) > 100:
            return False
        if np.sum(mask[z, :, xr[1]]) > 100:
            return False
    return True


def segment_lung_2d(image, fill_lung_structures=True):
    scale = float(image.shape[2])/BASE_SIZE
    xr = map(lambda a: int(a*scale), XR)
    yr = map(lambda a: int(a*scale), YR)
    # 肺 1 其他 0
    image = np.where(image < -2000, 0, image)
    binary_image = np.array((image>-320) | (image<-1500), dtype=np.int8)
    binary_image = 1 - binary_image
    for z in range(binary_image.shape[0]):
        slice = binary_image[z, :, :]
        labels = measure.label(slice, background=0)
        max_label = np.max(labels)
        for l in range(1, max_label + 1):
            curr = labels == l
            bounds = scipy.ndimage.measurements.find_objects(curr)[0]
            is_bound = False
            # Y
            if bounds[0].start in set(yr) or bounds[0].stop in set(yr):
                is_bound = True
            # X
            if bounds[1].start in set(xr) or bounds[1].stop in set(xr):
                is_bound = True
            if is_bound:
                binary_image[z, :, :] -= curr
                continue
            cy, cx = scipy.ndimage.measurements.center_of_mass(curr)
            # 中心点太离谱的，干掉
            if abs(cy - 256*scale) > 160*scale:
                binary_image[z, :, :] -= curr
                continue
            if abs(cx - 256*scale) > 160*scale:
                binary_image[z, :, :] -= curr
                continue
    binary_image = scipy.ndimage.morphology.binary_erosion(binary_image, iterations=3).astype(np.int8)
    binary_image = scipy.ndimage.morphology.binary_dilation(binary_image, iterations=3).astype(np.int8)

    labels = measure.label(binary_image, background=0)
    vals, counts = np.unique(labels, return_counts=True)
    counts = counts[vals != 0]
    vals = vals[vals != 0]
    indexs = np.argsort(-counts)
    # 保留最大联通
    for i in range(0, len(indexs)):
        if i > 5:
            break
        temp_image = np.copy(binary_image)
        l_max = vals[indexs[i]]
        temp_image[labels != l_max] = 0
        cz, cy, cx = scipy.ndimage.measurements.center_of_mass(temp_image)
        if abs(cx-256*scale) > 80*scale:
            continue
        if abs(cy-256*scale) > 80*scale:
            continue
        mean, var, nstd = get_image_var(temp_image)
        print "{}: {}, {}, {}".format(i, mean, var, nstd)
        if not (mean < LUNGSEG_GOOD_MEAN_MIN * scale or nstd > LUNGSEG_GOOD_NSTD_MAX):
            return temp_image

    # 保留最大2联通
    for i in range(0, len(indexs)-1):
        if i > 5:
            return False
        temp_image1 = np.copy(binary_image)
        l_max = vals[indexs[i]]
        temp_image1[labels != l_max] = 0
        temp_image2 = np.copy(binary_image)
        l_max = vals[indexs[i+1]]
        temp_image2[labels != l_max] = 0
        temp_image = temp_image1 + temp_image2
        cz, cy, cx = scipy.ndimage.measurements.center_of_mass(temp_image)
        if abs(cx-256*scale) > 80*scale:
            continue
        if abs(cy-256*scale) > 80*scale:
            continue
        mean, var, nstd = get_image_var(temp_image)
        print "{}: {}, {}, {}".format(i, mean, var, nstd)
        if not (mean < LUNGSEG_GOOD_MEAN_MIN * scale or nstd > LUNGSEG_GOOD_NSTD_MAX):
            return temp_image
    return False


'''
@z y x
'''
def segment_lung_3d(image, fill_lung_structures=True):
    scale = float(image.shape[2])/BASE_SIZE
    xr = map(lambda a: int(a*scale), XR)
    yr = map(lambda a: int(a*scale), YR)
    # 肺是 1， 其他是 2
    image = np.where(image < -2000, 0, image)
    binary_image = np.array((image > -320) | (image < -1500), dtype=np.int8) + 1
    labels = measure.label(binary_image)
    # 先干掉和边缘联通的label
    background_label = labels[0, yr[0], xr[0]]
    binary_image[background_label == labels] = 2
    background_label = labels[0, yr[0], xr[1]]
    binary_image[background_label == labels] = 2
    background_label = labels[0, yr[1], xr[0]]
    binary_image[background_label == labels] = 2
    background_label = labels[0, yr[1], xr[1]]
    binary_image[background_label == labels] = 2
    # Method of filling the lung structures (that is superior to something like
    # morphological closing)
    if fill_lung_structures:
        # For every slice we determine the largest solid structure
        for i, axial_slice in enumerate(binary_image):
            axial_slice = axial_slice - 1
            labeling = measure.label(axial_slice)
            l_max = largest_label_volume(labeling, bg=0)
            if l_max is not None:  # This slice contains some lung
                binary_image[i][labeling != l_max] = 1

    binary_image -= 1  # Make the image actual binary
    binary_image = 1 - binary_image

    # Remove other air pockets insided body
    labels = measure.label(binary_image, background=0)
    vals, counts = np.unique(labels, return_counts=True)
    counts = counts[vals != 0]
    vals = vals[vals != 0]
    indexs = np.argsort(-counts)
    for i in range(0, len(indexs)):
        if i > 5:
            return False
        temp_image = np.copy(binary_image)
        l_max = vals[indexs[i]]
        temp_image[labels != l_max] = 0
        cz, cy, cx = scipy.ndimage.measurements.center_of_mass(temp_image)
        if abs(cx-256*scale) > 80*scale:
            continue
        if abs(cy-256*scale) > 80*scale:
            continue
        if check_border(temp_image) is False:
            continue
        mean, var, nstd = get_image_var(temp_image)
        print "{}: {}, {}, {}".format(i, mean, var, nstd)
        if not (mean < LUNGSEG_GOOD_MEAN_MIN * scale or nstd > LUNGSEG_GOOD_NSTD_MAX):
                return temp_image
    return False

def get_image_var(image):
    slice_sums = list()
    for i in range(image.shape[0]):
        s = np.sum(image[i, :, :])
        if s == 0:
            continue
        slice_sums.append(s)
    if len(slice_sums) == 0:
        return 0, 0, 0
    slice_sums = np.stack(slice_sums)
    return np.mean(slice_sums), np.var(slice_sums), np.mean(slice_sums)/(np.var(slice_sums)**0.5)

'''
@param: scale 是X Y 缩放的比例
'''
def seg_lungmask(image, z_axis=2):
    if z_axis == 2:
        image = np.transpose(image)
    scale = float(image.shape[2])/BASE_SIZE
    xr = map(lambda a: int(a*scale), XR)
    yr = map(lambda a: int(a*scale), YR)
    middle_image = np.zeros(image.shape)
    for z in range(image.shape[0]):
        middle_image[z, yr[0]:yr[1], xr[0]:xr[1]] = image[z, yr[0]:yr[1], xr[0]:xr[1]]
    lung_img = np.copy(middle_image)
    lung_mask = segment_lung_3d(lung_img)
    b = None
    if lung_mask is not False:
        bounds = scipy.ndimage.measurements.find_objects(lung_mask)[0]
        b = (bounds[2].start, bounds[2].stop, bounds[1].start, bounds[1].stop, bounds[0].start, bounds[0].stop)
        if z_axis == 2:
            lung_mask = np.transpose(lung_mask)
        return lung_mask, 1, b
    lung_img = middle_image
    lung_mask = segment_lung_2d(lung_img)
    if lung_mask is not False:
        bounds = scipy.ndimage.measurements.find_objects(lung_mask)[0]
        b = (bounds[2].start, bounds[2].stop, bounds[1].start, bounds[1].stop, bounds[0].start, bounds[0].stop)
        if z_axis == 2 :
            lung_mask = np.transpose(lung_mask)
    return lung_mask, 2, b


def plot_3d(image, threshold=-300):
    # Position the scan upright,
    # so the head of the patient would be at the top facing the camera
    p = image.transpose(2, 1, 0)

    verts, faces, x, y = measure.marching_cubes(p, threshold)

    fig = plt.figure(figsize=(10, 10))
    ax = fig.add_subplot(111, projection='3d')

    # Fancy indexing: `verts[faces]` to generate a collection of triangles
    mesh = Poly3DCollection(verts[faces], alpha=0.70)
    face_color = [0.45, 0.45, 0.75]
    mesh.set_facecolor(face_color)
    ax.add_collection3d(mesh)

    ax.set_xlim(0, p.shape[0])
    ax.set_ylim(0, p.shape[1])
    ax.set_zlim(0, p.shape[2])

    plt.show()

if __name__ == '__main__':
    from imager import load_dicom
    from scipy import ndimage

    path = '/Users/weijingqi/Downloads/52E5A849'
    # path = '/Users/weijingqi/dev/lung/rawdata/indata/2017/11/13/F05FF8A4/85947550'
    files = os.listdir(path)
    ds = dicom.read_file(os.path.join(path, files[10]))
    print ds.StudyTime

    image, origin, spacing = load_dicom(path)
    image = np.transpose(image)
    raw_image = np.copy(image)
    print image.shape
    lung_mask, _, bound = seg_lungmask(image, z_axis=0)
    print 'seg finisha'
    # lung_mask = np.load('/Users/weijingqi/Downloads/bad2/1.2.840.113619.2.55.3.2831164355.372.1510831907.191.3.npz')['arr_0']
    # lung_mask = np.transpose(lung_mask)
    if lung_mask is False:
        print "FAIL"
        exit(0)
    image = raw_image*lung_mask
    # image = lung_mask
    # raw_image = lung_mask
    fig = plt.figure(figsize=(8, 8))
    indent = int(image.shape[0]/8)
    mask_cnt = 1
    raw_cnt = 1
    for row in range(1, 5):
        for col in range(1, 5):
            fig_index = (row-1)*4 + col
            if row % 2 == 1:
                index = mask_cnt * indent
                if index >= image.shape[0]:
                    index = image.shape[0] - 1
                p = fig.add_subplot(4, 4, fig_index)
                p.imshow(image[index, :, :], cmap=plt.cm.bone)
                p.set_title(index)
                mask_cnt += 1
            else:
                index = raw_cnt * indent
                if index >= image.shape[0]:
                    index = image.shape[0] - 1
                p = fig.add_subplot(4, 4, fig_index)
                p.imshow(raw_image[index, :, :], cmap=plt.cm.bone)
                p.set_title(index)
                raw_cnt += 1
    plt.show()


