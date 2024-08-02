import axiosClient from './axiosClient';

const donHangApi = {
    getAll() {
        const url = '/api/donhang';
        return axiosClient.get(url);
    },
    createDonHang(data) {
        const url = '/api/donhang';
        return axiosClient.post(url, data);
    },
    updateDonHang(data) {
        const url = '/api/donhang';
        return axiosClient.put(url, data);
    },
    getByKhachhang(makh) {
        const url = `/api/donhang/khachhang/${makh}`;
        return axiosClient.get(url);
    },
    getDetailDonHang(id) {
        const url = `/api/donhang/${id}`;
        return axiosClient.get(url);
    },
    deleteDonHang(id) {
        const url = `/api/donhang/${id}`;
        return axiosClient.delete(url);
    },
}

export default donHangApi;
