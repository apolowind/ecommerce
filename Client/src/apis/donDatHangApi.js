import axiosClient from './axiosClient';

const donDatHangApi = {
    getAll() {
        const url = '/dondathang';
        return axiosClient.get(url);
    },
    createDonDatHang(data) {
        const url = '/dondathang';
        return axiosClient.post(url, data);
    },
    updateDonDatHang(data) {
        const url = '/dondathang';
        return axiosClient.put(url, data);
    },
    getDetailDonDatHang(id) {
        const url = `/dondathang/${id}`;
        return axiosClient.get(url);
    },
    deleteDonDatHang(id) {
        const url = `/dondathang/${id}`;
        return axiosClient.delete(url);
    },
}

export default donDatHangApi;
