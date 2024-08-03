import axiosClient from "./axiosClient";

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

    login(tendangnhap, matkhau) {
        const url = '/tai-khoan/login';
        return axiosClient
            .post(url, {
                tendangnhap,
                matkhau,
            })
            .then(response => {
                console.log(response);
                if (response) {
                    localStorage.setItem("token", response.token || "token");
                    localStorage.setItem("user", JSON.stringify(response));
                }
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