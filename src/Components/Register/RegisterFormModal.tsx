
import Modalreg from '../Modal/Modalreg'
import RegisterForm from './RegisterForm'
import { useSelector } from 'react-redux'
import { RootStateType } from '../../redux/store'


const RegisterFormModal = () => {

  const data = useSelector((state: RootStateType) => state.registerformmodal)
  
  return (
   
        <Modalreg data="Register & Connect" autoOpen={data.State}>
          <RegisterForm />
        </Modalreg>
     
  )
}

export default RegisterFormModal
