import { useState, useEffect, useContext, useRef } from "react";
import { Avatar, IconButton } from "@mui/material";
import "./ChatUI.scss";
import IChatUI from "../../../interface/IchatUI/IchatUI";
import {axiosInstance} from "../../../common/interceptor/axiosInstance";
import { RootStateType } from "../../../redux/store";
import { useSelector } from "react-redux";
import IMessage from "../../../interface/IMessage/Imessage";
import { WebSocketContext } from "../../../contexts/WebSocket";
import { format } from "date-fns";
import { IFetchMessagesAPI } from "../../../interface/IMessage/IfetchmessagesAPI";
import ErrorBoundary from "../../../common/Components/errorBoundary/ErrorBoundary";

function ChatUI({ chatId, recipientName, recipientAvatarUrl }: IChatUI) {
  const currentUser = useSelector((state: RootStateType) => state.user);
  const currentUserId = currentUser._id;
  const [messages, setMessages] = useState<IMessage[]>([]);
  const [newMessage, setNewMessage] = useState("");
  const messagesContainerRef = useRef<HTMLDivElement>(null);

  const socket = useContext(WebSocketContext);

  useEffect(() => {
    socket.on("connect", () => {
      console.log("Connected");
    });

    socket.on(chatId, (data:IMessage) => {
      const { content, senderId, timeStamp }: IMessage = data;

      // Create a new message object
      const newMessage: IMessage = {
        content: content,
        senderId: senderId,
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
      console.log("Unregistered Events");
      socket.off("connect");
      socket.off(chatId);
    };
  }, [chatId,socket]);

  function handleOnchangemessage(value: string) {
    setNewMessage(value);
  }
  const handleSendMessage =  () => {
    if (newMessage.trim() === "") return;

    socket.emit("message", {
      ChatId: chatId,
      Content: newMessage,
      senderIdId: currentUserId,
      timeStamp: new Date().toISOString(),
    });
  };
  useEffect(() => {
    // Scroll to the bottom when the component mounts
    if (messagesContainerRef.current) {
      messagesContainerRef.current.scrollTop =
        messagesContainerRef.current.scrollHeight;
    }
  }, []);
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
      
    })();
  }, [chatId]);

  return (
    <>
      <ErrorBoundary>

      <div className="chatContainer">
        <div className="chatHeader">
          <div style={{ display: "flex", alignItems: "center" }}>
            <Avatar
              alt="Recipient"
              src={recipientAvatarUrl}
              style={{ width: "32px", height: "32px", marginRight: "10px" }}
            />
            <div>
              <h3 style={{ margin: 0, fontSize: "1.2rem" }}>{recipientName}</h3>
              {/* <p style={{ margin: 0, color: "gray" }}>Online</p> */}
            </div>
          </div>
        </div>
        <div className="chatMessagesWrapper" ref={messagesContainerRef}>
          <div className="chatMessages">
            {messages.map((message: IMessage, index: number) => (
              <div
                key={index}
                style={{
                  display: "flex",
                  flexDirection: "column",
                  alignItems:
                    message.senderId == currentUser._id
                      ? "flex-end"
                      : "flex-start",
                  marginBottom: "10px",
                }}
              >
                <div
                  style={{
                    display: "flex",
                    maxWidth: "70%",
                    alignSelf:
                      message.senderId == currentUser._id
                        ? "flex-end"
                        : "flex-start",
                  }}
                >
                  {/* {message.senderId[0] !== currentUser._id  && (
                  <Avatar
                  alt="Recipient"
                    src={recipientAvatarUrl}
                    style={{
                      width: "24px",
                      height: "24px",
                      marginRight: "10px",
                    }}
                  />
                )} */}

                  <div
                    style={{
                      display: "flex",
                      justifyContent: "space-between",
                      alignItems: "center",
                      color:  message.senderId == currentUser._id
                      ? "#fff"
                      : "#000",
                      
                      backgroundColor:
                        message.senderId == currentUser._id
                          ? "#6C63FF"
                          : "#EDEDED ",
                      padding: "10px",
                      borderRadius:
                      message.senderId == currentUser._id
                          ? "15px 0px 15px 15px"
                          : "0px 15px 15px 15px", // Border radius for message containers
                    }}
                    >
                    {message.content}

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
                      <span
                        style={{
                          fontSize: "10px",
                          color:  message.senderId == currentUser._id
                          ? "#fff"
                          : "#000",
                          marginLeft: "6px",
                        }}
                      >
                        {/* Format the message timestamp */}
                        {message.timeStamp
                          ? format(new Date(message.timeStamp), "h:mm a")
                          : null}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            ))}
            <div />
          </div>
        </div>
        <div
          className="chatInputWrapper"
          style={{ display: "flex", alignItems: "center" }}
        >
          <input
            type="text"
            placeholder="Type your message"
            style={{
              flex: 1,
              height: "40px",
              borderRadius: "20px",
              padding: "8px 16px",
              marginRight: "8px",
              border: "1px solid #ccc",
              outline: "none",
            }}
            value={newMessage}
            onChange={(e) => handleOnchangemessage(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                void handleSendMessage();
              }
            }}
          />

          <IconButton
            onClick={()=>void handleSendMessage()}
            aria-label="send"
            color="primary"
            >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 20 20"
              fill="currentColor"
              className="w-5 h-5"
              >
              <path d="M3.105 2.289a.75.75 0 00-.826.95l1.414 4.925A1.5 1.5 0 005.135 9.25h6.115a.75.75 0 010 1.5H5.135a1.5 1.5 0 00-1.442 1.086l-1.414 4.926a.75.75 0 00.826.95 28.896 28.896 0 0015.293-7.154.75.75 0 000-1.115A28.897 28.897 0 003.105 2.289z" />
            </svg>
          </IconButton>
          <IconButton aria-label="send" color="primary">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke-width="1.5"
              stroke="currentColor"
              className="w-6 h-6"
              >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
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
