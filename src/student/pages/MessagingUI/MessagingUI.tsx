import { Avatar } from "@mui/material";
import ChatUI from "../../components/ChatUI/ChatUI";
import "./MessagingUI.scss";
import ChatList from "./ChatList/ChatList";
import ReceiverDetail from "./ReceiverDetail/ReceiverDetail";
import { useSelector } from "react-redux";
import { RootStateType } from "../../../redux/store";
import PublicMethods from "../../../Methods/PublicMethods";
import { useEffect, useState } from "react";
import { WebSocketProvider, socket } from "../../../contexts/WebSocket";
import ErrorBoundary from "../../../common/Components/errorBoundary/ErrorBoundary";
function MessagingUI() {
  const data = useSelector((state: RootStateType) => state.user);
  const publicmethod = new PublicMethods();
  const { name, username, avatarUrl } = data;

  const [selectedChatId, setSelectedChatId] = useState("");
  const [selectedChatAvatarUrl, setSelectedChatAvatarUrl] = useState("");
  const [selectedChatName, setSelectedChatName] = useState("");
  const [selectedChatabout, setselectedChatabout] = useState<
    string | null | undefined
  >("");
  const [screenWidth, setScreenWidth] = useState(window.innerWidth);
  useEffect(() => {
    const handleResize = () => {
      setScreenWidth(window.innerWidth);
    };

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  const shouldShowReceiverDetail = screenWidth >= 1025;

  const handleChatSelect = (
    chatId: string,
    avatarUrl: string,
    name: string,
    about: string | null | undefined
  ) => {
    setSelectedChatId(chatId);
    setSelectedChatAvatarUrl(avatarUrl);
    setSelectedChatName(publicmethod.properCase(name));
    setselectedChatabout(about);
  };

  return (
    <ErrorBoundary>

    <div className="flex flex-col min-h-screen">
      <div className="flex-grow bg-white">
        <div className="container mx-auto py-8">
          <div className="w-full md:w-4/4 mb-4 md:mb-0">
            <div
              className="bg-white p-4 rounded-lg shadow-md "
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

                {selectedChatId !== "" ? ( // Check if a chat is selected
                  <div
                    className="w-full p-2"
                    style={{ flex: shouldShowReceiverDetail ? "2" : "3" }}
                  >
                    <div className="h-full flex flex-col">
                      {/* Containing the ChatUI component */}
                      <WebSocketProvider value={socket}>
                        <ChatUI
                          chatId={selectedChatId}
                          recipientAvatarUrl={selectedChatAvatarUrl}
                          recipientName={selectedChatName}
                        />
                      </WebSocketProvider>
                    </div>
                  </div>
                ) : (
                  <div className="w-full p-2 flex flex-col items-center justify-center">
                  {/* No Message Illustration */}
                 
                  <p className="mt-4 text-gray-500 text-lg font-semibold">Select A Chat</p>
                </div>
                )}

                {shouldShowReceiverDetail && (
                  <div className="w-1/4 p-2">
                    {/* Content for receiver's details */}
                    {selectedChatId !== "" && (
                      <ReceiverDetail
                        about={selectedChatabout}
                        avatar={selectedChatAvatarUrl}
                        name={selectedChatName}
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
                        </ErrorBoundary>
  );
}

export default MessagingUI;
