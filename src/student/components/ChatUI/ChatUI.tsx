import  { useRef, useState, useEffect } from "react";
import { Avatar } from "@mui/material";
import "./ChatUI.scss";
import IChatUI from "../../../interface/IchatUI/IchatUI";
import axiosInstanceTutor from "../../../tutor/interceptor/axiosInstanceTutor";
import axiosInstanceStudent from "../../interceptor/axiosInstance.Student";
import { RootStateType } from "../../../redux/store";
import { useSelector } from "react-redux";

import InewMessage from "../../../interface/IMessage/InewMessage";

function ChatUI({ chatId, recipientName, recipientAvatarUrl, }: IChatUI) {
  const currentUser = useSelector((state: RootStateType) => state.user);
  const [messages, setMessages] = useState<InewMessage[]>([]);
  const [newMessage, setNewMessage] = useState("");
  const messagesEndRef = useRef(null);

  function handleOnchangemessage(value: string) {
    setNewMessage(value);
    
  }

  const handleSendMessage = async () => {

    if (newMessage.trim() === "") return;

    if (localStorage.getItem("jwt-learn")) {
      const response = await axiosInstanceStudent.post('/chat/sendmessage', {
        ChatId:chatId,
    Content:newMessage,
    SenderId:currentUser._id
   
      })
      
    
    } else if (localStorage.getItem("jwt-lead")) {
      const response =await axiosInstanceTutor.post('/chat/sendmessage', {
        ChatId:chatId,
    Content:newMessage,
    SenderId:currentUser._id
   
      })
      
      
      
    }
      

    const newMessages:InewMessage[] = [
      ...messages,
      { content: newMessage, sender: currentUser._id, status: "read" },
    ];
    setMessages(newMessages);
    setNewMessage("");
  };

  useEffect(() => {
    ( async function fetchAllMessage() {
      
      if (localStorage.getItem("jwt-lead")) {
        
        const response:{data}  = await axiosInstanceTutor.get('/chat/fetchAllMessage', {
          params: {
            ChatId: chatId 
          }
        })
        
        const Messages = response.data.data
  
      setMessages(Messages)
    } else if (localStorage.getItem("jwt-learn")) {
        const response:{data} = await axiosInstanceStudent.get('/chat/fetchAllMessage', {
          params: {
            ChatId: chatId 
          }
        });

      const  Messages =response.data.data
      setMessages(Messages)
        
       
    }
    })()
    messagesEndRef.current?.scrollIntoView({ behavior: "auto" });

  },[]);

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
      <div className="chatMessagesWrapper">
        <div className="chatMessages">
            {messages.map((message:InewMessage, index:number) => (
            
              <div
              key={index}
              style={{
                display: "flex",
                flexDirection: "column",
                alignItems: message.sender[0] === currentUser._id ? "flex-end" : "flex-start",
                marginBottom: "10px",
              }}
              >
                
               
              <div
                style={{
                  display: "flex",
                  maxWidth: "70%",
                  alignSelf: message.sender[0] === currentUser._id ? "flex-end" : "flex-start",
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
                    backgroundColor: message.sender[0] === currentUser._id ? "#DCF8C6" : "#F4F6F8",
                    padding: "10px",
                    borderRadius: message.sender[0] === currentUser._id ? "20px 0px 20px 20px" : "0px 20px 20px 20px", // Border radius for message containers
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
                    {/* <span style={{ fontSize: "12px", color: "#999" }}>10:30 AM</span> */}
                  </div>
                </div>
              </div>
            </div>
          ))}
          <div ref={messagesEndRef} />
        </div>
      </div>
      <div className="chatInputWrapper" style={{ display: "flex", alignItems: "center" }}>
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
