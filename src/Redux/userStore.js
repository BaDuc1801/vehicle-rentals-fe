import { createSlice } from "@reduxjs/toolkit"

const initialState = {
    email: "",
    username: "",
    phonenumber: "",
    role: "",
    paymentId: [],
    avatar: "https://res.cloudinary.com/dzpw9bihb/image/upload/v1726676632/wgbdsrflw8b1vdalkqht.jpg",
}

const userSlice = createSlice({
    name : "user",
    initialState,
    reducers: {
        setUser: (state, action) => {
            const {
                email ="",
                username ="",
                phonenumber ="",
                role ="",
                paymentId = [],
                avatar ="https://res.cloudinary.com/dzpw9bihb/image/upload/v1726676632/wgbdsrflw8b1vdalkqht.jpg",
            } = action.payload; 

            state.email = email
            state.username = username
            state.phonenumber = phonenumber
            state.role = role
            state.avatar = avatar
            state.paymentId = paymentId
        },

        resetUser: (state) => {
            state.email =""
            state.username =""
            state.phonenumber =""
            state.role =""
            state.avatar =""
            state.paymentId = []
        }
    }
})

export const {setUser, resetUser} = userSlice.actions;
export const userStore =  userSlice.reducer;