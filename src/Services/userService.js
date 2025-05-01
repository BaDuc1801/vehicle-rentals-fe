import axios from "axios";
import axiosJWT from "./axiosJWT";

const apiUrl = import.meta.env.VITE_APP_BE_URL;
const userUrl = `${apiUrl}/users`;

const userService = {
    getAccessToken: () => {
        return JSON.parse(localStorage.getItem("access_token"))
    },

    login: async (email, password) => {
        const res = await axios.post(`${userUrl}/login`, {
            email,
            password
        }, {
            withCredentials: true,
        })
        return res.data
    },

    register: async (email, username, password) => {
        const res = await axios.post(`${userUrl}/register`, {
            email,
            username,
            password
        })
        return res.data
    },

    getUserInformation: async (accessToken) => {
        try {
            const respond = await axiosJWT.get(`${userUrl}/get-infor`, {
                headers: {
                    Authorization: `Bearer ${accessToken}`
                }
            });
            return respond.data;
        } catch (error) {
            alert("Phiên đăng nhập hết hạn")
            localStorage.removeItem('access_token')
            localStorage.removeItem('checkingBill')
        }
    },

    logOut: async () => {
        const response = await axios.post(`${userUrl}/logout`);
        return response.data;
    },

    refreshAccessToken: async () => {
        const res = await axios.post(`${userUrl}/refresh-token`,
            {},
            {
                withCredentials: true,     // Lấy cookies chứa refreshToken cho vào req
            }
        );
        return res.data
    },

    updateUserInfor: async (accessToken, data) => {
        const res = await axiosJWT.put(`${userUrl}/update-infor`, data, {
            headers: {
                Authorization: `Bearer ${accessToken}`
            }
        });
        return res.data
    },

    updateAvatar: async (accessToken, avatar) => {
        const res = await axiosJWT.put(`${userUrl}/up-avatar`, avatar, {
            headers: {
                Authorization: `Bearer ${accessToken}`
            }
        })
        return res.data
    },

    changePassword: async (accessToken, newPass) => {
        const res = await axiosJWT.put(`${userUrl}/change-password`, newPass, {
            headers: {
                Authorization: `Bearer ${accessToken}`
            }
        })
    },

    getAllUser: async () => {
        const res = await axiosJWT.get(`${userUrl}`,)
        return res.data
    },

    deleteUser: async (userId) => {
        const res = await axiosJWT.delete(`${userUrl}/delete-user/${userId}`)
        return res.data
    },

    updateUserByAmin: async (userId, data) => {
        const accessToken = userService.getAccessToken();
        const res = await axiosJWT.put(`${userUrl}/user/${userId}`, data, {
            headers: {
                Authorization: `Bearer ${accessToken}`
            }
        })
        return res.data
    },

    sendEmail: async (email) => {
        const res = await axios.post(`${userUrl}/forgot-password`, { email })
        return res.data
    }
}

export default userService