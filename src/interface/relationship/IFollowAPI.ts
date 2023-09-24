import IUserSlice from "../Iredux/IuserSlice";

export default interface IFollowAPI{
    followers: IUserSlice[];
    follwingUsers: IUserSlice[];
    message: string;
    success: boolean;
}