
import IMessage from "./Imessage";

export interface IFetchMessagesAPI {
    message: string;
    success: boolean;
    data:IMessage[]
}