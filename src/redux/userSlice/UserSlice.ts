import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import IUserSlice from '../../interface/Iredux/IuserSlice';
const INITIAL_STATE: IUserSlice = {
    role: "",
    name: "",
  email: "",
    username:"",
    DOB: null,
    _id: "",
    phoneNumber: "",
    about: "",
    URLs: {
        github: "",
        linkedin: "",
        pinterest: "",
  },
  tags: [],
  isBanned:true,
  avatarUrl: '',
  createdAt:''
  
}

const UserSlice = createSlice({
    name: "User",
    initialState: INITIAL_STATE,
    reducers: {
        UserDetails: (state, action: PayloadAction<IUserSlice>) => {
          
            const { role, name,username, email, phoneNumber, DOB, _id, about, URLs,tags,avatarUrl } = action.payload;

            if (role !== undefined) {
              state.role = role;
            }
            if (name !== undefined) {
              state.name = name;
            }
            if (email !== undefined) {
              state.email = email;
            }
            if (phoneNumber !== undefined) {
              state.phoneNumber = phoneNumber;
            }
            if (DOB !== undefined) {
              state.DOB = DOB;
            }
            if (_id !== undefined) {
              state._id = _id;
            }
            if (about !== undefined) {
              state.about = about;
            }
            if (avatarUrl !== undefined) {
              state.avatarUrl = avatarUrl;
            }
            if (URLs !== undefined) {
              if (URLs.github !== undefined) {
                state.URLs!.github = URLs.github;
              }
              if (URLs.linkedin !== undefined) {
                state.URLs!.linkedin = URLs.linkedin;
              }
              if (URLs.pinterest !== undefined) {
                state.URLs!.pinterest = URLs.pinterest;
              }
        }
        if (tags !== undefined) {
          state.tags = tags; // Set the tags field
      }
        if (username !== undefined) {
          state.username = username; // Set the tags field
      }



        }
    }
})



export const { UserDetails } = UserSlice.actions
export default UserSlice.reducer;