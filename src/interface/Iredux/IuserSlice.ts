 interface IUserSlice {
     URLs: URLs;
    role?: string;
    name: string;
   email?: string;
   username: string;
    DOB?: null | Date;
    _id: string;
    phoneNumber: string|null;
   about?: string|null;
   isBanned: boolean;
   tags: Tag[]|null;
   avatarUrl:string|null
}

interface URLs {
    github?: string|null;
  linkedin?: string|null;
    pinterest?: string|null;
  }

  interface Tag {
    _id: string;
    Name: string;
    Description: string;
    IsListed: boolean;
    __v: number;
}
export default IUserSlice