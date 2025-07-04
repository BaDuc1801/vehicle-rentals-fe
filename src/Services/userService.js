import axios from "axios";
import axiosJWT from "./axiosJWT";

const apiUrl = import.meta.env.VITE_APP_BE_URL;
const userUrl = `${apiUrl}/users`;

const userService = {
    login: async (email, password) => {
        const res = await axios.post(`${userUrl}/login`, {
            email,
            password
        }, {
            withCredentials: true,
        })
        return res.data
    },

    loginGoogle: async (tokenGoogle) => {
        const res = await axios.post(`${userUrl}/login-google`, {
            tokenGoogle: tokenGoogle
        }, {
            withCredentials: true,
        }
        );
        return res.data
    },

    loginGoogleFirebase: async (idToken, phoneNumber) => {
        const res = await axios.post(`${userUrl}/login-google-firebase`,
            {
                idToken: idToken,
                phoneNumber: phoneNumber
            },
            { withCredentials: true }
        )
        return res.data
    },

    checkPhoneEmail: async (email, phoneNumber) => {
        const res = await axios.post(`${userUrl}/check-phonenumber`,
            {
                email: email,
                phoneNumber: phoneNumber
            },
            { withCredentials: true }
        )
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

    getUserInformation: async () => {
        const respond = await axiosJWT.get(`${userUrl}/get-infor`,
            {
                withCredentials: true
            });
        return respond.data;
    },

    logOut: async () => {
        const response = await axios.post(`${userUrl}/logout`, {},
            {
                withCredentials: true
            }
        );
        return response.data;
    },

    refreshAccessToken: async () => {
        const res = await axios.post(`${userUrl}/refresh-token`,
            {},
            {
                withCredentials: true,
            }
        );
        return res.data
    },

    updateUserInfor: async (data) => {
        const res = await axiosJWT.put(`${userUrl}/update-infor`, data, {
            withCredentials: true
        });
        return res.data
    },

    updateAvatar: async (avatar) => {
        const res = await axiosJWT.put(`${userUrl}/up-avatar`, avatar, {
            withCredentials: true
        })
        return res.data
    },

    changePassword: async (accessToken, newPass) => {
        const res = await axiosJWT.put(`${userUrl}/change-password`, newPass, {
            withCredentials: true
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
        const res = await axiosJWT.put(`${userUrl}/user/${userId}`, data, {
            withCredentials: true
        })
        return res.data
    },

    sendEmail: async (email) => {
        const res = await axios.post(`${userUrl}/forgot-password`, { email })
        return res.data
    }
}

export default userService