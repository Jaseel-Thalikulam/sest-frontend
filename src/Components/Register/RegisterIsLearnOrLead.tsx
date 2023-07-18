import { Grid, Paper, Button } from '@mui/material'
import './Register.scss'
import { useDispatch } from 'react-redux'
import {handleOpenAndClose } from '../../redux/modalSlice/modalSlice'
import { UserDetails } from '../../redux/userSlice/UserSlice'
import { RootStateType } from '../../redux/store'
import { useSelector } from 'react-redux/es/hooks/useSelector'
import { handleChangeState } from '../../redux/modalSlice/RegisterFormModalSlice'
const RegisterIsLearnOrLead = () => {

        const data = useSelector((state: RootStateType) => state.user)
        const modaldata = useSelector((state: RootStateType) => state.modal)
        console.log("data is :", data)
        console.log("modaldata is :", modaldata)

        const dispatch = useDispatch()
  
        function RoleOfUser(role: string) {

            dispatch(handleOpenAndClose())

            dispatch(
                UserDetails({
                    role: role,
                })  
          )
 
          dispatch(handleChangeState())

        } 
    
return (
    
        <Grid>
          <Paper elevation={0} className='Paper' >
            <Button type='button' className='PrimaryButton' variant='contained' color='primary' onClick={() => RoleOfUser('Learn')}>Learn</Button>
            <Button type='button' className='PrimaryButton SecondaryButton' variant='contained' color='primary' onClick={() => RoleOfUser('Lead')}>Lead</Button>
          </Paper>
        </Grid>
        
       
    )

}

export default RegisterIsLearnOrLead;