import { SetStateAction } from "react";
import IUserSlice from "../Iredux/IuserSlice";
export default interface IFetchUserPost{
 
    success: boolean;
    message: string;
    UserPost:SetStateAction<Post[]>

}

export interface Post {
    _id: string;
    userId: IUserSlice;
    timeStamp: string;
    type: string;
    articleThumbnailURL?: string;
    articleTitle?: string;
    articleContent?: string;
    pollQuestion?: string;
    pollOptions?: string[]
    pollVotes?: number[]
    totalVotes:number
    mediaThumbnailURL?: string;
    mediaCaption?: string;
  }