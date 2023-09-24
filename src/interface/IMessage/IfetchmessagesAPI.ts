import IMessage from "./IMessage";


export interface IFetchMessagesAPI {
    message: string;
    success: boolean;
    data:IMessage[]
}