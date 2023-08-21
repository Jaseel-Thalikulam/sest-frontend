import * as React from "react";
import { styled } from "@mui/material/styles";
import Dialog from "@mui/material/Dialog";
import { DialogContent } from "@mui/material";

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
    width: "95%",
    overflow: "hidden",
  },
  "& .MuiDialogActions-root": {
    padding: theme.spacing(0),
    overflow: "hidden",
  },
}));
interface ModalProps {
  children: React.ReactNode;
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
  CloseModal,
}: ModalProps) {
  return (
    <div>
      <BootstrapDialog
        onClose={() => CloseModal()}
        aria-labelledby="customized-dialog-title"
        open={isOpen}
      >
        <DialogContent>
        <div style={{ height: '73vh', overflow: 'hidden' }}>
          {children}</div>
        </DialogContent>
      </BootstrapDialog>
    </div>
  );
}
