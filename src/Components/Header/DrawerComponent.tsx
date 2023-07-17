import { useState } from 'react'
import MenuIcon from '@mui/icons-material/Menu';
import { Drawer, List, ListItemButton, ListItemIcon, ListItemText, IconButton } from '@mui/material'
import Register from '../Register/Register';
const  PAGES =["Contact Us","About Us"]
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
    
            <Register/>
          
          </ListItemButton>
                  
        </List>
        


          </Drawer>
              <IconButton sx={{color:"white",marginLeft:"auto"}} onClick={()=>setOpenDrawer(!openDrawer)}>
                  <MenuIcon/>
              </IconButton>
      </>
  )
}

export default DrawerComponent
