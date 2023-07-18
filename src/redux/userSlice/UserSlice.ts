import { createSlice } from '@reduxjs/toolkit'

const INITIAL_STATE = {
    role: "",
    name: "",
    email: "",
    phone: null,
    dob: null,
}




const UserSlice = createSlice({
    name: "User",
    initialState: INITIAL_STATE,
    reducers: {
        UserDetails: (state, action) => {
            state.role = action.payload.role;
            state.name = action.payload.name;
            state.email = action.payload.email;
            state.phone = action.payload.phone;
            state.dob = action.payload.dob
        }
    }
})



export const { UserDetails } = UserSlice.actions
export default UserSlice.reducer;