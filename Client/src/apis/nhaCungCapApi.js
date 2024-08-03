import axiosClient from './axiosClient';

const nhaCungCapApi = {
    getAll() {
        const url = '/nhacungcap';
        return axiosClient.get(url);
    },
    createNhaCungCap(data) {
        const url = '/nhacungcap';
        return axiosClient.post(url, data);
    },
    updateNhaCungCap(data) {
        const url = '/nhacungcap/'+data?.mancc;
        return axiosClient.put(url, data);
    },
    getDetailNhaCungCap(id) {
        const url = `/nhacungcap/${id}`;
        return axiosClient.get(url);
    },
    deleteNhaCungCap(id) {
        const url = `/nhacungcap/${id}`;
        return axiosClient.delete(url);
    },
}

export default nhaCungCapApi;
