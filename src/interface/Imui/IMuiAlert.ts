export interface IMuiAlert{
    snackbarMessage: string;
    handleCloseSnackbar: () => void;
    snackbarOpen: boolean;
    severity:string
}