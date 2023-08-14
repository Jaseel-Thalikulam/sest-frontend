
import ModalAddUserdetils from '../../Components/Modal/addUserDetailsModal/addUserDetailsModal'
import AddUserDetailsForm from '../../Components/form/AddUserDetailsForm' 

function AddUserDetails() {
   const autoOpen =false
  return (
      
      <ModalAddUserdetils data={"Edit Your Profile"}  autoOpen={autoOpen}>
          <AddUserDetailsForm/>
      </ModalAddUserdetils>
  )
}

export default AddUserDetails
