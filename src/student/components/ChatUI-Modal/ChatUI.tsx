import { useState } from "react";
import { Avatar, TextField } from "@mui/material";
import "./ChatUI.scss";
import CheckIcon from "@mui/icons-material/Check";
import IChatUI from "../../../interface/IchatUI/IchatUI";

function ChatUI({ recipientName, recipientAvatarUrl }:IChatUI) {
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState("");

    function handleOnchangemessage(value:string) {
        setNewMessage(value)
        console.log('Typing...')

    }
    
  const handleSendMessage = () => {
    if (newMessage.trim() === "") return;

    const newMessages = [
      ...messages,
      { text: newMessage, sender: "User", status: "read" },
    ];
    setMessages(newMessages);
    setNewMessage("");
  };

  return (
    <>
      <div className="chatHeader">
        <div style={{ display: "flex", alignItems: "center" }}>
          <Avatar
            alt="Recipient"
            src={recipientAvatarUrl}
            style={{ width: "32px", height: "32px", marginRight: "10px" }}
          />
          <div>
            <h3 style={{ margin: 0, fontSize: "1.2rem" }}>{recipientName}</h3>
            <p style={{ margin: 0, color: "gray" }}>Online</p>
          </div>
        </div>
      </div>
      <div className="chatMessagesWrapper">
        <div className="chatMessages">
          {messages.map((message, index) => (
            <div
              key={index}
              style={{
                display: "flex",
                flexDirection: "column",
                alignItems:
                  message.sender === "User" ? "flex-end" : "flex-start",
                marginBottom: "10px",
              }}
            >
              <div
                style={{
                  display: "flex",
                  maxWidth: "70%",
                  alignSelf:
                    message.sender === "User" ? "flex-end" : "flex-start",
                }}
              >
                {message.sender !== "User" && (
                  <Avatar
                    alt="Recipient"
                    src={recipientAvatarUrl}
                    style={{
                      width: "24px",
                      height: "24px",
                      marginRight: "10px",
                    }}
                  />
                )}

                <div
                  style={{
                    backgroundColor:
                      message.sender === "User" ? "#DCF8C6" : "#F4F6F8",
                    padding: "10px",
                    borderRadius:
                      message.sender === "User"
                        ? "20px 0px 20px 20px"
                        : "0px 20px 20px 20px", // Border radius for message containers
                  }}
                >
                  {message.text}
                  <div
                    style={{
                      display: "flex",
                      justifyContent: "flex-end",
                      alignItems: "center",
                      marginTop: "4px",
                    }}
                  >
                    {message.sender === "User" && (
                      <span
                        style={{
                          fontSize: "12px",
                          marginRight: "6px",
                          color: "#999",
                        }}
                      >
                        {message.status === "sent" && "Sent"}
                        {message.status === "delivered" && (
                          <CheckIcon
                            fontSize="inherit"
                            style={{ color: "orange" }}
                          />
                        )}
                        {message.status === "read" && (
                          <CheckIcon
                            fontSize="inherit"
                            style={{ color: "green" }}
                          />
                        )}
                      </span>
                    )}
                    <span style={{ fontSize: "12px", color: "#999" }}>
                      10:30 AM
                    </span>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
      <TextField
        label="Type your message"
        variant="outlined"
        fullWidth
        value={newMessage}
        onChange={(e) =>handleOnchangemessage(e.target.value) }
        onKeyDown={(e) => {
          if (e.key === "Enter") {
           void handleSendMessage();
          }
        }}
      />
    </>
  );
}

export default ChatUI;
