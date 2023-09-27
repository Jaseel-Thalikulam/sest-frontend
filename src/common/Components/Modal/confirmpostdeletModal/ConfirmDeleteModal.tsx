import * as React from 'react';
import { styled } from '@mui/material/styles';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import ErrorBoundary from '../../errorBoundary/ErrorBoundary';

const BootstrapDialog = styled(Dialog)(({ theme }) => ({
  '& .MuiBackdrop-root': {
    backgroundColor: 'transparent',
  },
  '& .MuiPaper-root': {
    backgroundColor: '#fff',
    fontFamily: 'outfit', // Change font to "outfit"
    color: '#7D7D7D',
    borderRadius: 10,
    width: '50%', // Adjust the width to your desired size (e.g., 50%)
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
    top: '50%', // Center vertically
    right: 'auto',
    bottom: 'auto',
    left: '50%', // Center horizontally
    transform: 'translate(-50%, -50%)', // Center both horizontally and vertically
    maxWidth: 'none',
    width: '80%', // Adjust the width as needed
  },
}));

interface ModalProps {
  children: React.ReactNode;
  data: string;
  isOpen: boolean;
  CloseModal: () => void;
}

export interface DialogTitleProps {
  id: string;
  children?: React.ReactNode;
  onClose: () => void;
}

function BootstrapDialogTitle(props: DialogTitleProps) {
  const { children, ...other } = props;

  return (
    <DialogTitle sx={{ m: 0, p: 2, textAlign: 'center' }} {...other}>
      {children}
    </DialogTitle>
  );
}

export default function ConfirmDeleteModal({
  children,
  data,
  isOpen,
  CloseModal,
}: ModalProps) {
  return (
    <ErrorBoundary>

      <BootstrapDialog
        onClose={() => CloseModal()}
        aria-labelledby="customized-dialog-title"
        open={isOpen}
      >
        <BootstrapDialogTitle id="customized-dialog-title" onClose={() => CloseModal()}>
          {data}
        </BootstrapDialogTitle>
        
      {children}
      </BootstrapDialog>
        </ErrorBoundary>
  );
}
