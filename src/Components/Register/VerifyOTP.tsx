
import { Grid, Paper, Button, Typography } from '@mui/material'
import { Formik, Form, FormikHelpers } from 'formik'
import * as Yup from 'yup'
import React, { useState } from 'react';
import OtpInput from 'react-otp-input';
import './Register.scss'

const VerifyOTP = () => {
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
    backgroundColor: '#8080D7',
      marginTop:20
  }









  const [otp, setOtp] = useState('');
  console.log(otp)

  return (
    <Grid>

      <Paper elevation={0} style={paperStyle}>






        <Grid >
          <Typography variant='caption'>Please confirm your identity with the emailed OTP.</Typography>
        </Grid>
        <Grid>

            <OtpInput 
              value={otp}
              onChange={setOtp}
              numInputs={6}
              inputType='text'
              renderSeparator={' '}
              renderInput={(props) => <input id='hide-input-arrows' {...props} style={{ width: '35px', // Adjust the width of each input field
              height: '40px', // Adjust the height of each input field
              fontSize: '18px', // Adjust the font size of the input text
              fontWeight: 'bold', // Add bold font weight to the input text
              border: '2px light #ccc', // Add a border around each input field
              borderRadius: '5px', // Add some border radius to create rounded corners
              textAlign: 'center', // Center the input text horizontally
              margin: '5px', // Add some space between each input field
              color: '#fff', // Adjust the color of the input text
              backgroundColor: '#000235', // Set the background color of the input field
                outline: 'none',
                
                  }} />}
            containerStyle={{
              
              border: 'none',
              color: "#fff",
              backgroundColor: "#090B42"
            }}
          />

<Button type='button'  style={btnStyle} variant='contained'
                                color='primary'>Verify</Button>
        </Grid>
      </Paper>
    </Grid>
  )
}

export default VerifyOTP;