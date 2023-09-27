import React from 'react'
import Snackbar from '@mui/material/Snackbar'; // Import Material-UI Snackbar
import MuiAlertComponent from '@mui/material/Alert'; // Import Material-UI Alert
import { IMuiAlert } from '../interface/Imui/IMuiAlert';
const Alert = React.forwardRef((props, ref) => {
    return <MuiAlertComponent elevation={6} variant="filled" {...props} ref={ref} />;
});
  

function MuiAlert({snackbarOpen,handleCloseSnackbar,snackbarMessage,severity}:IMuiAlert) {
    
  return (
      <>
           <Snackbar
        
        open={snackbarOpen}
        autoHideDuration={4000} 
        onClose={handleCloseSnackbar}
      >
        <Alert  onClose={handleCloseSnackbar} severity={severity}>
          {snackbarMessage}
        </Alert>
      </Snackbar>
      </>
  )
}

export default MuiAlert
