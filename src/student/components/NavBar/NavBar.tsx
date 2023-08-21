import React, { useState } from "react";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import MessageIcon from "@mui/icons-material/Message";
import NotificationsIcon from "@mui/icons-material/Notifications";
import "./NavBar.scss";
import { IconButton, TextField } from "@mui/material";
import { Spin as Hamburger } from 'hamburger-react'
import { useNavigate } from "react-router-dom";


function NavBar() {
  const navigate = useNavigate()
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  
  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };
  
  function handleMessagesNavigate() {
    const currentPath = window.location.pathname;
    if (localStorage.getItem("jwt-learn")) {
  
      if (currentPath !== '/learn/message') {
        
        navigate('/learn/message');

      } else {
        console.log('Already on the desired path.');
      }
    } else if (localStorage.getItem("jwt-lead")) {
      if (currentPath !== '/lead/message') {
        
        navigate('/lead/message');

      } else {
        console.log('Already on the desired path.');
      }
    }
  }
  return (
    <>
      <div>
        <div
          className={`${
            isMenuOpen ? "block" : "hidden"
          } fixed top-0 right-0 h-screen bg-white z-50`}
        >
          {/* Drawer content */}
          <div className="p-4 space-y-4">
            <IconButton>
              <NotificationsIcon />
            </IconButton>
            <IconButton>
              <AccountCircleIcon />
            </IconButton>
          </div>
        </div>
      </div>

      <div id="drawer-container">
        <header className="sticky top-0 bg-white z-50">
          <div className="container mx-auto">
            <div className="flex items-center justify-between p-4">
              <div className="logo-container">
                <img
                  src="path_to_logo_image"
                  alt="Logo"
                  className="logo"
                />
              </div>  
              <div className="hidden md:flex space-x-4">
                <IconButton>
                  <NotificationsIcon />
                </IconButton>
                <IconButton onClick={()=>void handleMessagesNavigate()}>
                  <MessageIcon />
                </IconButton>
              </div>
              <label
                className="md:hidden cursor-pointer"
                htmlFor="menu-toggle"
              >
              <Hamburger/>
                
              </label>
              <input
                type="checkbox"
                id="menu-toggle"
                className="hidden"
                checked={isMenuOpen}
                onChange={toggleMenu}
              />
            </div>
          </div>
        </header>
      </div>
    </>
  );
}

export default NavBar;
