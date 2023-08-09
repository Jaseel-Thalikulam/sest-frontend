 interface IUserSlice {
     URLs: URLs;
    role?: string;
    name: string;
    email?: string;
    DOB?: null | Date;
    _id?: string;
    phoneNumber?: string;
   about?: string;
   isBanned?: boolean;
   tags: Tag[];
   avatarUrl:string
}

interface URLs {
    github?: string;
    linkedin?: string;
    pinterest?: string;
  }

  interface Tag {
    _id: string;
    Name: string;
    Description: string;
    IsListed: boolean;
    __v: number;
}
export default IUserSlice