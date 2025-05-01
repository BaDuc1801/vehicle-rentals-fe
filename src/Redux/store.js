import { configureStore } from "@reduxjs/toolkit";
import { userStore } from "./userStore";
import { vehicleStore } from "./vehicleStore";

const store = configureStore({
    reducer: {
        user: userStore,
        vehicle: vehicleStore
    }
})

export default store