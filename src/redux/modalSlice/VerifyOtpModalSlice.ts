import { createSlice } from '@reduxjs/toolkit'

const INITIAL_STATE = {
   Open: false,
  
   
}

const OTPModalSlice = createSlice({
    name: "modalOtpVerify",
    initialState: INITIAL_STATE,
    reducers: {
      
       handleOpenAndCloseVerifyOtp:(state)=> {
         state.Open = !state.Open;
       
       },
   
     
            }
          
   
          })

export const {handleOpenAndCloseVerifyOtp} = OTPModalSlice.actions

export default OTPModalSlice.reducer;