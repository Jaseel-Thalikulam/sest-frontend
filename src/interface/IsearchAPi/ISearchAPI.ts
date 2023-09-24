import { IVideo } from "../IVideo/IVideo";
import IUserSlice, { Tag, URLs } from "../Iredux/IuserSlice";

export interface ISearchAPI{
    success: boolean;
    message: string;
    Data:ISearchData[]
}



export interface ISearchData{
    URLs: URLs;
    role?: string;
    name: string;
   email?: string;
   username: string;
    DOB?: null | Date;
    _id: string;
    phoneNumber: string|null;
   about?: string|null;
   isBanned: boolean;
   tags: Tag[]|null;
    avatarUrl: string;
    createdAt: Date;
    Title: string
    Descripton: string
    videos:IVideo[]
    publisherId: IUserSlice
    CoverImage:string
}