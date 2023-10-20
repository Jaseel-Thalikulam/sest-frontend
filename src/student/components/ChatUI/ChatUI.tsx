import { useState, useEffect, useContext, useRef } from "react";
import { IFetchMessagesAPI } from "../../../interface/IMessage/IfetchmessagesAPI";
import ErrorBoundary from "../../../common/Components/errorBoundary/ErrorBoundary";
import { IDisplayData } from "../../../interface/IMessage/IDisplayData";
import {axiosInstance} from "../../../common/interceptor/axiosInstance";
import { WebSocketContext } from "../../../contexts/WebSocket";
import IMessage from "../../../interface/IMessage/Imessage";
import IChatUI from "../../../interface/IchatUI/IchatUI";
import { RootStateType } from "../../../redux/store";
import { Avatar, IconButton } from "@mui/material";
import "./ChatUI.scss";
import { useSelector } from "react-redux";
import { format } from "date-fns";


function ChatUI({ chatId, recipientName, recipientAvatarUrl }: IChatUI) {
  const currentUser = useSelector((state: RootStateType) => state.user);
  const currentUserId = currentUser._id;
  const [messages, setMessages] = useState<IMessage[]>([]);
  const [displayData, setDisplayData] = useState<IDisplayData | null>(null);
  const [newMessage, setNewMessage] = useState("");
  const messagesContainerRef = useRef<HTMLDivElement>(null);

  const socket = useContext(WebSocketContext);

  useEffect(() => {
    socket.on("connect", () => {
      console.log("Connected");
 
    });

    socket.on(chatId, (data:IMessage) => {
      const { content, sender, timeStamp }: IMessage = data;

      
      // Create a new message object
      const newMessage: IMessage = {
        content: content,
        sender: sender,
        status: "read",
        timeStamp: timeStamp,
      };

      // Append the new message to the existing messages
      setMessages((prevMessages) => [...prevMessages, newMessage]);
      setTimeout(() => {
        if (messagesContainerRef.current) {
          messagesContainerRef.current.scrollTop =
            messagesContainerRef.current.scrollHeight;
        }
      }, 0);
      // Clear the input field
      setNewMessage("");
    });


 

    return () => {
      
      socket.off("connect");
      socket.off(chatId);
    };
  }, [chatId, socket]);
  
  let typingTimeout: NodeJS.Timeout | null;

  let isTyping = false; // Initialize a flag to track typing state

  function handleOnchangeMessage(value: string) {
    if (typingTimeout) {
      clearTimeout(typingTimeout);
    }
  
    if (!isTyping) {
      // User has started typing
      socket.emit("typing", {
        ChatId: chatId,
        Typing: true,
        SenderId: currentUserId,
      });
      isTyping = true;
    }
  
    setNewMessage(value);
  
    typingTimeout = setTimeout(() => {
      if (isTyping) {
        // User has stopped typing
        socket.emit("typing", {
          ChatId: chatId,
          Typing: null,
          SenderId: currentUserId,
        });
        isTyping = false;
      }
    }, 2000);
  }
  
  
  
  const handleSendMessage =  () => {
    if (newMessage.trim() === "") return;

    socket.emit("message", {
      ChatId: chatId,
      Content: newMessage,
      SenderId: currentUserId,
      timeStamp: new Date().toISOString(),
    });
    
  };

  useEffect(() => {
    // Scroll to the last message without affecting page scroll
    const messagesContainer = messagesContainerRef.current;
    if (messagesContainer) {
      const lastMessage = messagesContainer.querySelector('.chatMessages > div:last-child') as HTMLElement;
      if (lastMessage) {
        messagesContainer.scrollTo({
          top: lastMessage.offsetTop,
          behavior: 'smooth'
        });
      }
    }
  }, [messages]);
  

 
  useEffect(() => {
    void(async function fetchAllMessage() {
          
        const response: { data:IFetchMessagesAPI } = await axiosInstance.get(
          "/chat/fetchAllMessage",
          {
            params: {
              ChatId: chatId,
            },
          }
        );

      
      setMessages(response.data.data);
      


  
      socket.on(`${chatId}display`, (data: { data: IDisplayData }) => {
  
        setDisplayData(data.data);
  
      
        
        
  
       
      });

      
    })();
  }, [chatId]);

  return (
    <>
      <ErrorBoundary>

        <div className="chatContainer ">
          
        {/* <div className="chatHeader">
          <div style={{ display: "flex", alignItems: "center" }}>
            <Avatar
              alt="Recipient"
              src={recipientAvatarUrl}
              style={{ width: "32px", height: "32px", marginRight: "10px" }}
            />
            <div>
                <h3 style={{ margin: 0, fontSize: "1.2rem" }}>{recipientName}</h3>
                <div className="h-2">

                {displayData?.Typing && displayData.ChatId === chatId && displayData.SenderId != currentUser._id && (
                  
                  <span>Typing..</span>
                  )}
                  </div>
            </div>
          </div>
          </div> */}
          
        <div className="chatMessagesWrapper" ref={messagesContainerRef}>
          <div className="chatMessages">
              {messages.map((message: IMessage, index: number) => (
     
                <div
                  className="mb-10"
                key={index}
                style={{
                  display: "flex",
                  flexDirection: "column",
                  alignItems:
                  message.sender[0]  == currentUser._id
                      ? "flex-end"
                      : "flex-start",
                  marginBottom: "15px",
                }}
              >
                  <div
                    className="ml-5 mr-5"
                  style={{
                    display: "flex",
                    maxWidth: "70%",
                    alignSelf:
                    message.sender[0]== currentUser._id
                        ? "flex-end"
                        : "flex-start",
                  }}
                >
                  {message.sender[0] !== currentUser._id  && (
                  <Avatar
                  alt="Recipient"
                    src={recipientAvatarUrl}
                    style={{
                      width: "50px",
                      height: "50px",
                      marginRight: "15px",
                      alignSelf:
                    message.sender[0]== currentUser._id
                        ? "flex-end"
                        : "flex-start",
                      
                    }}
                  />
                )}

                    <div
                      className="text-lg font-thin"
                    style={{
                      display: "flex",
                      justifyContent: "space-between",
                      alignItems: "center",
                      color:  message.sender[0] == currentUser._id
                      ? "#fff"
                      : "#000",
                      
                      backgroundColor:
                      message.sender[0] == currentUser._id
                          ? "#8A3FFC"
                          : "#EDEDED ",
                      paddingTop:"10px",
                      paddingBottom:"10px",
                      paddingLeft: "18px",
                      paddingRight: "18px",
                      borderRadius:"30px"
                     // Border radius for message containers
                    }}
                    >
                    { message.content
                    
                    }

                    <div
                      style={{
                        display: "flex",
                        justifyContent: "flex-end",
                        alignItems: "center",
                        marginTop: "4px",
                      }}
                    >
                      {/* { message.senderId[0] === currentUser._id && (
                      <span
                      style={{
                        fontSize: "12px",
                        marginRight: "6px",
                        color: "#999",
                      }}
                      >
                      {message.status === "sent" && "Sent"}
                        {message.status === "delivered" && (
                          <CheckIcon fontSize="inherit" style={{ color: "orange" }} />
                        )}
                        {message.status === "read" && (
                          <CheckIcon fontSize="inherit" style={{ color: "green" }} />
                        )}
                      </span>
                    )} */}
                      
                    </div>
                    </div>
                    {message.sender[0] === currentUser._id  && (
                      <Avatar
                        className="ml-3"
                  alt="Recipient"
                    src={currentUser.avatarUrl}
                    style={{
                      width: "50px",
                      height: "50px",
                      marginRight: "15px",
                      alignSelf:
                    message.sender[0]== currentUser._id
                        ? "flex-end"
                        : "flex-start",
                      
                    }}
                  />
                )}
                    </div>
                  <span
                    className={`text-c0c0c0 text-sm ${ message.sender[0] == currentUser._id?"mr-28 mt-2":"ml-24 mt-2"}`}
                        
                      >
                        {/* Format the message timestamp */}
                        {message.timeStamp
                          ? format(new Date(message.timeStamp), "h:mm a")
                          : null}
                      </span>

              </div>
            ))}
              <div />
              
             <div className="w-10 h-10">

                {displayData?.Typing && displayData.ChatId === chatId && displayData.SenderId != currentUser._id && (
                  
                  <div className={`typing-indicator rounded-3xl p-5  bg-EDEDED float-left ml-20 `}>
                    
    <>
      <div className="typing-circle"></div>
      <div className="typing-circle"></div>
      <div className="typing-circle"></div>
      <div className="typing-shadow"></div>
      <div className="typing-shadow"></div>
      <div className="typing-shadow"></div>
    </>
                  </div>
                  
)}
              </div> 
              



          </div>
        </div>
        <div
          className="chatInputWrapper"
          style={{ display: "flex", alignItems: "center" }}
        >
          <input
            type="text"
            placeholder="Type here.."
            style={{
              flex: 1,
              height: "40px",
              borderRadius: "20px",
              padding: "8px 16px",
              marginRight: "8px",
              outline: "none",
            }}
            value={newMessage}
            onChange={(e) => handleOnchangeMessage(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                void handleSendMessage();
              }
            }}
          />

          <IconButton
            onClick={()=>void handleSendMessage()}
            aria-label="send"
        
            >
           <svg fill="#8A3FFC" height="30px" width="30px" version="1.1" id="Capa_1" xmlns="http://www.w3.org/2000/svg" 
	 viewBox="0 0 495.003 495.003" xmlSpace="preserve">
<g id="XMLID_51_">
	<path id="XMLID_53_" d="M164.711,456.687c0,2.966,1.647,5.686,4.266,7.072c2.617,1.385,5.799,1.207,8.245-0.468l55.09-37.616
		l-67.6-32.22V456.687z"/>
	<path id="XMLID_52_" d="M492.431,32.443c-1.513-1.395-3.466-2.125-5.44-2.125c-1.19,0-2.377,0.264-3.5,0.816L7.905,264.422
		c-4.861,2.389-7.937,7.353-7.904,12.783c0.033,5.423,3.161,10.353,8.057,12.689l125.342,59.724l250.62-205.99L164.455,364.414
		l156.145,74.4c1.918,0.919,4.012,1.376,6.084,1.376c1.768,0,3.519-0.322,5.186-0.977c3.637-1.438,6.527-4.318,7.97-7.956
		L494.436,41.257C495.66,38.188,494.862,34.679,492.431,32.443z"/>
</g>
</svg>
          </IconButton>
          <IconButton aria-label="send" color="primary">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth="1.5"
              stroke="currentColor"
              className="w-6 h-6"
              >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M15.182 15.182a4.5 4.5 0 01-6.364 0M21 12a9 9 0 11-18 0 9 9 0 0118 0zM9.75 9.75c0 .414-.168.75-.375.75S9 10.164 9 9.75 9.168 9 9.375 9s.375.336.375.75zm-.375 0h.008v.015h-.008V9.75zm5.625 0c0 .414-.168.75-.375.75s-.375-.336-.375-.75.168-.75.375-.75.375.336.375.75zm-.375 0h.008v.015h-.008V9.75z"
              />
            </svg>
          </IconButton>

       
        </div>
      </div>
                </ErrorBoundary>
    </>
  );
}

export default ChatUI;
