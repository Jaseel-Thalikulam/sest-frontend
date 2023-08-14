import { Form } from 'react-bootstrap';
import { useState } from 'react';
import './AddCategoryForm.scss';
import { Button } from '@mui/material';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import axiosInstance from '../../../interceptor/axiosInstance';
import 'bootstrap/dist/css/bootstrap.min.css';
import IaddCategoryForm from '../../../../interface/IaddCategoryForm/IaddCategoryForm';



function AddCategoryForm() {

  const [Description, setDescription] = useState('');
  const [Name, setName] = useState('');
  async function handleSubmit() {
    const letterCount = Description.replace(/\s+/g, '').length;
    if (!Name || !Description) {
      toast.error('Please provide both  Name and  Description.');
      return;
    } else if (/\d/.test(Name)) {
      toast.error('Name should not contain numbers.');
      return;
    } else if (/\d/.test(Description)) {
      toast.error('Description should not contain numbers.');
      return;
    } else if (letterCount < 15) {
      toast.error('Description should have a minimum of 15 letters.');
      return;
    }


    try {
 
      const response: { data: IaddCategoryForm } = await axiosInstance.post(`/addCategory`, {
        Name, Description
      });

      const { success, message } = response.data

      if (success) {
        setName('');
        setDescription('');
        toast.success(message);

      } else {

        toast.error(message)

      }

    } catch (error) {
      console.log(error)
      toast.error('Error saving Category');
    }

  }

  return (
    <div className="col-12">
      <div className="card mb-4">
        <div className="card-body">
          <Form>
            <div className="row mb-3">
              <Form.Label className="col-sm-2 col-form-label" htmlFor="basic-icon-default-fullname">
                Name
              </Form.Label>
              <div className="col-sm-10">
                <div className="input-group input-group-merge">
                  <span id="basic-icon-default-fullname2" className="input-group-text">
                    <i className="bx bx-user"></i>
                  </span>
                  <Form.Control
                    type="text"
                    id="basic-icon-default-fullname"
                    placeholder="Name"
                    aria-label="Name"
                    aria-describedby="basic-icon-default-fullname2"

                    onChange={(e) => setName(e.target.value)} />
                </div>
              </div>
            </div>
            <div className="row mb-3">
              <Form.Label className="col-sm-2 form-label" htmlFor="basic-icon-default-message">
                Description
              </Form.Label>
              <div className="col-sm-10">
                <div className="input-group input-group-merge">
                  <span id="basic-icon-default-message2" className="input-group-text">
                    <i className="bx bx-comment"></i>
                  </span>
                  <Form.Control
                    as="textarea"
                    id="basic-icon-default-message"
                    placeholder="Description"
                    aria-label="Description"
                    aria-describedby="basic-icon-default-message2"
                    onChange={(e) => setDescription(e.target.value)}
                  />
                </div>
              </div>
            </div>


            <div className="row justify-content-end">
              <div className="col-sm-10">
                <Button type="button" onClick={() => void handleSubmit()} variant="text">
                  Save
                </Button>
              </div>
            </div>
          </Form>
        </div>
      </div>
      <ToastContainer position="top-right" autoClose={5000} hideProgressBar={false} newestOnTop={false} closeOnClick rtl={false} pauseOnFocusLoss draggable />
    </div>
  );
}

export default AddCategoryForm;
