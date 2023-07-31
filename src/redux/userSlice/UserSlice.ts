import { createSlice } from '@reduxjs/toolkit'

const INITIAL_STATE = {
    role: "",
    name: "",
    email: "",
    phone: null,
    DOB: null,
    userId: "",
    phoneNumber: "",
    about: "",
    github: "",
    linkedin: "",
    pinterest:"",
}

const UserSlice = createSlice({
    name: "User",
    initialState: INITIAL_STATE,
    reducers: {
        UserDetails: (state, action) => {
            state.role = action.payload.role;
            state.name = action.payload.name;
            state.email = action.payload.email;
            state.phoneNumber = action.payload.phoneNumber;
            state.DOB = action.payload.DOB;
            state.userId = action.payload.userId;
            state.about = action.payload.about;
            state.github = action.payload.github;
            state.linkedin = action.payload.linkedin;
            state.pinterest = action.payload.pinterest;

            
        }
    }
})



export const { UserDetails } = UserSlice.actions
export default UserSlice.reducer;