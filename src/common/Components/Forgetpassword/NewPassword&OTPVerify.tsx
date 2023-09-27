import { Grid, Paper, Button, Typography } from '@mui/material';
import { useSelector } from 'react-redux/es/hooks/useSelector';
import { useState, useEffect } from 'react';
import { TextField } from '@mui/material'
import * as Yup from 'yup'
import OtpInput from 'react-otp-input';
import { Formik, Form, Field, ErrorMessage} from 'formik'
import axios from 'axios';
import { RootStateType } from '../../../redux/store';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import 'react-toastify/dist/ReactToastify.css';
import { toast,ToastContainer } from 'react-toastify';
import { handleOpenAndCloseNewPasswordVerifyOtp } from '../../../redux/modalSlice/newpasswordModalSlice';
import INewPasswordAndOTP from '../../../interface/INewPasswordAndOTP/INewPasswordAndOTP';
import ErrorBoundary from '../errorBoundary/ErrorBoundary';


const BASE_URL:string = import.meta.env.VITE_BACKEND_BASE_URL as string

const NewPasswordVerifyOTP = () => {

  const initialValues = {
    password: '',
  }
  const passwordRegExp = /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/
  const validationSchema = Yup.object().shape({


    otp: Yup.string().matches(/^\d{6}$/, 'OTP must be exactly 6 digits').required('Required'),
    password: Yup.string().min(8, "Minimum characters should be 8").matches(passwordRegExp, "Password must have one upper, lower case, number, special symbol").required('Required'),
  })

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

  const navigate = useNavigate();
  

  async function sendPasswordAndOTP(password: string){
    let passwordValid = false;
    let otpValid = false;
    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*])(?=.{8,})/;
    if (passwordRegex.test(password)) {
      passwordValid = true;
    }
    const otpRegex = /^\d{6}$/;
    if (otpRegex.test(OTP)) {
      console.log("otp validated");
      
      otpValid = true;
    }

    if (passwordValid && otpValid) {
      console.log("valid")
      const response:{data:INewPasswordAndOTP} = await axios.post(`${BASE_URL}/newPasswordverifyotp`, {
        OTP, email, password
      });

      const { success, message, token, userData } = response.data
      console.log(success, message, "from verifyotp");

      if (success) {
        dispatch(handleOpenAndCloseNewPasswordVerifyOtp())
        if (userData.role == 'Lead') {

          localStorage.setItem("jwt-lead", token)
          navigate('/lead')

        } else if (userData.role == 'Learn') {


          localStorage.setItem("jwt-learn", token)
          navigate('/learn')
        }

      }
    } else {
      if (otpValid == false) {
        
        
        toast.error("Enter a Valid OTP")
      }
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

  async function resendOTP() {

    await axios.post(`${BASE_URL}/resendotp`, {
      userId, email
    });
    setCountdown(30);

  }

  

  


  return (
    <ErrorBoundary>

    <Grid>
      <Paper elevation={0} style={paperStyle}>
        <Grid>
          <Typography variant='caption'>Please Enter New Password & Confirm your identity with the emailed OTP.</Typography>
        </Grid>

        <Formik initialValues={initialValues} validationSchema={validationSchema} onSubmit={() => {}} >
          {(props) => (
            <Form noValidate >

              <Field as={TextField} name='password' label='Password' type='password' fullWidth
                error={props.errors.password && props.touched.password}
                helperText={<ErrorMessage name='password' />} required InputLabelProps={{ style: { color: '#fff' } }} />

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
                onClick={() => void sendPasswordAndOTP(props.values.password)}
              >
                Verify
              </Button>

            </Form>
          )}
        </Formik>

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
 <ToastContainer />
      </Paper>
    </Grid>
            </ErrorBoundary>
  );
};

export default NewPasswordVerifyOTP;

