import { Grid, Paper, Button, Typography } from '@mui/material';
import { useSelector } from 'react-redux/es/hooks/useSelector';
import { useState, useEffect } from 'react';
import OtpInput from 'react-otp-input';
import './Register.scss';
import axios from 'axios';
import { RootStateType } from '../../../redux/store';
import { useNavigate } from 'react-router-dom';
import { handleOpenAndCloseVerifyOtp } from '../../../redux/modalSlice/VerifyOtpModalSlice'
import { useDispatch } from 'react-redux';
import ILoginResponse from '../../../interface/login/Ilogin';
import { toast, ToastContainer } from 'react-toastify'
const BASE_URL:string = import.meta.env.VITE_BACKEND_BASE_URL as string
const VerifyOTP = () => {
  const dispatch = useDispatch()
  const data = useSelector((state: RootStateType) => state.user);
  const userId = data._id;
  const email = data.email;
  const paperStyle = {
    padding: '0 15px 40px 15px',
    width: '90%',
    maxWidth: 450,
    backgroundColor: 'rgba(0, 0, 0, 0)',
  };
  const btnStyle = {
    width: '100%',
    maxWidth: 450,
    borderRadius: 20,
    backgroundColor: '#8080D7',
    marginTop: 20,
  };

  const [OTP, setOtp] = useState('');
  const [countdown, setCountdown] = useState(30);
console.log(OTP)
  const navigate = useNavigate();
  
  async function sendOTP():Promise<undefined | void> {
    const response: { data: ILoginResponse } = await axios.post(`${BASE_URL}/verifyotp`, {
      OTP, userId
    });
    
    const { success, message, token, userData } = response.data

   
    if (success) {
      dispatch(handleOpenAndCloseVerifyOtp())
      if (userData.role == 'Lead') {
              
        localStorage.setItem("jwt-lead", token)
        navigate('/lead')
      
      } else if (userData.role == 'Learn') {
    
    
        localStorage.setItem("jwt-learn", token)
        navigate('/learn')
      }

    } else {
      toast.error(message)
    }
   }

  useEffect(() => {
     let interval: string | number | NodeJS.Timeout | undefined
   
    if (countdown > 0) {
      interval = setInterval(() => {
        setCountdown((prev) => prev - 1);
      }, 1000);
    } else {
      clearInterval(interval);
    }
    return () => clearInterval(interval);
  }, [countdown]);

  async function resendOTP (){
    
    setCountdown(30); 
   await axios.post(`${BASE_URL}/resendotp`, {
    userId,email  
    });

  }

  return (
    <Grid>
      <Paper elevation={0} style={paperStyle}>
        <Grid>
          <Typography variant='caption'>Please confirm your identity with the emailed OTP.</Typography>
        </Grid>
        <Grid>
          <OtpInput
            value={OTP}
            onChange={setOtp}
            numInputs={6}
            inputType='text'
            renderSeparator={''}
            renderInput={(props) => (
              <input
                id='hide-input-arrows'
                {...props}
                style={{
                  width: '35px',
                  height: '40px',
                  fontSize: '18px',
                  fontWeight: 'bold',
                  border: '2px light #ccc',
                  borderRadius: '5px',
                  textAlign: 'center',
                  margin: '5px',
                  color: '#fff',
                  backgroundColor: '#000235',
                  outline: 'none',
                }}
              />
            )}
            containerStyle={{
              border: 'none',
              color: '#fff',
              backgroundColor: '#090B42',
            }}
          />
          <Button
            type='button'
            style={btnStyle}
            variant='contained'
            color='primary'
            onClick={void sendOTP}
          >
            Verify
          </Button>
          {countdown > 0 && (
            <Typography variant='caption' style={{ marginTop: '10px' }}>
              Resend OTP in {countdown} sec
            </Typography>
          )}
          {countdown === 0 && (
            <Button
              type='button'
              style={btnStyle}
              variant='contained'
              color='primary'
              onClick={void resendOTP}
            >
              Resend OTP
            </Button>
          )}
        </Grid>
      <ToastContainer />
      </Paper>
    </Grid>
  );
};

export default VerifyOTP;

