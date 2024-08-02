import axiosClient from './axiosClient';

const ctDonHangApi = {
    getAll() {
        const url = '/api/ct-donhang';
        return axiosClient.get(url);
    },
    createCTDonHang(data) {
        const url = '/api/ct-donhang';
        return axiosClient.post(url, data);
    },
    updateCTDonHang(data) {
        const url = '/api/ct-donhang';
        return axiosClient.put(url, data);
    },
    getDetailCTDonHang(masp, madh) {
        const url = `/api/ct-donhang/${masp}/${madh}`;
        return axiosClient.get(url);
    },
    deleteCTDonHang(masp, madh) {
        const url = `/api/ct-donhang/${masp}/${madh}`;
        return axiosClient.delete(url);
    },
}

export default ctDonHangApi;
