import axiosClient from './axiosClient';

const thuongHieuApi = {
    getAll() {
        const url = '/api/thuonghieu';
        return axiosClient.get(url);
    },
    createThuongHieu(data) {
        const url = '/api/thuonghieu';
        return axiosClient.post(url, data);
    },
    updateThuongHieu(data) {
        const url = '/api/thuonghieu';
        return axiosClient.put(url, data);
    },
    getDetailThuongHieu(id) {
        const url = `/api/thuonghieu/${id}`;
        return axiosClient.get(url);
    },
    deleteThuongHieu(id) {
        const url = `/api/thuonghieu/${id}`;
        return axiosClient.delete(url);
    },
}

export default thuongHieuApi;
