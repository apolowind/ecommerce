import axiosClient from './axiosClient';

const dotGiamGiaApi = {
    getAll() {
        const url = '/dotgiamgia';
        return axiosClient.get(url);
    },
    createDotGiamGia(data) {
        const url = '/dotgiamgia';
        return axiosClient.post(url, data);
    },
    updateDotGiamGia(id, data) {
        const url = `/dotgiamgia/${id}`;
        return axiosClient.put(url, data);
    },
    getDetailDotGiamGia(id) {
        const url = `/dotgiamgia/${id}`;
        return axiosClient.get(url);
    },
    deleteDotGiamGia(id) {
        const url = `/dotgiamgia/${id}`;
        return axiosClient.delete(url);
    },
}

export default dotGiamGiaApi;
