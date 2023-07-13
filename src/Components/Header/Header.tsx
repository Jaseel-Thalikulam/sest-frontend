import React from 'react'
import { Stack, Typography, Button,Tab,Tabs,Toolbar,useMediaQuery,useTheme } from '@mui/material'
import './Header.scss'
import AppBar from '@mui/material/AppBar';
import LOGO from '../../../public/Logo/White logo - no background.svg'
import DrawerComponent from './DrawerComponent';
const  PAGES =["Contact Us","About Us","Login"]
const Header = () => {
  const theme = useTheme()
  console.log(theme)
  const isMatch = useMediaQuery(theme.breakpoints.down("sm"))
  console.log(isMatch)
  return (
    <>
      <AppBar sx={{ backgroundColor: "#000235" }}>
      <Toolbar>
          <img className="logo" src={LOGO} alt="" />
          {
            isMatch ? (
              <>
                
                <DrawerComponent/>
            
                
              </>
            ) : (
                <>
                  <Tabs sx={{marginLeft:"auto"}}textColor ="inherit" value={null}>
                    {
                      PAGES.map((page) => 
                        (

                        <Tab label={page} />

                        )
                      )
                    }


</Tabs>
                </>
            )
          }
  
          
        </Toolbar>
    </AppBar>
    </>
  )
}

export default Header
