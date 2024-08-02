import axiosClient from './axiosClient';

const LoaisanphamApi = {
    getAll() {
        const url = '/loaisanpham';
        return axiosClient.get(url);
    },
    createLoaisanpham(data) {
        const url = '/loaisanpham';
        return axiosClient.post(url, data);
    },
    updateLoaisanpham(data) {
        const url = '/loaisanpham';
        return axiosClient.put(url, data);
    },
    getDetailLoaisanpham(id) {
        const url = `/loaisanpham/${id}`;
        return axiosClient.get(url);
    },
    deleteLoaisanpham(id) {
        const url = `/loaisanpham/${id}`;
        return axiosClient.delete(url);
    },
}

export default LoaisanphamApi;
