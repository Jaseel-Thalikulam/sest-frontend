import * as React from 'react';
import { styled } from '@mui/material/styles';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import { useSelector } from 'react-redux/es/hooks/useSelector';
import {useDispatch}from 'react-redux'
import {handleChangeState} from'../../../redux/modalSlice/RegisterFormModalSlice'
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
  autoOpen: boolean;
  }
export interface DialogTitleProps {
  id: string;
  children?: React.ReactNode;
  onClose: () => void;
}



export default function Modalreg({ children}: ModalProps) {
  const Status = useSelector((state: RootStateType) => state.registerformmodal)
  const isOpen:boolean =Status.State
  
  
 
  const dispatch = useDispatch();
  return (
<ErrorBoundary>
      
          
      <BootstrapDialog
        onClose={()=>dispatch(handleChangeState())}
        aria-labelledby="customized-dialog-title"
        open={isOpen}
        fullWidth
        maxWidth="md" // Increase the size of the modal
        sx={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        
        <DialogContent >
        {children}
        </DialogContent>
      
      </BootstrapDialog>
      </ErrorBoundary>    
  );
}
