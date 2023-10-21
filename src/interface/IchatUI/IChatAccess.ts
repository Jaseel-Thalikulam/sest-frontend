import { IChat } from "../IFetchChats/ChatList.Inteface";

export interface IChatAccess{
    success: boolean;
    message: string;
    Chat:IChat
}