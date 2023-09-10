import {
  List,
  ListItem,
  ListItemAvatar,
  Avatar,
  ListItemText,
} from "@mui/material";
import { useEffect, useState } from "react";
import axiosInstanceStudent from "../../../interceptor/axiosInstance.Student";
import { useSelector } from "react-redux";
import { RootStateType } from "../../../../redux/store";
import IFetchChatList, {
  IChat,
} from "../../../../interface/IFetchChats/ChatList.Inteface";
import PublicMethods from "../../../../Methods/PublicMethods";
import axiosInstanceTutor from "../../../../tutor/interceptor/axiosInstanceTutor";
import { ChatListProps } from "../../../../interface/chatListProp/chatListProp";
import { format } from 'date-fns';


function ChatList({ onSelectChat }: ChatListProps) {
  const publicmethods = new PublicMethods();
  const data = useSelector((state: RootStateType) => state.user);
  const { _id } = data;
  const [ChatsList, setChatsList] = useState<IChat[]>([]);
  useEffect(() => {
    
    (async function fetchChatList() {
      try {
        if (localStorage.getItem("jwt-learn")) {
          const response: { data: IFetchChatList } =
            await axiosInstanceStudent.post("/chat/fetchallchats", {
              userId: _id,
            });
          
            setChatsList(response.data.Chats);
          } else if (localStorage.getItem("jwt-lead")) {
            const response: { data: IFetchChatList } =
            await axiosInstanceTutor.post("/chat/fetchallchats", {
              userId: _id,
            });
          setChatsList(response.data.Chats);
          
        }

        // Handle the response here
        
      } catch (error) {
        // Handle errors here
        console.error("Error fetching chat list:", error);
      }
    })();
   
  }, []);

  return (
    <>
      <input
        type="text"
        placeholder="Search"
        className="border border-gray-300 rounded-md w-full p-2 mb-4 outline-none"
      />
      {/* Display messages */}
      <div
        className="message-list-container"
        style={{
          maxHeight: "calc(80vh - 180px)",
          overflowY: "auto",
        }}
      >
        <List>
          {ChatsList.map((Chat) => (
            <ListItem
              className="cursor-pointer"
              key={Chat._id}
              onClick={() =>
                onSelectChat(
                  Chat._id,
                  Chat.users[0].avatarUrl,
                  Chat.users[0].name,
                  Chat.users[0].about
                )
              }
            >
              <ListItemAvatar>
                
                <Avatar>
                  <img src={Chat.users[0].avatarUrl} alt="avatar" />
                </Avatar>
              </ListItemAvatar>

              <ListItemText
                primary={publicmethods.properCase(Chat.users[0].name)}
                primaryTypographyProps={{ variant: "subtitle2" }}
                secondaryTypographyProps={{ variant: "body2" }}
                secondary={
                  <div style={{ display: "flex", justifyContent: "space-between" }}>
                    {Chat.latestMessage ? Chat.latestMessage.content : null}
                    <span>
                      {Chat.latestMessage ? format(new Date(Chat.latestMessage.timeStamp),"h:mm a") : null}
                     
                    </span>
                  </div>
                }
              />
             
              
            </ListItem>
          ))}
        </List>
      </div>
    </>
  );
}

export default ChatList;

