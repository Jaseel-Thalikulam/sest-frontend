import { createSlice} from '@reduxjs/toolkit';

interface ForgetPasswordModalState {
  isOpen: boolean;
}

const initialState: ForgetPasswordModalState = {
  isOpen: false,
};

const forgetPasswordModalSlice = createSlice({
  name: 'forgetPasswordmodal',
  initialState,
  reducers: {
    handleForgetPasswordChangeState: (state) => {
      state.isOpen = !state.isOpen;
    },
  },
});

export const { handleForgetPasswordChangeState } = forgetPasswordModalSlice.actions;
export default forgetPasswordModalSlice.reducer;
