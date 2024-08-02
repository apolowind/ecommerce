import axiosClient from './axiosClient';

const QuyenApi = {
    getAll() {
        const url = '/quyen';
        return axiosClient.get(url);
    },
    createQuyen(data) {
        const url = '/quyen';
        return axiosClient.post(url, data);
    },
    updateQuyen(data) {
        const url = '/quyen/' + data?.maquyen;
        return axiosClient.put(url, data);
    },
    getDetailQuyen(id) {
        const url = `/quyen/${id}`;
        return axiosClient.get(url);
    },
    deleteQuyen(id) {
        const url = `/quyen/${id}`;
        return axiosClient.delete(url);
    },
}

export default QuyenApi;
