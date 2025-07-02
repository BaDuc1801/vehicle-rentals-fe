import { createSlice } from "@reduxjs/toolkit"

const initialState = {
    email: "",
    username: "",
    phoneNumber: "",
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
                phoneNumber ="",
                role ="",
                paymentId = [],
                avatar ="https://res.cloudinary.com/dzpw9bihb/image/upload/v1726676632/wgbdsrflw8b1vdalkqht.jpg",
            } = action.payload; 

            state.email = email
            state.username = username
            state.phoneNumber = phoneNumber
            state.role = role
            state.avatar = avatar
            state.paymentId = paymentId
        },

        setAvatar: (state, action) => {
            state.avatar = action.payload
        },

        resetUser: (state) => {
            state.email =""
            state.username =""
            state.phoneNumber =""
            state.role =""
            state.avatar =""
            state.paymentId = []
        }
    }
})

export const {setUser, resetUser, setAvatar} = userSlice.actions;
export const userStore =  userSlice.reducer;