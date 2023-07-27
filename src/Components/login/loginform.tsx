import { Grid, Paper, Button, Typography, Box } from '@mui/material'
import { TextField } from '@mui/material'
import { Formik, Form, Field, ErrorMessage, FormikHelpers } from 'formik'
import * as Yup from 'yup'
import GoogleIcon from '@mui/icons-material/Google';
import '../Register/Register.scss'
import { toast, ToastContainer } from 'react-toastify'
import axios from 'axios';
import 'react-toastify/dist/ReactToastify.css';
import { useDispatch } from 'react-redux'
import { UserDetails } from '../../redux/userSlice/UserSlice';
import { useNavigate } from "react-router-dom"
import { GoogleOAuthProvider } from '@react-oauth/google';
import { GoogleLogin } from '@react-oauth/google';
import jwt_decode from "jwt-decode";
import { handleLoginChangeState } from '../../redux/modalSlice/loginModalSlice';
import { handleForgetPasswordChangeState } from '../../redux/modalSlice/forgetpasswordSlice';



const LoginForm = () => {

  const navigate = useNavigate()


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
  
  async function DataSubmit(email: string, password: string,isGoogle:boolean) {
    
    
    let emailValid = false;
    let passwordValid = false;


    if(!isGoogle){
      
      
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
      
    email = email.toLowerCase();
    if (emailValid && passwordValid) {
      const response = await axios.post('http://localhost:4000/login', {
        email,
        password,
      });
      const { success, message, userData, token } = response.data


      console.log("token :", token)
      console.log("userdata from login", userData)
      if (!success) {
        toast.error(message)
      } else {
        console.log("before ")
        
        dispatch(
          UserDetails({
            role: userData.role,
            name: userData.name,
            email: userData.email,
            phone: userData.phone,
            dob: userData.dob,
          })
          )
          console.log("after ")


        if (userData.role == 'Learn') {

          localStorage.setItem("jwt-learn", token)
          navigate('/learn')

        } else if (userData.role == 'Lead') {
          localStorage.setItem("jwt-lead", token)
        
            navigate('/lead')
           
          } else if (userData.role == 'Admin') {
            localStorage.setItem("jwt-admin", token)
            navigate('/admin')
            
          } else if (userData.role == 'SuperAdmin') {
            localStorage.setItem("jwt-S-admin", token)
            navigate('/Sadmin')

        }



      }

    } else {
      console.log('Invalid email or password');
    }

  }


  function forgetpassword() {
    dispatch(handleForgetPasswordChangeState())
    dispatch(handleLoginChangeState())
  }


  const clientId = import.meta.env.VITE_GOOGLE_CLIENT_ID
  return (
    <Grid>

      <Paper elevation={0} style={paperStyle}>
      <GoogleOAuthProvider clientId={clientId!}>

<GoogleLogin
  onSuccess={credentialResponse => {
    const { email, sub }: any = jwt_decode(credentialResponse.credential ?? `${clientId}`);
    DataSubmit( email, sub, true)
  }}
  onError={() => {
    toast.error("Authentication Failed")
  }}
/>

</GoogleOAuthProvider>

       


        <h3 className="divider line one-line" >OR</h3>


        <Box display="flex" justifyContent="center">
          <Typography variant='caption'>Discover new knowledge Log in</Typography>
        </Box>
        <Formik initialValues={initialValues} validationSchema={validationSchema} onSubmit={onSubmit}>
          {(props) => (
            <Form noValidate >


              <Field as={TextField} name='email' label='Email' fullWidth
                error={props.errors.email && props.touched.email}
                helperText={<ErrorMessage name='email' />} required InputLabelProps={{ style: { color: '#fff' } }} />



              <Field as={TextField} name='password' label='Password' type='password' fullWidth
                error={props.errors.password && props.touched.password}
                helperText={<ErrorMessage name='password' />} required InputLabelProps={{ style: { color: '#fff' } }} />


              <Button type='submit' onClick={() => DataSubmit(props.values.email, props.values.password,false)} style={btnStyle} variant='contained'
                color='primary'>Login</Button>
            </Form>
          )}
        </Formik>
        {/* <ForgetPassword/> */}
        <Button variant='text' onClick={()=>forgetpassword()}>Forget Password</Button>
        <ToastContainer />
      </Paper>
    </Grid>
  )
}

export default LoginForm;