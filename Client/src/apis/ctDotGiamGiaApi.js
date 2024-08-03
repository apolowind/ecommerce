import axiosClient from './axiosClient';

const ctDotGiamGiaApi = {
    getAll() {
        const url = '/ct-dot-giam-gia';
        return axiosClient.get(url);
    },
    createCTDotGiamGia(data) {
        const url = '/ct-dot-giam-gia';
        return axiosClient.post(url, data);
    },
    updateCTDotGiamGia(data) {
        const url = '/ct-dot-giam-gia';
        return axiosClient.put(url, data);
    },
    getDetailCTDotGiamGia(masp, maddgg) {
        const url = `/ct-dot-giam-gia/${masp}/${maddgg}`;
        return axiosClient.get(url);
    },
    deleteCTDotGiamGia(masp, maddgg) {
        const url = `/ct-dot-giam-gia/${masp}/${maddgg}`;
        return axiosClient.delete(url);
    },
}

export default ctDotGiamGiaApi;
