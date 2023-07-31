import { createSlice } from '@reduxjs/toolkit'

const INITIAL_STATE = {
    State: false,

 }
const AddUserDetailsSlice = createSlice({
    name: "adduserdetails",
    initialState: INITIAL_STATE,
    reducers: {
        AddUserDetailsChangeState: (state) => {
            state.State=!state.State
        }
    }
})
 
export const {AddUserDetailsChangeState} = AddUserDetailsSlice.actions

export default AddUserDetailsSlice.reducer;