import axiosClient from './axiosClient';

const sizeApi = {
    getAll() {
        const url = '/api/size';
        return axiosClient.get(url);
    },
    createSize(data) {
        const url = '/api/size';
        return axiosClient.post(url, data);
    },
    updateSize(data) {
        const url = '/api/size';
        return axiosClient.put(url, data);
    },
    getDetailSize(id) {
        const url = `/api/size/${id}`;
        return axiosClient.get(url);
    },
    deleteSize(id) {
        const url = `/api/size/${id}`;
        return axiosClient.delete(url);
    },
}

export default sizeApi;
