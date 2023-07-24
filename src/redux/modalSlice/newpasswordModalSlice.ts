import { createSlice } from '@reduxjs/toolkit'

const INITIAL_STATE = {
   Open: false,
  
   
}

const NewPasswordOTPModalSlice = createSlice({
    name: "modalNewPasswordOtpVerify",
    initialState: INITIAL_STATE,
    reducers: {
      
        handleOpenAndCloseNewPasswordVerifyOtp:(state)=> {
         state.Open = !state.Open;
       
       },
   
            }
        
          })

export const {handleOpenAndCloseNewPasswordVerifyOtp} = NewPasswordOTPModalSlice.actions

export default NewPasswordOTPModalSlice.reducer;