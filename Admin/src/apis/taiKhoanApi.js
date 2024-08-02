import axiosClient from './axiosClient';

const taiKhoanApi = {
    getAll() {
        const url = '/api/taikhoan';
        return axiosClient.get(url);
    },
    createTaiKhoan(data) {
        const url = '/api/taikhoan';
        return axiosClient.post(url, data);
    },
    updateTaiKhoan(data) {
        const url = '/api/taikhoan';
        return axiosClient.put(url, data);
    },
    getDetailTaiKhoan(id) {
        const url = `/api/taikhoan/${id}`;
        return axiosClient.get(url);
    },
    deleteTaiKhoan(id) {
        const url = `/api/taikhoan/${id}`;
        return axiosClient.delete(url);
    },
}

export default taiKhoanApi;
