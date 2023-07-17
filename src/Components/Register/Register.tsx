import Modal from '../Modal/Modal'
import RegisterIsLearnOrLead from './RegisterIsLearnOrLead'
import RegisterFormModal from './RegisterFormModal'
import VerifyOTPModalWrap from './VerifyOTPModalWrap'
const Register = () => {
  const autoOpen = false;
  return (
      <>
          <Modal data="Do you prefer to Learn or Lead?" buttonname="Register" autoOpen={autoOpen} uniqueId='RegisterIsLearnOrLead'>
          <RegisterIsLearnOrLead/>
      </Modal>
      <RegisterFormModal />
      <VerifyOTPModalWrap/>
      </>
  )
}

export default Register
