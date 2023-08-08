//import
import { configureStore } from '@reduxjs/toolkit'
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import modalReducer from './modalSlice/modalSlice';
import userReducer from './userSlice/UserSlice';
import RegisterFormModalreducer from './modalSlice/RegisterFormModalSlice';
import LoginFormModalreducer from './modalSlice/loginModalSlice';
import OTPModalReducer from './modalSlice/VerifyOtpModalSlice';
import ForgetPasswordReducer from './modalSlice/forgetpasswordSlice';
import NewPasswordReducer from './modalSlice/newpasswordModalSlice';
import AddUserDetailsReducer from './modalSlice/AddUserDetailsSlice';


//type
export type RootStateType = {
    modal: ModalStateType;
    user: UserStateType;
  registerformmodal: LoginFormModalType;
  loginformmodal: LoginFormModalType;
  forgetPasswordmodal: ForgetPasswordModalType
  modalNewPasswordOtpVerify: ModalStateType
  adduserdetails: LoginFormModalType
  };


type ModalStateType = {
    Open: boolean;
}

type LoginFormModalType = {
    State:boolean
}
type ForgetPasswordModalType = {
    isOpen:boolean
}


type UserStateType = {
    role: string;
  name: string;
    email: string;
    phoneNumber: string | null;
  DOB: string | null;
  _id: string;
  about: string;
  URLs: {
    github: string;
    linkedin: string;
    pinterest: string;
  };
  tags: Tag[];
 
}

interface Tag {
  _id: string;
  Name: string;
  Description: string;
  IsListed: boolean;
  __v: number;
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
const loginformmodal_persistConfig = {
    key: 'loginmodal',
    storage,
  };
const verifyOTPmodal_persistConfig = {
    key: 'verifyOTPmodal',
    storage,
  };
const forgetPasswordmodal_persistConfig = {
    key: 'forgetPasswordmodal',
    storage,
  };
const modalNewPasswordOtpVerify_persistConfig = {
    key: 'modalNewPasswordOtpVerify',
    storage,
  };
const AddUserDetailsReducer_persistConfig = {
    key: 'adduserdetails',
    storage,
  };


const persistedUserReducer = persistReducer(user_persistConfig, userReducer);
const persistedModalReducer = persistReducer(modal_persistConfig, modalReducer);
const persistedRegisterFormModalreducer = persistReducer(regformmodal_persistConfig, RegisterFormModalreducer);
const persistedLoginFormModalreducer = persistReducer(loginformmodal_persistConfig, LoginFormModalreducer);
const persistedverifyOTPmodalreducer = persistReducer(verifyOTPmodal_persistConfig, OTPModalReducer);
const persistedforgetPasswordmodalreducer = persistReducer(forgetPasswordmodal_persistConfig, ForgetPasswordReducer);
const persistedmodalNewPasswordOtpVerifyreducer = persistReducer(modalNewPasswordOtpVerify_persistConfig,NewPasswordReducer);
const persistedAddUserDetailsReducer = persistReducer(AddUserDetailsReducer_persistConfig,AddUserDetailsReducer);
  


export const store = configureStore({
    reducer:{
        modal:persistedModalReducer,
        user: persistedUserReducer,
    registerformmodal: persistedRegisterFormModalreducer,
    loginformmodal: persistedLoginFormModalreducer,
    verifyOTPmodal: persistedverifyOTPmodalreducer,
    forgetPasswordmodal: persistedforgetPasswordmodalreducer,
    modalNewPasswordOtpVerify: persistedmodalNewPasswordOtpVerifyreducer,
    adduserdetails: persistedAddUserDetailsReducer,
    
    }
})
export  const persistor = persistStore(store);