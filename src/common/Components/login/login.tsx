import LoginModal from '../Modal/loginModal';
// import ForgetPassword from '../Forgetpassword/ForgetPassword';
import LoginForm from './loginform';
import { Box, Typography } from '@mui/material';
import illustrate from '../../../../public/svg/undraw_reading_time_re_phf7 (1).svg';
import ErrorBoundary from '../errorBoundary/ErrorBoundary';

const login = () => {
  return (
    <>

      <LoginModal >
        <ErrorBoundary>
          <Box
          
          sx={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            flexDirection: 'row', // Make sure items are in a row
          }}
          >
          {/* Centered Illustration on the left */}
          <div className="hidden md:flex justify-center flex-1 pt-20">
            <img src={illustrate} alt="Illustration" className="max-w-full" />
          </div>
          {/* Login form on the right */}
          <div className="flex-1 pt-15" >
          <Typography
              variant="h4"
              align="center"
              gutterBottom
              sx={{
                fontWeight: 'bold',
                color: '#333', // Customize the color
                marginTop: '1rem',
                marginBottom:'1rem'// Add some spacing above the heading
              }}
              >
              Knowledge Quest
            </Typography>
            <LoginForm />
          </div>
        </Box>
              </ErrorBoundary>
      </LoginModal>
      {/* <ForgetPassword /> */}
              </>
    
  );
};

export default login;
