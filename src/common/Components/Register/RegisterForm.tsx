
import { Grid, Paper, Typography } from '@mui/material'
import { Formik, Form, FormikHelpers } from 'formik'
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
import ErrorBoundary from '../errorBoundary/ErrorBoundary'
import { useEffect, useRef } from 'react'
const BASE_URL:string = import.meta.env.VITE_BACKEND_BASE_URL as string

const RegisterForm = () => {
  const nameInputRef = useRef<HTMLInputElement | null>(null);
  const emailInputRef = useRef<HTMLInputElement | null>(null);
  const passwordInputRef = useRef<HTMLInputElement | null>(null);

  const dispatch = useDispatch()
  const data = useSelector((state: RootStateType) => state.user)
  const role = data.role
  const paperStyle = {
    padding: '0 15px 40px 15px',
    width: '90%',
    maxWidth: 450,
    backgroundColor: 'rgba(0, 0, 0, 0)'
  };


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
    console.log(values)
    resetForm();
  };
  
  
  const navigate = useNavigate()

  useEffect(() => {
 
  },[])

  async function DataSubmit(name: string, email: string, password: string, isGoogle: boolean): Promise<void> {
    
    if (nameInputRef.current && emailInputRef.current && passwordInputRef.current ) {
      passwordInputRef.current.focus();
      emailInputRef.current.focus();
      nameInputRef.current.focus();
    }

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
      
      if (!success) {
        toast.error(message)
      } else {
        dispatch(handleChangeState())
        if (!isGoogle) {
          dispatch(
            UserDetails({
             
              role: userData.role,
              name: userData.name,
              email: userData.email,
              username:userData.username,
              phoneNumber: userData.phoneNumber !== undefined ? userData.phoneNumber : null,
              _id: userData._id,
              about: userData.about!== undefined ? userData.about : null,
              isBanned:userData.isBanned,
              URLs:{
                github:'',
                linkedin: '',
                pinterest:'',
              },
              tags: userData.tags!== undefined ? userData.tags : null,
              avatarUrl: userData.avatarUrl !== undefined ? userData.avatarUrl : '',
              createdAt:userData.createdAt !== undefined ? userData.createdAt : ''
            })
            )
          dispatch(handleOpenAndCloseVerifyOtp())
        } else {

          dispatch(
            UserDetails({
              role: userData.role,
              name: userData.name,
              email: userData.email,
              username:userData.username,
              phoneNumber: userData.phoneNumber !== undefined ? userData.phoneNumber : null,
           
              _id: userData._id,
              about: userData.about!== undefined ? userData.about : null,
              isBanned:userData.isBanned,
              URLs:{
                github:'',
                linkedin: '',
                pinterest:'',
              },
              tags: userData.tags!== undefined ? userData.tags : null,
              avatarUrl: userData.avatarUrl !== undefined ? userData.avatarUrl : '',
              createdAt :userData.createdAt !== undefined ? userData.createdAt : ''
            })
            
            )

            if (role == 'Lead') {
              
              localStorage.setItem("jwt-lead", token)
              navigate('/lead')
              
            } else if (role == 'Learn') {
            
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
    <ErrorBoundary>

        
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
                

                <div className="mb-4 input-group">
                  
                <input
                ref={nameInputRef}
                  type="text"
                  id="name"
                  name="name"
                  className="input-field"
                  placeholder=" "
                  value={props.values.name}
                  onChange={props.handleChange}
                  onBlur={props.handleBlur}
                />
                <label htmlFor="name" className="input-label">
                  Name
                </label>
                <div className="text-red-600 text-sm mt-1 h-2">
                    {props.errors.name && props.touched.name && (
                      <>
                    {props.errors.name}
                      </>
                    )}
                    </div>
                </div>


                <div className="mb-4 input-group">
                  
                <input
                ref={emailInputRef}
                
                  type="email"
                  id="email"
                  name="email"
                  className="input-field"
                  placeholder=" "
                  value={props.values.email}
                  onChange={props.handleChange}
                  onBlur={props.handleBlur}
                />
                <label htmlFor="email" className="input-label">
                  Email
                </label>
                <div className="text-red-600 text-sm mt-1 h-2">
                    {props.errors.email && props.touched.email && (
                      <>
                    {props.errors.email}
                      </>
                    )}
                    </div>
                </div>
                


                <div className="mb-4 input-group">
                  <input
                ref={passwordInputRef}
                    
  type="password"
  id="password"
  name="password"
  className="input-field"
  placeholder=" "
  value={props.values.password}
  onChange={props.handleChange}
  onBlur={props.handleBlur}

/>
                <label htmlFor="password" className="input-label">
                  Password
                </label>
                <div className="text-red-600 text-sm mt-1 h-2">
                    {props.errors.password && props.touched.password && (
                      <>
                    {props.errors.password}
                      </>
                    )}
                    </div>
              </div>
              <button
                
                id="loginButton"
                type="button"
                onClick={() =>void DataSubmit(props.values.name, props.values.email, props.values.password, false)}
                className="w-full md:max-w-md bg-8A3FFC text-white font-semibold py-2 px-4 rounded-full mt-5"
              >
                Register
              </button>
              {/* <Field as={TextField} name='name' label='Name' fullWidth
                error={props.errors.name && props.touched.name}
                helperText={<ErrorMessage name='name' />}
                required InputLabelProps={{ style: { color: '' } }} />


              <Field as={TextField} name='email' label='Email' fullWidth
                error={props.errors.email && props.touched.email}
                helperText={<ErrorMessage name='email' />} required InputLabelProps={{ style: { color: '' } }} />
              
              <Field as={TextField} name='password' label='Password' type='password' fullWidth
                error={props.errors.password && props.touched.password}
                helperText={<ErrorMessage name='password' />} required InputLabelProps={{ style: { color: '' } }} />


              <Button type='submit' onClick={() =>void DataSubmit(props.values.name, props.values.email, props.values.password, false)} style={btnStyle} variant='contained'
                className='bg-blue-600'>Register</Button> */}
              
             

            </Form>
          )}
        </Formik> 
        <ToastContainer />
      </Paper>
        </Grid>
    
        
                </ErrorBoundary>
  )
}

export default RegisterForm;