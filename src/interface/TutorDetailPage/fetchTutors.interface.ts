import IUserSlice from "../Iredux/IuserSlice";


export default interface IFetchTutorsResponse{
    success: boolean;
    message: string;
    Tutorsdata:IUserSlice[]

}