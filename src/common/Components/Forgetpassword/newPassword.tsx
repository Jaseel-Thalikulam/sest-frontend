
import NewPasswordVerifyOTP from './NewPassword&OTPVerify';
import NewPasswordOTPModal from '../Modal/newPasssword&verifyModal'; // Corrected naming

const NewPassword = () => {
  return (
    <div>
      <NewPasswordOTPModal data='Enter New Password & OTP'> 
        <NewPasswordVerifyOTP/>
      </NewPasswordOTPModal>
    </div>
  );
};

export default NewPassword;
