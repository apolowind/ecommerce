import axiosClient from './axiosClient';

const sanPhamApi = {
    getAll() {
        const url = '/sanpham';
        return axiosClient.get(url);
    },
    createSanPham(data) {
        const url = '/sanpham';
        return axiosClient.post(url, data);
    },
    updateSanPham(data) {
        const url = '/sanpham/'+ data.masp;
        return axiosClient.put(url, data);
    },
    getByLoai(id) {
        const url = `/sanpham/loaisanpham/${id}`;
        return axiosClient.get(url);
    },
    getDetailSanPham(id) {
        const url = `/sanpham/${id}`;
        return axiosClient.get(url);
    },
    deleteSanPham(id) {
        const url = `/sanpham/${id}`;
        return axiosClient.delete(url);
    },
}

export default sanPhamApi;
