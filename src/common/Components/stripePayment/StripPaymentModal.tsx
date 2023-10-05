import * as React from 'react';
import { styled } from '@mui/material/styles';
import Dialog from '@mui/material/Dialog';
import DialogContent from '@mui/material/DialogContent';
import ErrorBoundary from '../errorBoundary/ErrorBoundary';



  
const BootstrapDialog = styled(Dialog)(({ theme }) => ({
  '& .MuiBackdrop-root': {
    backgroundColor: 'transparent',
  },
  '& .MuiPaper-root': {
    backgroundColor: '#fff',
    fontFamily: 'outfit', // Change font to "outfit"
    color: '#7D7D7D',
    borderRadius: 10,
    width: '50%', // Adjust the width to 80% to cover about 80% of the screen
    maxWidth: 'none', // Remove the maximum width restriction
  },
  '& .MuiDialogContent-root': {
    padding: theme.spacing(2),
    width: '100%',
  },
  '& .MuiDialogActions-root': {
    padding: theme.spacing(1),
  },
  [theme.breakpoints.up('lg')]: {
    top: '-40px',
    right: theme.spacing(0),
    bottom: theme.spacing(0),
    left: 'auto',
    margin: 'auto',
    maxWidth: 'none',
    width: '100%', 
  },
}));

  interface ModalProps {
    children: React.ReactNode;
    isOpen: boolean;
    CloseModal: (amount:number) => void;
  }
  


export interface DialogTitleProps {
  id: string;
  children?: React.ReactNode;
  onClose: () => void;
}



export default function StripPaymentModal({ children,isOpen,CloseModal}: ModalProps) {
 
  return (
  <ErrorBoundary>
      
      <BootstrapDialog
        onClose={()=>CloseModal(0)}
        aria-labelledby="customized-dialog-title"
        open={isOpen}
      >
       
        <DialogContent >
        {children}
        </DialogContent>
      
      </BootstrapDialog>
        </ErrorBoundary>

  );

}
