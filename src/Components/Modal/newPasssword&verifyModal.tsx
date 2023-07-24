import * as React from 'react';
import { styled } from '@mui/material/styles';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import { useSelector } from 'react-redux/es/hooks/useSelector';
import {useDispatch}from 'react-redux'
import {handleOpenAndCloseNewPasswordVerifyOtp} from'../../redux/modalSlice/newpasswordModalSlice'


  
const BootstrapDialog = styled(Dialog)(({ theme }) => ({
    '& .MuiBackdrop-root': {
      backgroundColor: 'transparent',
    },
    '& .MuiPaper-root': {
        backgroundColor: '#090B42', 
        fontFamily: 'outfit', // Change font to "outfit"
      color: '#fff',
      borderRadius: 10,
    },
    '& .MuiDialogContent-root': {
      padding: theme.spacing(2),
    },
    '& .MuiDialogActions-root': {
      padding: theme.spacing(1),
    },
    [theme.breakpoints.up('lg')]: {
      top: theme.spacing(-18),
      right: theme.spacing(4),
      bottom: theme.spacing(4),
      left: 'auto',
      margin: 'auto',
      maxWidth: 'none',
      width: '30%',
    },
  }));
  

interface ModalProps {
    children: React.ReactNode;
    data: string;
  
 
  }
export interface DialogTitleProps {
  id: string;
  children?: React.ReactNode;
  onClose: () => void;
}

function BootstrapDialogTitle(props: DialogTitleProps) {
  const { children, onClose, ...other } = props;

  return (
    <DialogTitle sx={{ m: 0, p: 2,textAlign: 'center'  }} {...other}>
      {children}
    </DialogTitle>
  );
}

export default function newPasswordOTPModal({ children, data}: ModalProps) {
  const Status = useSelector((state: any) => state.modalNewPasswordOtpVerify)
  let isOpen =Status.Open
  
  console.log(isOpen,"from new otp")
  
 
  const dispatch = useDispatch();
  return (
      <div>
    
      <BootstrapDialog
        onClose={()=>dispatch(handleOpenAndCloseNewPasswordVerifyOtp())}
        aria-labelledby="customized-dialog-title"
        open={isOpen}
      >
        <BootstrapDialogTitle id="customized-dialog-title" onClose={()=>dispatch(handleOpenAndCloseNewPasswordVerifyOtp())}>
          {data}
        </BootstrapDialogTitle>
        <DialogContent dividers>
        {children}
        </DialogContent>
      
      </BootstrapDialog>
    </div>
  );
}
