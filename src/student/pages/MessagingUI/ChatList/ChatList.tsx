import {
  List,
  ListItem,
  ListItemAvatar,
  Avatar,
  ListItemText,
} from "@mui/material";
import { useEffect, useState } from "react";
import  {axiosInstance} from "../../../../common/interceptor/axiosInstance";
import { useSelector } from "react-redux";
import { RootStateType } from "../../../../redux/store";
import IFetchChatList, {
  IChat,
} from "../../../../interface/IFetchChats/ChatList.Inteface";
import PublicMethods from "../../../../Methods/PublicMethods";
import { ChatListProps } from "../../../../interface/chatListProp/chatListProp";
import { format } from 'date-fns';
import ErrorBoundary from "../../../../common/Components/errorBoundary/ErrorBoundary";


function ChatList({ onSelectChat }: ChatListProps) {
  const publicmethods = new PublicMethods();
  const data = useSelector((state: RootStateType) => state.user);
  const { _id } = data;
  const [ChatsList, setChatsList] = useState<IChat[]>([]);
  const [selectedChatId,setSelectedChatId] = useState('')
  useEffect(() => {
    
   void(async function fetchChatList() {
      try {
          const response: { data: IFetchChatList } =
            await axiosInstance.post("/chat/fetchallchats", {
              userId: _id,
            });
          
            setChatsList(response.data.Chats);
       

        // Handle the response here
        
      } catch (error) {
        // Handle errors here
        console.error("Error fetching chat list:", error);
      }
    })();
   
  }, [_id]);


  function handleChatClick(ChatId: string, avatarUrl: string, name: string, email: string, userId: string, createdAt: string | Date) {
    
    onSelectChat(
      ChatId,
      avatarUrl,
      name,
      email,
      userId,
      createdAt
    )

    setSelectedChatId(ChatId)

  }

  return (
    <>
      <ErrorBoundary>
        <div className="mr-3">
          
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
            className={`cursor-pointer rounded-md mb-3 ${selectedChatId === Chat._id
              ? 'bg-8A3FFC text-white shadow-md transition-color duration-700'
              : 'hover:bg-gray-100'}`} 
            
              key={Chat._id}
              onClick={() =>
                handleChatClick(
                  Chat._id,
                  Chat.users[0].avatarUrl,
                  Chat.users[0].name,
                  Chat.users[0].email,
                  Chat.users[0]._id,
                  Chat.users[0].createdAt
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
                  <div  className={`${selectedChatId === Chat._id ?'text-white':''}`} style={{ display: "flex", justifyContent: "space-between" }}>
                    {Chat.latestMessage ? Chat.latestMessage.content : null}
                    <span className={`${selectedChatId === Chat._id ?'text-white':''}`}>
                      {Chat.latestMessage ? format(new Date(Chat.latestMessage.timeStamp),"h:mm a") : null}
                     
                    </span>
                  </div>
                }
              />
             
              
            </ListItem>
          ))}
        </List>
      </div>
                  </div>
                </ErrorBoundary>
    </>
  );
}

export default ChatList;

