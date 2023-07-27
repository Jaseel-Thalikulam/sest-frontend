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
import { UserDetails } from '../../redux/userSlice/UserSlice';
import { useNavigate } from "react-router-dom";
import { handleForgetPasswordChangeState } from '../../redux/modalSlice/forgetpasswordSlice'
import { handleOpenAndCloseNewPasswordVerifyOtp } from '../../redux/modalSlice/newpasswordModalSlice'



const ForgetPasswordForm = () => {

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

  const btnStyle2 = {
  
    marginBottom: '10px',
  };

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
      const response = await axios.post('http://localhost:4000/forgetpassword', {
        email,
       
      });
      const { success, message, userData } = response.data
      
      
      if (!success) {
        toast.error(message)
      } else {
        dispatch(
          UserDetails({
            role: userData.role,
            name: userData.name,
            email: userData.email,
            userId:userData._id
          })
          )
        dispatch(handleForgetPasswordChangeState())
        dispatch(handleOpenAndCloseNewPasswordVerifyOtp())
       
      }

    } else {
      console.log('Invalid email');
    }

  }

  return (
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

              <Button type='submit' onClick={() => DataSubmit(props.values.email)} style={btnStyle} variant='contained'
                color='primary'>Send</Button>
            </Form>
          )}
        </Formik>
        <ToastContainer />
      </Paper>
    </Grid>
  )
}

export default ForgetPasswordForm;