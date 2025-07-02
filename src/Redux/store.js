import { configureStore } from "@reduxjs/toolkit";
import { userStore } from "./userStore";
import { persistReducer, persistStore } from "redux-persist";
import storage from "redux-persist/lib/storage"; 
import { combineReducers } from "redux";

const rootReducer = combineReducers({
    user: userStore,
});

const persistConfig = {
    key: "root",
    storage,
    whitelist: ["search", "route", "voucher"] 
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

const store = configureStore({
    reducer: persistedReducer,
    middleware: getDefaultMiddleware =>
        getDefaultMiddleware({
            serializableCheck: false
        })
});

export const persistor = persistStore(store);

export default store;