import IUserSlice from "../Iredux/IuserSlice";

export interface IChat {
  _id: string;
  isGroupChat: boolean;
  users: Array<IUserSlice>;
  createdAt: string;
  updatedAt: string;
  __v: number;
 
}

export default interface IFetchChatList {
  Chats: Array<IChat>;  // Define the type of the Chats array
  success: boolean;
  message: string;
}
