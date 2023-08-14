import { Drawer, IconButton, Toolbar, TextField,AppBar } from '@mui/material'
import React, { useState } from 'react'
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import MessageIcon from '@mui/icons-material/Message';
import NotificationsIcon from '@mui/icons-material/Notifications';
import './NavBar.scss'
function NavBar({isSmallScreen}: { isSmallScreen: boolean }) {
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    const toggleMenu = () => {
        setIsMenuOpen(!isMenuOpen);
      };

  return (
      <>
            <div>
      {isSmallScreen && (
  <Drawer
    anchor="right"
    open={isMenuOpen}
    onClose={toggleMenu}
    ModalProps={{
      container: document.getElementById("drawer-container"),
      style: { position: "absolute" },
    }}
  >
          {/* Drawer content */}
          <div className='drawerContent'>
          <IconButton>
              <NotificationsIcon />
            </IconButton>
            <IconButton>
              <AccountCircleIcon />
            </IconButton>
          </div>
        
          
          </Drawer>
            )}
</div>

<div id="drawer-container">
  <AppBar position="sticky" sx={{ backgroundColor: '#fff', zIndex: theme => theme.zIndex.drawer + 1 }}>
    <Toolbar sx={{ justifyContent: 'space-between', minHeight: '64px' }}>
      {/* Icons on the right side */}
      {!isSmallScreen && (
        <>
          <div className="logo-container">
            <img src="path_to_logo_image" alt="Logo" className="logo" />
            <TextField variant="outlined" placeholder="Search" className="search-field" />
          </div>
          <div>
            <IconButton>
              <NotificationsIcon />
            </IconButton>
            <IconButton>
              <MessageIcon/>
            </IconButton>
          
          </div>
        </>
      )}
      {isSmallScreen && (
        <>
          <div className="logo-container">
            <img src="path_to_logo_image" alt="Logo" className="logo"/>
          </div>
          <label className="hamburger">
      <input type="checkbox" checked={isMenuOpen} onChange={toggleMenu} />
      <svg viewBox="0 0 32 32">
        <path className="line line-top-bottom" d="M27 10 13 10C10.8 10 9 8.2 9 6 9 3.5 10.8 2 13 2 15.2 2 17 3.8 17 6L17 26C17 28.2 18.8 30 21 30 23.2 30 25 28.2 25 26 25 23.8 23.2 22 21 22L7 22"></path>
        <path className="line" d="M7 16 27 16"></path>
      </svg>
    </label>
        </>
      )}
    </Toolbar>
  </AppBar>
</div>
      </>
  )
}

export default NavBar
