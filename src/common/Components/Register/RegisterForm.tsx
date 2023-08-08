
import { Grid, Paper, Button, Typography } from '@mui/material'
import { TextField } from '@mui/material'
import { Formik, Form, Field, ErrorMessage, FormikHelpers } from 'formik'
import * as Yup from 'yup'
import ILoginResponse from '../../../interface/login/Ilogin'
import './Register.scss'
import { handleChangeState } from '../../../redux/modalSlice/RegisterFormModalSlice'
import { handleOpenAndCloseVerifyOtp } from '../../../redux/modalSlice/VerifyOtpModalSlice'
import { useSelector } from 'react-redux/es/hooks/useSelector';
import { useDispatch } from 'react-redux';
import { RootStateType } from '../../../redux/store';
import axios from 'axios';
import { toast, ToastContainer } from 'react-toastify'
import { GoogleOAuthProvider } from '@react-oauth/google';
import { GoogleLogin } from '@react-oauth/google';
import jwt_decode from "jwt-decode"
import { UserDetails } from '../../../redux/userSlice/UserSlice';
import { useNavigate } from "react-router-dom"
import IGoogleRegister from '../../../interface/register/IGoogleRegister'
const BASE_URL:string = import.meta.env.VITE_BACKEND_BASE_URL as string

const RegisterForm = () => {

  const dispatch = useDispatch()
  const data = useSelector((state: RootStateType) => state.user)
  const role = data.role
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
    name: '',
    email: '',
    password: '',
  }
  const validationSchema = Yup.object().shape({
    name: Yup.string().min(3, "It's too short").required("Required"),
    email: Yup.string().email("Enter valid email").required("Required"),
    password: Yup.string().min(8, "Minimum characters should be 8")
    .matches(passwordRegExp, "Password must have one upper, lower case, number, special symbol").required('Required'),
  })
  
  type FormValueType = {
    name: string;
    email: string;
    password: string;
  };
  const onSubmit = (values: FormValueType, formikHelpers: FormikHelpers<FormValueType>) => {
    const { resetForm } = formikHelpers;
    resetForm();
  };
  
  
  const navigate = useNavigate()
  async function DataSubmit(name: string, email: string, password: string, isGoogle: boolean):Promise <void> {
    let emailValid = false;
    let passwordValid = false;
    if (!isGoogle) {
      // Validate email
      const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
      if (emailRegex.test(email)) {
        emailValid = true;
      }

      // Validate password
      const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*])(?=.{8,})/;
      if (passwordRegex.test(password)) {
        passwordValid = true;
      }
    } else {
      emailValid = true;
      passwordValid = true;
    }


    if (emailValid && passwordValid) {


      
      email = email.toLowerCase();
      
    
      let response:{data:ILoginResponse}
      
      if (!isGoogle) {
        response = await axios.post(`${BASE_URL}/register`, {
          name,
          email,
          password,
          role, 
          isVerified:false,
        });
      } else {
          response = await axios.post(`${BASE_URL}/register`, {
          name,
          email,
          password,
          role, 
          isVerified:true,
        });
      }
      const { success, message, userData, token } = response.data
      
      console.log(success, message)
      if (!success) {
        toast.error(message)
      } else {
        dispatch(handleChangeState())
        if (!isGoogle) {
          dispatch(
            UserDetails({
              role: role,
              name: name,
              email: email,
              _id: userData._id,
              DOB: null,
              phoneNumber: '',
              about: '',
              URLs: {
                github: '',
                linkedin: '',
                pinterest: '',
              }
            })
            )
          dispatch(handleOpenAndCloseVerifyOtp())
        } else {

          dispatch(
            UserDetails({
              role: role,
              name: name,
              email: email,
              DOB: null,
              _id: '',
              phoneNumber: '',
              about: '',
              URLs: {
                github: '',
                linkedin: '',
                pinterest: '',
              }
            })
            
            )

            if (role == 'Lead') {
              
              localStorage.setItem("jwt-lead", token)
              navigate('/lead')
              
            } else if (role == 'Learn') {
            console.log(role)
            
            localStorage.setItem("jwt-learn", token)
            navigate('/learn')
      

          }



        }
      }
    } else {
      console.log('Invalid email or password');
    }

  }


  const clientId :string= import.meta.env.VITE_GOOGLE_CLIENT_ID as string


  return (
    <Grid>

      <Paper elevation={0} style={paperStyle}>

        <GoogleOAuthProvider clientId={clientId}>

          <GoogleLogin
            onSuccess={credentialResponse => {
              const { name, email, sub }: IGoogleRegister = jwt_decode(credentialResponse.credential ?? `${clientId}`);
           void DataSubmit(name, email, sub, true)
            }}
            onError={() => {
             toast.error("Authentication Failed")
            }}
          />

        </GoogleOAuthProvider>

        <h3 className="divider line one-line" >OR</h3>


        <Grid >
          <Typography variant='caption'>We will send you an email for email verification</Typography>
        </Grid>
        <Formik initialValues={initialValues} validationSchema={validationSchema} onSubmit={onSubmit}>
          {(props) => (
            <Form noValidate >

              <Field as={TextField} name='name' label='Name' fullWidth
                error={props.errors.name && props.touched.name}
                helperText={<ErrorMessage name='name' />}
                required InputLabelProps={{ style: { color: '#fff' } }} />


              <Field as={TextField} name='email' label='Email' fullWidth
                error={props.errors.email && props.touched.email}
                helperText={<ErrorMessage name='email' />} required InputLabelProps={{ style: { color: '#fff' } }} />
              
              <Field as={TextField} name='password' label='Password' type='password' fullWidth
                error={props.errors.password && props.touched.password}
                helperText={<ErrorMessage name='password' />} required InputLabelProps={{ style: { color: '#fff' } }} />


              <Button type='submit' onClick={() =>void DataSubmit(props.values.name, props.values.email, props.values.password, false)} style={btnStyle} variant='contained'
                color='primary'>Register</Button>
              
             

            </Form>
          )}
        </Formik> 
        <ToastContainer />
      </Paper>
    </Grid>
  )
}

export default RegisterForm;