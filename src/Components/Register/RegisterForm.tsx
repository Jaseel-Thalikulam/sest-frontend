
import { Grid, Paper, Button, Typography } from '@mui/material'
import { TextField } from '@mui/material'
import { Formik, Form, Field, ErrorMessage, FormikHelpers } from 'formik'
import * as Yup from 'yup'
import GoogleIcon from '@mui/icons-material/Google';
import './Register.scss'
import { handleChangeState } from '../../redux/modalSlice/RegisterFormModalSlice'
import { handleOpenAndCloseVerifyOtp } from '../../redux/modalSlice/VerifyOtpModalSlice'
import { useSelector } from 'react-redux/es/hooks/useSelector';
import { useDispatch } from 'react-redux';
import { RootStateType } from '../../redux/store';
import axios from 'axios';
import dotenv from "dotenv";


const RegisterForm = () => {
  let dispatch = useDispatch()
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

  const btnStyle2 = {
    // other styles here
    marginBottom: '10px',
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
    alert(JSON.stringify(values, null, 2));
    resetForm();
  };


  async function DataSubmit(name: string, email: string, password: string) {


    console.log(name, email, password, role)
    
    if (name && email && password && role) {

    
      const respo = await axios.post('http://localhost:4000/register', {  name,
      email,
      password,
      role });
      console.log(respo)
      dispatch(handleChangeState())
      dispatch(handleOpenAndCloseVerifyOtp())
    }

  }


  return (
    <Grid>

      <Paper elevation={0} style={paperStyle}>
        <Button variant='contained' className='SecondaryButton' color='primary' style={{ ...btnStyle, ...btnStyle2 }} endIcon={<GoogleIcon />} onClick={() => alert('Clicked')}>Continue with Google</Button>


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


              <Button type='submit' onClick={() => DataSubmit(props.values.name, props.values.email, props.values.password)} style={btnStyle} variant='contained'
                color='primary'>Register</Button>
            </Form>
          )}
        </Formik>
      </Paper>
    </Grid>
  )
}

export default RegisterForm;