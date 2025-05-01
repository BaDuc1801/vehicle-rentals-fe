import axios from "axios";

const apiUrl = import.meta.env.VITE_BE_URL;
const vehicleUrl = `${apiUrl}/vehicles`;

const vehicleService = {
    getAllvehicles: async (params) => {
        const res = await axios.get(`${vehicleUrl}/`, {
            params: params
        })
        return res.data
    },

    updateVehicle: async (vehicleId, data) => {
        const res = await axios.put(`${vehicleUrl}/update-vehicle/${vehicleId}`, data);
        return res.data
    },

    updateImgVehicle: async (vehicleId, img) => {
        const res = await axios.put(`${vehicleUrl}/add-img/${vehicleId}`, img);
        return res.data
    },

    addVehicle : async (data) => {
        const res = await axios.post(`${vehicleUrl}/add-vehicle`, data);
        return res.data;
    },

    deleteVehicle: async (vehicleId) => {
        const res = await axios.delete(`${vehicleUrl}/del-vehicle/${vehicleId}`);
        return res.data
    }
}

export default vehicleService