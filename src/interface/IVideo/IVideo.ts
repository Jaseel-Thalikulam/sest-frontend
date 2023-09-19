import { ICourse } from "../ICourse/Icourse";

export interface IVideo{
    _id: string;
    Title: string;
    URL: string;
    CourseId: ICourse;
    PublisherId: string;
    ThumbnailURL:string
    
}