import axiosClient from './axiosClient';

const sanPhamApi = {
    getAll() {
        const url = '/api/sanpham';
        return axiosClient.get(url);
    },
    createSanPham(data) {
        const url = '/api/sanpham';
        return axiosClient.post(url, data);
    },
    updateSanPham(data) {
        const url = '/api/sanpham';
        return axiosClient.put(url, data);
    },
    getByLoai(id) {
        const url = `/api/sanpham/loai/${id}`;
        return axiosClient.get(url);
    },
    getDetailSanPham(id) {
        const url = `/api/sanpham/${id}`;
        return axiosClient.get(url);
    },
    deleteSanPham(id) {
        const url = `/api/sanpham/${id}`;
        return axiosClient.delete(url);
    },
}

export default sanPhamApi;
