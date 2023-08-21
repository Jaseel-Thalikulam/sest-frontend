import { Avatar } from "@mui/material";
import ChatUI from "../../components/ChatUI/ChatUI";
import "./MessagingUI.scss";
import ChatList from "./ChatList/ChatList";
import ReceiverDetail from "./ReceiverDetail/ReceiverDetail";
import { useSelector } from "react-redux";
import { RootStateType } from "../../../redux/store";
import PublicMethods from "../../../Methods/PublicMethods";
import { useState } from "react";

function MessagingUI(){
  const data = useSelector((state: RootStateType) => state.user);
  const publicmethod = new PublicMethods();
  const { name, username, avatarUrl } = data;

  const [selectedChatId, setSelectedChatId] = useState('');
  const [selectedChatAvatarUrl, setSelectedChatAvatarUrl] = useState('');
  const [selectedChatName, setSelectedChatName] = useState('');

  const handleChatSelect = (chatId:string, avatarUrl: string, name: string) => {
 
    setSelectedChatId(chatId);
    setSelectedChatAvatarUrl(avatarUrl);
    setSelectedChatName(publicmethod.properCase(name));
  };

  return (
    <div className="flex flex-col min-h-screen">
      <div className="flex-grow bg-gray-100">
        <div className="container mx-auto py-8">
          <div className="w-full md:w-4/4 mb-4 md:mb-0">
            <div
              className="bg-white p-4 rounded-lg shadow-md"
              style={{ height: "80vh" }}
            >
              <div className="flex h-full">
                <div className="w-1/4 p-2 border-r">
                  {/* Display sender's avatar, name, and role */}
                  <div className="flex items-center mb-4">
                    <Avatar>
                      <img src={avatarUrl} alt="User Avatar" />
                    </Avatar>
                    <div className="ml-2">
                      <p className="text-lg font-semibold">
                      {publicmethod.properCase(name)}
                      </p>
                      <p className="text-gray-500">
                        @{publicmethod.properCase(username)}
                      </p>
                    </div>
                  </div>
                  {/* Display search input */}
                  <ChatList onSelectChat={handleChatSelect} />
                 
                </div>
                <div className="w-2/4 p-2 border-r">
                  <div style={{ height: "73vh", overflow: "hidden" }}>
                    {/* Containing the ChatUI component */}
                    {
                  selectedChatId!='' &&(
                  
               
                        <ChatUI chatId={selectedChatId} recipientAvatarUrl={selectedChatAvatarUrl} recipientName={selectedChatName} />
                        )
                      }
                  </div>
                </div>
                <div className="w-1/4 p-2">
                  {/* Content for receiver's details */}
                  {
                  selectedChatId!='' &&(
                  
               
                    <ReceiverDetail avatar={selectedChatAvatarUrl }name={selectedChatName}  />   
                       
                        )
                      }
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default MessagingUI;
