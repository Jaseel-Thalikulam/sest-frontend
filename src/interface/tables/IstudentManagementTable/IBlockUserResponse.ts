import IUserSlice from "../../Iredux/IuserSlice";

export default interface IBlockUserResponse{
    success: boolean;
    message: string
    Userdata:IUserSlice

}