import { useState, useEffect, useContext, useRef } from "react";
import { Avatar } from "@mui/material";
import "./ChatUI.scss";
import IChatUI from "../../../interface/IchatUI/IchatUI";
import axiosInstanceTutor from "../../../tutor/interceptor/axiosInstanceTutor";
import axiosInstanceStudent from "../../interceptor/axiosInstance.Student";
import { RootStateType } from "../../../redux/store";
import { useSelector } from "react-redux";
import InewMessage from "../../../interface/IMessage/InewMessage";
import { WebSocketContext } from "../../../contexts/WebSocket";
import Imessage from "../../../interface/IMessage/Imessage";
import { format } from 'date-fns';

function ChatUI({ chatId, recipientName, recipientAvatarUrl }: IChatUI) {
  const currentUser = useSelector((state: RootStateType) => state.user);
  const currentUserId = currentUser._id;
  const [messages, setMessages] = useState<InewMessage[]>([]);
  const [newMessage, setNewMessage] = useState("");
  const messagesContainerRef = useRef<HTMLDivElement>(null);

  const socket = useContext(WebSocketContext);

  useEffect(() => {
    
    socket.on("connect", () => {
      console.log("Connected");
    });

    socket.on(chatId, (data) => {
      const { content, senderId,timeStamp }: Imessage = data;

      // Create a new message object
      const newMessage: InewMessage = {
        content: content,
        sender: senderId,
        status: "read",
        timeStamp:timeStamp
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
  }, []);

  function handleOnchangemessage(value: string) {
    setNewMessage(value);
  }
  const handleSendMessage = async () => {
    if (newMessage.trim() === "") return;

    socket.emit("message", {
      ChatId: chatId,
      Content: newMessage,
      SenderId: currentUserId,
      timeStamp:new Date().toISOString(),
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
    (async function fetchAllMessage() {
      if (localStorage.getItem("jwt-lead")) {
        const response: { data } = await axiosInstanceTutor.get(
          "/chat/fetchAllMessage",
          {
            params: {
              ChatId: chatId,
            },
          }
        );

        const Messages = response.data.data;

        setMessages(Messages);
  
      } else if (localStorage.getItem("jwt-learn")) {
        const response: { data } = await axiosInstanceStudent.get(
          "/chat/fetchAllMessage",
          {
            params: {
              ChatId: chatId,
            },
          }
        );

        const Messages = response.data.data;
        setMessages(Messages);

      }
    })();

    
  }, [chatId]);

  return (
    <>
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
            {messages.map((message: InewMessage, index: number) => (
              <div
                key={index}
                style={{
                  display: "flex",
                  flexDirection: "column",
                  alignItems:
                    message.sender == currentUser._id
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
                      message.sender == currentUser._id
                        ? "flex-end"
                        : "flex-start",
                  }}
                >
                  {/* {message.sender[0] !== currentUser._id  && (
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
                     
                      backgroundColor:
                        message.sender == currentUser._id
                          ? "#DCF8C6"
                          : "#F4F6F8",
                      padding: "10px",
                      borderRadius:
                        message.sender == currentUser._id
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
                      {/* { message.sender[0] === currentUser._id && (
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
                      <span style={{ fontSize: "10px", color: "#999", marginLeft: "6px" }}>
                    {/* Format the message timestamp */}
                    {message.timeStamp?format(new Date(message.timeStamp), "h:mm a"):null}
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
          <button
            style={{
              backgroundColor: "#0084ff",
              color: "white",
              border: "none",
              borderRadius: "20px",
              padding: "8px 16px",
              cursor: "pointer",
            }}
            onClick={handleSendMessage}
          >
            Send
          </button>
          <button
            style={{
              backgroundColor: "transparent",
              border: "none",
              marginLeft: "8px",
              cursor: "pointer",
            }}
          >
            😀
          </button>
        </div>
      </div>
    </>
  );
}

export default ChatUI;
