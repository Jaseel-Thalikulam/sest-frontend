
import IUserSlice from "../Iredux/IuserSlice";
export default interface ILoginResponse {
    success: boolean;
    message: string;
    userData: IUserSlice;
    token: string;
  }
  