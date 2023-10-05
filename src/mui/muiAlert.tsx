// import React from 'react'
// import Snackbar from '@mui/material/Snackbar'; // Import Material-UI Snackbar
// import MuiAlertComponent from '@mui/material/Alert'; // Import Material-UI Alert
// import { IMuiAlert } from '../interface/Imui/IMuiAlert';
// const Alert = React.forwardRef((props, divref: React.Ref<HTMLDivElement>) => {
//   return <MuiAlertComponent elevation={6} variant="filled" {...props} ref={divref} />;
// });

  

// function MuiAlert({snackbarOpen,handleCloseSnackbar,snackbarMessage,severity}:IMuiAlert) {
    
//   return (
//       <>
//            <Snackbar
        
//         autoHideDuration={4000} 
//         open={snackbarOpen}
//         onClose={handleCloseSnackbar}
//       >
//         <Alert  onClose={handleCloseSnackbar} severity={severity}>
//           {snackbarMessage}
//         </Alert>
//       </Snackbar>
//       </>
//   )
// }

// export default MuiAlert

import Snackbar from '@mui/material/Snackbar';
import MuiAlert from '@mui/material/Alert';
import { IMuiAlert } from '../interface/Imui/IMuiAlert';

function CustomAlert({ snackbarOpen, handleCloseSnackbar, snackbarMessage, severity }: IMuiAlert) {
  return (
    <Snackbar
      autoHideDuration={4000}
      open={snackbarOpen}
      onClose={handleCloseSnackbar}
    >
      <MuiAlert elevation={6} variant="filled" onClose={handleCloseSnackbar} severity={severity}>
        {snackbarMessage}
      </MuiAlert>
    </Snackbar>
  );
}

export default CustomAlert;
