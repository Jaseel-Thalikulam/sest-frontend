import { createSlice } from '@reduxjs/toolkit'

const INITIAL_STATE = {
    State: false,

 }
const RegisterFormModalSlice = createSlice({
    name: "registerformmodal",
    initialState: INITIAL_STATE,
    reducers: {
        handleChangeState: (state) => {
            state.State=!state.State
        }
    }
})
 
export const {handleChangeState} = RegisterFormModalSlice.actions

export default RegisterFormModalSlice.reducer;