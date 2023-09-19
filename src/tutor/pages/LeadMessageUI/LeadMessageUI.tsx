import React, { useEffect, useState } from "react";
import { Avatar } from "@mui/material";
import ChatList from "../../../student/pages/MessagingUI/ChatList/ChatList";
import ReceiverDetail from "../../../student/pages/MessagingUI/ReceiverDetail/ReceiverDetail";
import { useSelector } from "react-redux";
import PublicMethods from "../../../Methods/PublicMethods";
import { RootStateType } from "../../../redux/store";
import ChatUI from "../../../student/components/ChatUI/ChatUI";
import { WebSocketProvider, socket } from "../../../contexts/WebSocket";

function LeadMessageUI() {
  const data = useSelector((state: RootStateType) => state.user);
  const publicmethod = new PublicMethods();
  const { name, username, avatarUrl } = data;

  const [selectedChatId, setSelectedChatId] = useState("");
  const [selectedChatAvatarUrl, setSelectedChatAvatarUrl] = useState("");
  const [selectedChatName, setSelectedChatName] = useState("");
  const [screenWidth, setScreenWidth] = useState(window.innerWidth);
  const [selectedChatabout, setselectedChatabout] = useState<string | null|undefined>("");

  useEffect(() => {
    const handleResize = () => {
      setScreenWidth(window.innerWidth);
    };

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  const handleChatSelect = (
    chatId: string,
    avatarUrl: string,
    name: string,
    about:string|null|undefined
  ) => {
    setSelectedChatId(chatId);
    setSelectedChatAvatarUrl(avatarUrl);
    setSelectedChatName(publicmethod.properCase(name));
    setselectedChatabout(about)

  };

  const shouldShowReceiverDetail = screenWidth >= 1025;

  return (
    <div className="flex flex-col min-h-80vh">
      <div className="flex-grow bg-white-100">
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
                <div className="w-full p-2" style={{ flex: shouldShowReceiverDetail ? "2" : "3" }}>
                  <div className="h-full flex flex-col">
                    {/* Containing the ChatUI component */}
                    {selectedChatId !== "" && (
                      <WebSocketProvider value={socket}>
                        <ChatUI
                          recipientAvatarUrl={selectedChatAvatarUrl}
                          chatId={selectedChatId}
                          recipientName={selectedChatName}
                        />
                      </WebSocketProvider>
                    )}
                  </div>
                </div>

                {/* Conditionally render the ReceiverDetail component */}
                {shouldShowReceiverDetail && (
                  <div className="w-1/4 p-2">
                    {/* Content for receiver's details */}
                    {selectedChatId !== "" && (
                      <ReceiverDetail
                        avatar={selectedChatAvatarUrl}
                        name={selectedChatName}
                        about={selectedChatabout}
                      />
                    )}
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default LeadMessageUI;
