
import ICategorydata from "./IcategoryData";


export default interface ICategoryResponse {
      
    message: string;
    success: boolean;
    categorydata:ICategorydata[]
    
  }
  