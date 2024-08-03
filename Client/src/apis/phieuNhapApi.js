import axiosClient from './axiosClient';

const phieuNhapApi = {
    getAll() {
        const url = '/phieunhap';
        return axiosClient.get(url);
    },
    createPhieuNhap(data) {
        const url = '/phieunhap';
        return axiosClient.post(url, data);
    },
    updatePhieuNhap(data) {
        const url = '/phieunhap';
        return axiosClient.put(url, data);
    },
    getDetailPhieuNhap(id) {
        const url = `/phieunhap/${id}`;
        return axiosClient.get(url);
    },
    deletePhieuNhap(id) {
        const url = `/phieunhap/${id}`;
        return axiosClient.delete(url);
    },
}

export default phieuNhapApi;
