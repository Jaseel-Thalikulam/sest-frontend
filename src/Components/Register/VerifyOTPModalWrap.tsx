import React from 'react'
import OTPModal from '../Modal/VerifyOTPModal'
import VerifyOTP from './VerifyOTP'



const VerifyOTPModalWrap = () => {
  return (
      <>
          <OTPModal data='Verify OTP' >
           <VerifyOTP/> 
          </OTPModal>
      </>
  )
}

export default VerifyOTPModalWrap
