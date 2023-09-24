import LoginModal from '../Modal/loginModal';
import ForgetPassword from '../Forgetpassword/ForgetPassword';
import LoginForm from './loginform';
import { Box, Typography } from '@mui/material';
import illustrate from '../../../../public/illustrations/undraw_reading_time_re_phf7.svg';

const login = () => {
  return (
    <div>
      <LoginModal buttonname="Login" data="Login & Connect">
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
                marginTop: '1rem', // Add some spacing above the heading
              }}
            >
              Welcome Back!
            </Typography>
            <LoginForm />
          </div>
        </Box>
      </LoginModal>
      <ForgetPassword />
    </div>
  );
};

export default login;
