import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    list : [],
}

const vehicleSlice = createSlice({
    name: "car",
    initialState,
    reducers: {
        setListVehicle(state, action) {
            state.list = action.payload;
        },
    }
});

export const {setVehicle, setListVehicle} = vehicleSlice.actions;
export const vehicleStore = vehicleSlice.reducer;
