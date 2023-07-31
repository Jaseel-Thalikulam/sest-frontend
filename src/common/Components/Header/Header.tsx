import React from 'react'
import { Tab,Tabs,Toolbar,useMediaQuery,useTheme } from '@mui/material'
import './Header.scss'
import AppBar from '@mui/material/AppBar';
import LOGO from '../../../../public/Logo/White logo - no background.svg'
import DrawerComponent from './DrawerComponent';
import Login from '../login/login'
const  PAGES =["Contact Us","About Us"]
const Header = () => {
  const theme = useTheme()
  const isMatch = useMediaQuery(theme.breakpoints.down("sm"))
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
                  <Tabs sx={{marginLeft:"auto"}}textColor ="inherit" value={0} >
                    {
                      PAGES.map((page,index) => 
                        (

                        <Tab label={page} key={index} sx={{marginLeft:"auto"}} />

                        )
                      )
                    }


</Tabs>

                  <Login/>
               
                </>
            )
          }
  
        </Toolbar>
    </AppBar>
    </>
  )
}

export default Header
