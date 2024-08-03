import axiosClient from './axiosClient';

const binhLuanApi = {
    getAll() {
        const url = '/api/binhluan';
        return axiosClient.get(url);
    },
    createBinhLuan(data) {
        const url = '/api/binhluan';
        return axiosClient.post(url, data);
    },
    updateBinhLuan(data) {
        const url = '/api/binhluan';
        return axiosClient.put(url, data);
    },
    getByKhachhang(makh) {
        const url = `/api/binhluan/khachhang/${makh}`;
        return axiosClient.get(url);
    },
    getBySanpham(masp) {
        const url = `/api/binhluan/sanpham/${masp}`;
        return axiosClient.get(url);
    },
    getDetailBinhLuan(id) {
        const url = `/api/binhluan/${id}`;
        return axiosClient.get(url);
    },
    deleteBinhLuan(id) {
        const url = `/api/binhluan/${id}`;
        return axiosClient.delete(url);
    },
}

export default binhLuanApi;
