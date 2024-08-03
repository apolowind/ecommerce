import axiosClient from './axiosClient';

const taiKhoanApi = {
    getAll() {
        const url = '/tai-khoan/all';
        return axiosClient.get(url);
    },
    createTaiKhoan(data) {
        const url = '/taikhoan';
        return axiosClient.post(url, data);
    },
    updateTaiKhoan(data) {
        const url = '/taikhoan';
        return axiosClient.put(url, data);
    },
    getDetailTaiKhoan(id) {
        const url = `/taikhoan/${id}`;
        return axiosClient.get(url);
    },
    deleteTaiKhoan(id) {
        const url = `/taikhoan/${id}`;
        return axiosClient.delete(url);
    },
}

export default taiKhoanApi;
