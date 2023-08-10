import IUserSlice from "../Iredux/IuserSlice";

export default interface IUsersListFetch{
    success: boolean;
    data: IUserSlice[]
}