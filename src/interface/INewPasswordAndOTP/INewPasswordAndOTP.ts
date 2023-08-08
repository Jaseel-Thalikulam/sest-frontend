import IUserSlice from "../Iredux/IuserSlice";

export default interface INewPasswordAndOTP{
    success: boolean;
    message: string;
    token: string;
    userData:IUserSlice

}

