import { IVideo } from "./IVideo"

export interface IUploadVideo{
    success: boolean
    message: string
    videoData:IVideo
}