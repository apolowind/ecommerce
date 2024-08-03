import axiosClient from './axiosClient';

const ctDonHangApi = {
    getAll() {
        const url = '/ctdondathang';
        return axiosClient.get(url);
    },
    createCTDonHang(data) {
        const url = '/ctdondathang';
        return axiosClient.post(url, data);
    },
    updateCTDonHang(data) {
        const url = '/ctdondathang';
        return axiosClient.put(url, data);
    },
    getDetailCTDonHang(masp, madh) {
        const url = `/ctdondathang/${masp}/${madh}`;
        return axiosClient.get(url);
    },
    deleteCTDonHang(masp, madh) {
        const url = `/ctdondathang/${masp}/${madh}`;
        return axiosClient.delete(url);
    },
}

export default ctDonHangApi;
