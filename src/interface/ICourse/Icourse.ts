import { IVideo } from "../IVideo/IVideo"
import IUserSlice from "../Iredux/IuserSlice"

export interface ICourse{
    _id: string
    Title: string
    Descripton: string
    videos:IVideo[]
    publisherId: IUserSlice
    CoverImage:string
} 