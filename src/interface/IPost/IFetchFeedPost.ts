 import IUserSlice from "../Iredux/IuserSlice";

export default interface IFetchFeedPost{
 
    success: boolean;
    message: string;
    FeedPost:Post[]

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
    pollOptions?: string[];
    pollVotes?: number[];
    totalVotes: number;
    mediaThumbnailURL?: string;
    mediaCaption: string;
    comments?: Comment[]; // Define the Comment interface or type as needed
    likes?: Like[]; // Define the Like interface or type as needed
  }
  
  // Define the Comment and Like interfaces or types as needed
interface Comment {
    _id: string;
    userId: IUserSlice;
    content: string;
    timeStamp: string;
    likes?: Like[];
  }
  
  interface Like {
    userId: string;
    timeStamp: string;
  }