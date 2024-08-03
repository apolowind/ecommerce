import axiosClient from "./axiosClient";
import khachHangApi from "./khachHangApi";

const userApi = {
    async getAllPersonalInfo() {
        const url = '/tai-khoan/getAll';
        try {
            const response = await axiosClient.get(url);
            console.log(response.data);
            return response.data;
        } catch (error) {
            throw error;
        }
    },

    async login(tendangnhap, matkhau) {
        const url = '/tai-khoan/login';
        try {
            const response = await axiosClient.post(url, { tendangnhap, matkhau });
            console.log(response);

            if (response) {
                localStorage.setItem("token", response.token || "token");
                localStorage.setItem("user", JSON.stringify(response));

                // Get customer information by tendangnhap
                const allCustomers = await khachHangApi.getAll();
                console.log(allCustomers);

                if (allCustomers && Array.isArray(allCustomers)) {
                    const customer = allCustomers.find(c => c.taikhoan.tendangnhap === tendangnhap);
                    if (customer) {
                        localStorage.setItem("customer", JSON.stringify(customer));
                    }
                }
            }
            return response;
        } catch (error) {
            throw error;
        }
    },

    register(data) {
        const url = '/tai-khoan/register';
        return axiosClient.post(url, data).then(response => {
            console.log(response);
            return response;
        });
    },

    getProfile() {
        const user = JSON.parse(localStorage.getItem("user"));
        const url = '/tai-khoan/profile/' + user?.tendangnhap;
        return axiosClient.get(url);
    },

    updateProfile(data, id) {
        const url = '/user/updateProfile/' + id;
        return axiosClient.put(url, data);
    },

    forgotPassword(data) {
        const url = '/auth/forgot-password';
        return axiosClient.post(url, data);
    },

    listUserByAdmin(data) {
        const url = '/tai-khoan/all';
        return axiosClient.get(url);
    },

    banAccount(data, id) {
        const url = '/user/updateProfile/' + id;
        return axiosClient.put(url, data);
    },

    unBanAccount(data, id) {
        const url = '/user/updateProfile/' + id;
        return axiosClient.put(url, data);
    },

    searchUser(email) {
        console.log(email);
        const params = {
            email: email.target.value
        }
        const url = '/user/searchByEmail';
        return axiosClient.get(url, { params });
    },

    sendNotification(data) {
        console.log(data);
        const url = '/auth/notifications';
        return axiosClient.post(url, data);
    },

    createNotificationByEmail(data) {
        console.log(data);
        const url = '/notifications/createNotificationByEmail';
        return axiosClient.post(url, data);
    },

    listNotification() {
        const url = '/notifications';
        return axiosClient.get(url);
    }

}

export default userApi;
