import { createSlice } from '@reduxjs/toolkit'

const INITIAL_STATE = {
    State: false,

 }
const LoginFormModalSlice = createSlice({
    name: "registerformmodal",
    initialState: INITIAL_STATE,
    reducers: {
        handleLoginChangeState: (state) => {
            state.State=!state.State
        }
    }
})
 
export const {handleLoginChangeState} = LoginFormModalSlice.actions

export default LoginFormModalSlice.reducer;