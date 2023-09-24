import * as React from 'react';
import { styled } from '@mui/material/styles';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import { useSelector } from 'react-redux/es/hooks/useSelector';
import { useDispatch } from 'react-redux';
import { Button } from '@mui/material';
import { handleOpenAndClose } from '../../../redux/modalSlice/modalSlice';
import { RootStateType } from '../../../redux/store';

const BootstrapDialog = styled(Dialog)(({ theme }) => ({
  '& .MuiBackdrop-root': {
    backgroundColor: 'transparent',
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
  uniqueId: string;
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

export default function Modal({ children, autoOpen }: ModalProps) {
  const Status = useSelector((state: RootStateType) => state.modal);
  let isOpen: boolean = Status.Open;
  if (autoOpen == true) isOpen = autoOpen;

  const dispatch = useDispatch();
  return (
    <div>
      <button  onClick={() => dispatch(handleOpenAndClose())} className='bg-violet-600 p-3 pl-5 pr-5 text-white  rounded-3xl text-xs text'>
GET STARTED
      </button>
      {/* <Button
        type="button"
        onClick={() => dispatch(handleOpenAndClose())}
        className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded-full"
        variant="contained"
      >
        Register now
      </Button> */}

      <BootstrapDialog
        onClose={() => dispatch(handleOpenAndClose())}
        aria-labelledby="customized-dialog-title"
        open={isOpen}
      >
        <DialogContent>{children}</DialogContent>
      </BootstrapDialog>
    </div>
  );
}
