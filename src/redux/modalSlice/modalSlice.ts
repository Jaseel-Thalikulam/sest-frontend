import { createSlice } from '@reduxjs/toolkit'

const INITIAL_STATE = {
   Open: false,
  
   
}

const ModalSlice = createSlice({
    name: "modal",
    initialState: INITIAL_STATE,
    reducers: {
      
       handleOpenAndClose:(state)=> {
         state.Open = !state.Open;
       
       },
   
     
            }
          
   
          })

export const {handleOpenAndClose} = ModalSlice.actions

export default ModalSlice.reducer;