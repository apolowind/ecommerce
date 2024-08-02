import axiosClient from './axiosClient';

const nhaCungCapApi = {
    getAll() {
        const url = '/api/nhacungcap';
        return axiosClient.get(url);
    },
    createNhaCungCap(data) {
        const url = '/api/nhacungcap';
        return axiosClient.post(url, data);
    },
    updateNhaCungCap(data) {
        const url = '/api/nhacungcap';
        return axiosClient.put(url, data);
    },
    getDetailNhaCungCap(id) {
        const url = `/api/nhacungcap/${id}`;
        return axiosClient.get(url);
    },
    deleteNhaCungCap(id) {
        const url = `/api/nhacungcap/${id}`;
        return axiosClient.delete(url);
    },
}

export default nhaCungCapApi;
