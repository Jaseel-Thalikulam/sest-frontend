import React from 'react';
import { styled } from '@mui/material/styles';
import Dialog from '@mui/material/Dialog';
import DialogContent from '@mui/material/DialogContent';
import { useDispatch, useSelector } from 'react-redux';
import { handleLoginChangeState } from '../../../redux/modalSlice/loginModalSlice';
import { RootStateType } from '../../../redux/store';
import ErrorBoundary from '../errorBoundary/ErrorBoundary';

const BootstrapDialog = styled(Dialog)(({ theme }) => ({
  '& .MuiBackdrop-root': {
    backgroundColor: 'transparent',
    backdropFilter: 'blur(5px)',
  },
  '& .MuiPaper-root': {
    backgroundColor: '#fff',
    fontFamily: 'outfit',
    color: '#000',
    borderRadius: 10,
  },
  '& .MuiDialogContent-root': {
    padding: theme.spacing(2),
  },
  '& .MuiDialogActions-root': {
    padding: theme.spacing(1),
  },
}));

interface ModalProps {
  children: React.ReactNode;

}

export default function   LoginModal({ children}: ModalProps) {
  const Status = useSelector((state: RootStateType) => state.loginformmodal);
  const isOpen: boolean = Status.State;
  const dispatch = useDispatch();

  return (
<ErrorBoundary>
      
      <BootstrapDialog
        onClose={() => dispatch(handleLoginChangeState())}
        aria-labelledby="customized-dialog-title"
        open={isOpen}
        fullWidth
        maxWidth="md" // Increase the size of the modal
        sx={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}
        PaperProps={{
          sx: {
            height: '80%', // Set initial height as a percentage
            '@media (max-width: 600px)': {
              height: '90%', // Adjust height for smaller screens
            },
            overflowY: 'auto',
            boxShadow: '1', // Enable scrolling if content overflows
          },
        }}
        >
        <DialogContent dividers>{children}</DialogContent>
      </BootstrapDialog>
    
        </ErrorBoundary>
  );
}
