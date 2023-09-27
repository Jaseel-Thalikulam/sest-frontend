import { useState } from 'react'
import MenuIcon from '@mui/icons-material/Menu';
import { Drawer, List, ListItemButton, ListItemIcon, ListItemText, IconButton } from '@mui/material'
const PAGES = ["Contact Us", "About Us"]
import Login from '../login/login'
import ErrorBoundary from '../errorBoundary/ErrorBoundary';
const DrawerComponent = () => {
    const [openDrawer, setOpenDrawer] = useState(false)
   
  return (
    <>
      <ErrorBoundary>

          <Drawer open={openDrawer}
          onClose={()=>setOpenDrawer(false)} PaperProps={{
            sx: { width: "60%" },
          }}>
              <List>
                    
                      {
                        PAGES.map((page,index) => 
                        (
                            <ListItemButton key={index}>
                            
                            <ListItemIcon>
                          <ListItemText>
                             {page}
                          </ListItemText>
                  </ListItemIcon>
                       
                  </ListItemButton>

)
)
}
          

          <ListItemButton >
    
            <Login/>
            
          
          </ListItemButton>
                  
        </List>
        


          </Drawer>
              <IconButton sx={{color:"white",marginLeft:"auto"}} onClick={()=>setOpenDrawer(!openDrawer)}>
                  <MenuIcon/>
              </IconButton>
</ErrorBoundary>
      </>
  )
}

export default DrawerComponent
