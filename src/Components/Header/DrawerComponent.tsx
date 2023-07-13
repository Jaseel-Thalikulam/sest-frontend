import React, { useState } from 'react'
import MenuIcon from '@mui/icons-material/Menu';
import { Drawer, List, ListItemButton, ListItemIcon, ListItemText, IconButton } from '@mui/material'
const  PAGES =["Contact Us","About Us","Login"]
const DrawerComponent = () => {
    const [openDrawer, setOpenDrawer] = useState(false)
   
  return (
      <>
          <Drawer open={openDrawer}
          onClose={()=>setOpenDrawer(false)} PaperProps={{
            sx: { width: "60%" },
          }}>
              <List>
                    
                      {
                          PAGES.map((page) => 
                        (
                            <ListItemButton>
                            
                            <ListItemIcon>
                          <ListItemText>
                             {page}
                          </ListItemText>
                  </ListItemIcon>
                       
                  </ListItemButton>

                        )
                      )
                    }
                  
              </List>
          </Drawer>
              <IconButton sx={{color:"white",marginLeft:"auto"}} onClick={()=>setOpenDrawer(!openDrawer)}>
                  <MenuIcon/>
              </IconButton>
      </>
  )
}

export default DrawerComponent
