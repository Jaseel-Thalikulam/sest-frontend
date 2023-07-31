import React, { useState } from 'react';
import { Form } from 'react-bootstrap';
import './AddUserDetailsForm.scss';
import { Button } from '@mui/material';
import { RootStateType } from '../../../redux/store';
import { useSelector } from 'react-redux';
import axiosInstanceTutor from '../../interceptor/axiosInstanceTutor';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function AddUserDetailsForm() {
  const data = useSelector((state: RootStateType) => state.user);

  function toProperCase(str: string) {
    return str.replace(/\w\S*/g, (txt: string) => txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase());
  }

  const { name, email, phoneNumber, role, about, github, linkedin, pinterest, userId, DOB, } = data;

  const Email = toProperCase(email);
  const Name = toProperCase(name);
  const Role = toProperCase(role);


  const [Number, setPhone] = useState(phoneNumber ? phoneNumber : '');
  const [About, setAbout] = useState(about ? about : '');
  const [dob, setDOB] = useState(DOB ? DOB : '');
  const [githuburl, setgithub] = useState(github ? github : '');
  const [linkedinurl, setlinkedin] = useState(linkedin ? linkedin : '');
  const [pinteresturl, setpinterest] = useState(pinterest ? pinterest : '');

  async function handleSubmit() {
    // Validate DOB (minimum age 18 years)
    const currentDate = new Date();
    const userDOB = new Date(dob);
    const ageDifferenceInMilliseconds = currentDate.getTime() - userDOB.getTime();
    const minimumAgeInMilliseconds = 18 * 365 * 24 * 60 * 60 * 1000; // Minimum age of 18 years in milliseconds
    if (ageDifferenceInMilliseconds < minimumAgeInMilliseconds) {
      toast.error('You must be at least 18 years old.');
      return;
    }

    // Validate URLs
    const urlPattern = /^(ftp|http|https):\/\/[^ "]+$/;
    if (githuburl && !urlPattern.test(githuburl)) {
      toast.error('Invalid GitHub URL.');
      return;
    }
    if (linkedinurl && !urlPattern.test(linkedinurl)) {
      toast.error('Invalid LinkedIn URL.');
      return;
    }
    if (pinteresturl && !urlPattern.test(pinteresturl)) {
      toast.error('Invalid Pinterest URL.');
      return;
    }

    // Validate Phone Number
    const phonePattern = /^[0-9]{10}$/;
    if (!phonePattern.test(Number) && Number != '') {
      toast.error('Invalid phone number. Phone number should be 10 digits.');
      return;
    }





    try {
      const { data } = await axiosInstanceTutor.post('/editprofile', {
        Number,
        About,
        githuburl,
        linkedinurl,
        pinteresturl,
        DOB,
        userId,
      });

      const { message, success, userData } = data
      console.log(userData, "heloooo")

      if (success) {

        toast.success(message);
      } else {
        toast.error(message)
      }

    } catch (error) {
      console.log(error)
      toast.error('Error saving user details.');
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
                    placeholder="John Doe"
                    aria-label="John Doe"
                    aria-describedby="basic-icon-default-fullname2"
                    value={Name}
                    readOnly />
                </div>
              </div>
            </div>
            <div className="row mb-3">
              <Form.Label className="col-sm-2 col-form-label" htmlFor="basic-icon-default-company">
                Role
              </Form.Label>
              <div className="col-sm-10">
                <div className="input-group input-group-merge">
                  <span id="basic-icon-default-company2" className="input-group-text">
                    <i className="bx bx-buildings"></i>
                  </span>
                  <Form.Control
                    type="text"
                    id="basic-icon-default-company"
                    placeholder="ACME Inc."
                    aria-label="ACME Inc."
                    aria-describedby="basic-icon-default-company2"
                    value={Role} readOnly
                  />
                </div>
              </div>
            </div>
            <div className="row mb-3">
              <Form.Label className="col-sm-2 col-form-label" htmlFor="basic-icon-default-email">
                Email
              </Form.Label>
              <div className="col-sm-10">
                <div className="input-group input-group-merge">
                  <span className="input-group-text">
                    <i className="bx bx-envelope"></i>
                  </span>
                  <Form.Control
                    type="text"
                    id="basic-icon-default-email"
                    placeholder="john.doe"
                    aria-label="Your Email Here"
                    value={Email}
                    aria-describedby="basic-icon-default-email2"
                    readOnly
                  />
                </div>

              </div>
            </div>
            <div className="row mb-3">
              <Form.Label className="col-sm-2 form-label" htmlFor="basic-icon-default-phone">
                Phone No
              </Form.Label>
              <div className="col-sm-10">
                <div className="input-group input-group-merge">
                  <span id="basic-icon-default-phone2" className="input-group-text">
                    <i className="bx bx-phone"></i>
                  </span>

                  <Form.Control
                    type="number"
                    id="basic-icon-default-phone"
                    className="form-control phone-mask"
                    placeholder="Your contact Number Here"
                    aria-label="Your contact Number Here"
                    aria-describedby="basic-icon-default-phone2"
                    maxLength={10}
                    value={Number} onChange={(e) => setPhone(e.target.value)}
                  />



                </div>
              </div>
            </div>
            <div className="row mb-3">
              <Form.Label className="col-sm-2 form-label" htmlFor="basic-icon-default-message">
                About
              </Form.Label>
              <div className="col-sm-10">
                <div className="input-group input-group-merge">
                  <span id="basic-icon-default-message2" className="input-group-text">
                    <i className="bx bx-comment"></i>
                  </span>
                  <Form.Control
                    as="textarea"
                    id="basic-icon-default-message"
                    placeholder="Fill Up Your About"
                    aria-label="Fill Up Your About"
                    aria-describedby="basic-icon-default-message2"
                    value={About} onChange={(e) => setAbout(e.target.value)}
                  />
                </div>
              </div>
            </div>


            <div className="row mb-3">
              <Form.Label className="col-sm-2 form-label" htmlFor="basic-icon-default-message">
                D.O.B
              </Form.Label>
              <div className="col-sm-10">
                <div className="input-group input-group-merge">
                  <span id="basic-icon-default-message2" className="input-group-text">
                    <i className="bx bx-comment"></i>
                  </span>
                  <Form.Control
                    type="date"
                    className="form-control"
                    placeholder="Your Pinterest URL"
                    id="basic-url1"
                    aria-describedby="basic-addon14"
                    value={dob} onChange={(e) => setDOB(e.target.value)}

                  />
                </div>
              </div>
            </div>

            <div className="row mb-3">
              <Form.Label className="col-sm-2 form-label" htmlFor="basic-icon-default-message">
                GitHub
              </Form.Label>
              <div className="col-sm-10">
                <div className="input-group input-group-merge">
                  <span id="basic-icon-default-message2" className="input-group-text">
                    <i className="bx bx-comment"></i>
                  </span>
                  <Form.Control
                    type="text"
                    className="form-control"
                    placeholder="Your GitHub URL"
                    id="basic-url1"
                    aria-describedby="basic-addon14"
                    value={githuburl} onChange={(e) => setgithub(e.target.value)}
                  />
                </div>
              </div>
            </div>
            <div className="row mb-3">
              <Form.Label className="col-sm-2 form-label" htmlFor="basic-icon-default-message">
                Linkedin
              </Form.Label>
              <div className="col-sm-10">
                <div className="input-group input-group-merge">
                  <span id="basic-icon-default-message2" className="input-group-text">
                    <i className="bx bx-comment"></i>
                  </span>
                  <Form.Control
                    type="text"
                    className="form-control"
                    placeholder="Your LinkedIn URL"
                    id="basic-url1"
                    aria-describedby="basic-addon14"
                    value={linkedinurl} onChange={(e) => setlinkedin(e.target.value)}

                  />
                </div>
              </div>
            </div>
            <div className="row mb-3">
              <Form.Label className="col-sm-2 form-label" htmlFor="basic-icon-default-message">
                Pinterest
              </Form.Label>
              <div className="col-sm-10">
                <div className="input-group input-group-merge">
                  <span id="basic-icon-default-message2" className="input-group-text">
                    <i className="bx bx-comment"></i>
                  </span>
                  <Form.Control
                    type="text"
                    className="form-control"
                    placeholder="Your Pinterest URL"
                    id="basic-url1"
                    aria-describedby="basic-addon14"
                    value={pinteresturl} onChange={(e) => setpinterest(e.target.value)}

                  />
                </div>
              </div>
            </div>


            <div className="row justify-content-end">
              <div className="col-sm-10">
                <Button type="button" onClick={handleSubmit} variant="text">
                  Save
                </Button>
              </div>
            </div>
          </Form>
        </div>
      </div>
      <ToastContainer position="top-right" autoClose={5000} hideProgressBar={false} newestOnTop={false} closeOnClick rtl={false} pauseOnFocusLoss draggable pauseOnHover />
    </div>
  );
}

export default AddUserDetailsForm;
