import axiosClient from './axiosClient';

const hangApi = {
    getAll() {
        const url = '/hang';
        return axiosClient.get(url);
    },
    createHang(data) {
        const url = '/hang';
        return axiosClient.post(url, data);
    },
    updateHang(id, data) {
        const url = '/hang/' + id;
        return axiosClient.put(url, data);
    },
    getBySanpham(masp) {
        const url = `/hang/sanpham/${masp}`;
        return axiosClient.get(url);
    },
    getDetailHang(id) {
        const url = `/hang/${id}`;
        return axiosClient.get(url);
    },
    deleteHang(id) {
        const url = `/hang/${id}`;
        return axiosClient.delete(url);
    },
}

export default hangApi;
