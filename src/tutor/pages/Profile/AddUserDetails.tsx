import React from 'react'
import ModalAddUserdetils from '../../components/modal/addUserDetailsModal'
import AddUserDetailsForm from '../../components/form/AddUserDetailsForm'
function AddUserDetails() {
   const autoOpen =false
  return (
      
      <ModalAddUserdetils data={"Edit Your Profile"}  autoOpen={autoOpen}>
          <AddUserDetailsForm/>
      </ModalAddUserdetils>
  )
}

export default AddUserDetails
