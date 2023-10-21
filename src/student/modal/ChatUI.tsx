import * as React from "react";
import { styled } from "@mui/material/styles";
import Dialog from "@mui/material/Dialog";
import { Avatar, DialogContent, Grow } from "@mui/material";
import ErrorBoundary from "../../common/Components/errorBoundary/ErrorBoundary";
import './ChatUI.scss'
const BootstrapDialog = styled(Dialog)(({ theme }) => ({
  "& .MuiBackdrop-root": {
    backgroundColor: "rgba(0, 0, 0, 0)", // Semi-transparent backdrop
  },
  "& .MuiPaper-root": {
    backgroundColor: "#fff", // Light gray background color
    borderRadius: 20,
    width: "100%", // Full width
    maxWidth: "35%",
    maxHeight: "80%", // Maximum width for the chat modal
    position: "fixed", // Positioning the modal
    top: "10%", // Adjust the top distance
    right: "3%", // Adjust the right distance
  },
  "& .MuiDialogContent-root":{
    padding: theme.spacing(2),
    width: "100%",
    overflow: "hidden",
  },
  "& .MuiDialogActions-root": {
    padding: theme.spacing(0),
    overflow: "hidden",
  },
}));
interface ModalProps {
  children: React.ReactNode;
  avatarUrl: string
  name:string
  isOpen: boolean;
  CloseModal: () => void;
}



export interface DialogTitleProps {
  id: string;
  children?: React.ReactNode;
  onClose: () => void;
}

export default function ChatUIModal({
  children,
  isOpen,
  avatarUrl,
  name,
  CloseModal,
}: ModalProps

)




{
  return (
    <ErrorBoundary>

      <BootstrapDialog
        onClose={() => CloseModal()}
        aria-labelledby="customized-dialog-title"
        open={isOpen}
        TransitionComponent={Grow} // Specify the transition component
        TransitionProps={{
          timeout: {
            enter: 500, 
            exit: 300, 
          },
          style: { transformOrigin: "bottom top" }, // Customize the transform origin
        }}
      >
      
        <DialogContent >
          <div style={{ height: '73vh', overflow: 'hidden' }}>
            
         
          <div style={{ display: "flex", alignItems: "center" }}>
            <Avatar
              alt="Recipient"
              src={avatarUrl}
              style={{ width: "32px", height: "32px", marginRight: "10px" }}
            />
            <div>
                <h3 style={{ margin: 0, fontSize: "1.2rem" }}>{name}</h3>
                
            </div>
            </div>
            

          <div className="messagewrapper" style={{ height: '70vh', overflowX: 'hidden', overflowY: 'scroll' }}>
   {children}
</div>

          
          </div>
        </DialogContent>
      </BootstrapDialog>
   
        </ErrorBoundary>
  );
}
