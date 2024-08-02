import axiosClient from './axiosClient';

const nhanVienApi = {
    getAll() {
        const url = '/nhanvien';
        return axiosClient.get(url);
    },
    createNhanVien(data) {
        const url = '/nhanvien';
        return axiosClient.post(url, data);
    },
    updateNhanVien(id, data) {
        const url = '/nhanvien/' + id;
        return axiosClient.put(url, data);
    },
    getDetailNhanVien(id) {
        const url = `/nhanvien/${id}`;
        return axiosClient.get(url);
    },
    deleteNhanVien(id) {
        const url = `/nhanvien/${id}`;
        return axiosClient.delete(url);
    },
}

export default nhanVienApi;
