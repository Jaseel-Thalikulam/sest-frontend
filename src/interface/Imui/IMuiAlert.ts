import { AlertColor } from "@mui/material";

export interface IMuiAlert{
    snackbarMessage: string;
    handleCloseSnackbar: () => void;
    snackbarOpen: boolean;
    severity:AlertColor|undefined
}