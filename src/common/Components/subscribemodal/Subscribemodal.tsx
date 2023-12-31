import * as React from 'react';
import { styled } from '@mui/material/styles';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
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
    data: string;
    isOpen: boolean;
    CloseModal: (amount:number) => void;
  }
  


export interface DialogTitleProps {
  id: string;
  children?: React.ReactNode;
  onClose: () => void;
}

function BootstrapDialogTitle(props: DialogTitleProps) {
  const { children, ...other } = props;

  return (
    <DialogTitle sx={{ m: 0, p: 2,textAlign: 'center'  }} {...other}>
      {children}
    </DialogTitle>
  );
}

export default function Subscribemodal({ children, data,isOpen,CloseModal}: ModalProps) {
 
  return (

    <ErrorBoundary>

      <BootstrapDialog
        onClose={()=>CloseModal(0)}
        aria-labelledby="customized-dialog-title"
        open={isOpen}
      >
        <BootstrapDialogTitle id="customized-dialog-title" onClose={() => CloseModal(0)}>
          {data}
        </BootstrapDialogTitle>
        <DialogContent >
        {children}
        </DialogContent>
      
      </BootstrapDialog>
 
        </ErrorBoundary>
  );

}
