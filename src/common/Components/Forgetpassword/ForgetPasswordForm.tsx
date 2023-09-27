import { Grid, Paper, Button, Typography, Box } from '@mui/material'
import { TextField } from '@mui/material'
import { Formik, Form, Field, ErrorMessage, FormikHelpers } from 'formik'
import * as Yup from 'yup'
import '../Register/Register.scss'
import 'react-toastify/dist/ReactToastify.css';
import { toast, ToastContainer } from 'react-toastify'
import axios from 'axios';
import 'react-toastify/dist/ReactToastify.css';
import { useDispatch } from 'react-redux'
import { UserDetails } from '../../../redux/userSlice/UserSlice';
import { handleForgetPasswordChangeState } from '../../../redux/modalSlice/forgetpasswordSlice'
import { handleOpenAndCloseNewPasswordVerifyOtp } from '../../../redux/modalSlice/newpasswordModalSlice'
import ILoginResponse from '../../../interface/login/Ilogin'
import ErrorBoundary from '../errorBoundary/ErrorBoundary'
const BASE_URL:string = import.meta.env.VITE_BACKEND_BASE_URL as string


const ForgetPasswordForm = () => {


  const paperStyle = {
    padding: '0 15px 40px 15px',
    width: '90%',
    maxWidth: 450,
    backgroundColor: 'rgba(0, 0, 0, 0)'
  };
  const btnStyle = {
    width: '100%',
    maxWidth: 450,
    borderRadius: 20,
    backgroundColor: '#8080D7'
  }

  const passwordRegExp = /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/
  const initialValues = {

    email: '',
    password: '',
  }
  const validationSchema = Yup.object().shape({

    email: Yup.string().email("Enter valid email").required("Required"),
    password: Yup.string().min(8, "Minimum characters should be 8")
      .matches(passwordRegExp, "Password must have one upper, lower case, number, special symbol").required('Required'),
  })

  type FormValueType = {
    email: string;
    password: string;
  };
  const onSubmit = (values: FormValueType, formikHelpers: FormikHelpers<FormValueType>) => {
    const { resetForm } = formikHelpers;
    resetForm();
  };

  const dispatch = useDispatch()

  async function DataSubmit(email: string) {

    let emailValid = false;
      
      // Validate email
      const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
      if (emailRegex.test(email)) {
          emailValid = true;
    
      }
    
    
      
    email = email.toLowerCase();

    console.log(email)
    if (emailValid) {
      const response:{data:ILoginResponse} = await axios.post(`${BASE_URL}/forgetpassword`, {
        email,
       
      });
      const { success, message, userData } = response.data
      
      
      if (!success) {
        toast.error(message)
      } else {
        if (userData.URLs) {
          const URLs = userData.URLs
          dispatch(
            UserDetails({
            role: userData.role,
            name: userData.name,
            email: userData.email,
            _id: userData._id,
            URLs: {
              github: URLs.github,
              linkedin: URLs.linkedin,
              pinterest: URLs.pinterest,
            }
          })
          )
        } else {
          dispatch(
            UserDetails({
            role: userData.role,
            name: userData.name,
            email: userData.email,
            _id: userData._id,
            URLs: {
              github: '',
              linkedin: '',
              pinterest: '',
            }
          })
          )
          
        }
        dispatch(handleForgetPasswordChangeState())
        dispatch(handleOpenAndCloseNewPasswordVerifyOtp())
       
      }

    } else {
      console.log('Invalid email');
    }

  }

  return (
    <ErrorBoundary>

    <Grid>

      <Paper elevation={0} style={paperStyle}>

        <Box display="flex" justifyContent="center">
          <Typography variant='caption'>We will send an OTP for verification</Typography>
        </Box>
        <Formik initialValues={initialValues} validationSchema={validationSchema} onSubmit={onSubmit}>
          {(props) => (
            <Form noValidate >


              <Field as={TextField} name='email' label='Email' fullWidth
                error={props.errors.email && props.touched.email}
                helperText={<ErrorMessage name='email' />} required InputLabelProps={{ style: { color: '#fff' } }} />

              <Button type='submit' onClick={() => void DataSubmit(props.values.email)} style={btnStyle} variant='contained'
                color='primary'>Send</Button>
            </Form>
          )}
        </Formik>
        <ToastContainer />
      </Paper>
    </Grid>
          </ErrorBoundary>
  )
}

export default ForgetPasswordForm;