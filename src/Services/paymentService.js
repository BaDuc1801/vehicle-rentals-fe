import axiosJWT from "./axiosJWT"

const apiUrl = import.meta.env.VITE_APP_BE_URL;
const paymentUrl = `${apiUrl}/payments`;

const paymentService = {
    createPayment: async (data) => {
        const res = await axiosJWT.post(`${paymentUrl}/add-payment`, data)
        return res.data
    },

    getAllPayment: async (params) => {
        const res = await axiosJWT.get(`${paymentUrl}`,{
            params: params
        })
        return res.data
    },

    getPaymentById: async (id) => {
        const res = await axiosJWT.get(`${paymentUrl}/${id}`)
        return res.data
    },

    updatePayment: async (id, data) => {
        const res = await axiosJWT.put(`${paymentUrl}/update-payment/${id}`, data);
        return res.data;
    },
}

export default paymentService;