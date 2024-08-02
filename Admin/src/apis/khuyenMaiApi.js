import axiosClient from './axiosClient';

const khuyenMaiApi = {
    getAll() {
        const url = '/api/khuyenmai';
        return axiosClient.get(url);
    },
    createKhuyenMai(data) {
        const url = '/api/khuyenmai';
        return axiosClient.post(url, data);
    },
    updateKhuyenMai(data) {
        const url = '/api/khuyenmai';
        return axiosClient.put(url, data);
    },
    getDetailKhuyenMai(id) {
        const url = `/api/khuyenmai/${id}`;
        return axiosClient.get(url);
    },
    deleteKhuyenMai(id) {
        const url = `/api/khuyenmai/${id}`;
        return axiosClient.delete(url);
    },
}

export default khuyenMaiApi;
