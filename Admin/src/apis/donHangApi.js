import axiosClient from './axiosClient';

const donHangApi = {
    getAll() {
        const url = '/donhang';
        return axiosClient.get(url);
    },
    createDonHang(data) {
        const url = '/donhang';
        return axiosClient.post(url, data);
    },
    updateDonHang(data) {
        const url = '/donhang';
        return axiosClient.put(url, data);
    },
    getByKhachhang(makh) {
        const url = `/donhang/khachhang/${makh}`;
        return axiosClient.get(url);
    },
    getDetailDonHang(id) {
        const url = `/donhang/${id}`;
        return axiosClient.get(url);
    },
    deleteDonHang(id) {
        const url = `/donhang/${id}`;
        return axiosClient.delete(url);
    },
}

export default donHangApi;
