import axiosClient from './axiosClient';

const khachHangApi = {
    getAll() {
        const url = '/khachhang';
        return axiosClient.get(url);
    },
    createKhachHang(data) {
        const url = '/khachhang';
        return axiosClient.post(url, data);
    },
    updateKhachHang(data) {
        const url = '/khachhang';
        return axiosClient.put(url, data);
    },
    getDetailKhachHang(id) {
        const url = `/khachhang/${id}`;
        return axiosClient.get(url);
    },
    deleteKhachHang(id) {
        const url = `/khachhang/${id}`;
        return axiosClient.delete(url);
    },
}

export default khachHangApi;
