//import
import { configureStore } from '@reduxjs/toolkit'
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import modalReducer from './modalSlice/modalSlice';
import userReducer from './userSlice/UserSlice';
import RegisterFormModalreducer from './modalSlice/RegisterFormModalSlice';
import OTPModalReducer from './modalSlice/VerifyOtpModalSlice';



//type
export type RootStateType = {
    modal: ModalStateType;
    user: UserStateType;
  registerformmodal: RegFormModalType;
  verifyOTPmodal:ModalStateType
  };



type ModalStateType = {
    Open: boolean;
}

type RegFormModalType = {
    State:boolean
}

type UserStateType = {
    role: string;
  name: string;
    email: string;
    phone: number | null;
    dob: string | null;
}


//config
const user_persistConfig = {
    key: 'user',
    storage,
  };
const modal_persistConfig = {
    key: 'modal',
    storage,
  };
const regformmodal_persistConfig = {
    key: 'regmodal',
    storage,
  };
const verifyOTPmodal_persistConfig = {
    key: 'verifyOTPmodal',
    storage,
  };


const persistedUserReducer = persistReducer(user_persistConfig, userReducer);
const persistedModalReducer = persistReducer(modal_persistConfig, modalReducer);
const persistedRegisterFormModalreducer = persistReducer(regformmodal_persistConfig, RegisterFormModalreducer);
const persistedverifyOTPmodalreducer = persistReducer(verifyOTPmodal_persistConfig, OTPModalReducer);
  


export const store = configureStore({
    reducer:{
        modal:persistedModalReducer,
        user: persistedUserReducer,
    registerformmodal: persistedRegisterFormModalreducer,
    verifyOTPmodal: persistedverifyOTPmodalreducer,
    
        
    }
})
export  const persistor = persistStore(store);