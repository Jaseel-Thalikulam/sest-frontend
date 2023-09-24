import { ICourse } from "./Icourse";

export interface ICourseAPI {
    success: boolean,
    message: string,
    CourseData:ICourse
}