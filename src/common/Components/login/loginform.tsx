import { Grid, Paper, Button, Typography, Box } from "@mui/material";
import { Formik, Form, FormikHelpers } from "formik";
import * as Yup from "yup";
import "../Register/Register.scss";
import { toast, ToastContainer } from "react-toastify";
import axios from "axios";
import "react-toastify/dist/ReactToastify.css";
import { useDispatch } from "react-redux";
import { UserDetails } from "../../../redux/userSlice/UserSlice";
import { useNavigate } from "react-router-dom";
import { GoogleOAuthProvider } from "@react-oauth/google";
import { GoogleLogin } from "@react-oauth/google";
import jwt_decode from "jwt-decode";
import { handleLoginChangeState } from "../../../redux/modalSlice/loginModalSlice";
import { handleForgetPasswordChangeState } from "../../../redux/modalSlice/forgetpasswordSlice";
import ILoginResponse from "../../../interface/login/Ilogin";
import IGoogleLogin from "../../../interface/login/IgoogleLogin";
import { useEffect, useRef } from "react";
import ErrorBoundary from "../errorBoundary/ErrorBoundary";
//.env
const CLIENT_ID: string = import.meta.env.VITE_GOOGLE_CLIENT_ID as string;
const BASE_URL: string = import.meta.env.VITE_BACKEND_BASE_URL as string;

const LoginForm = () => {
  const navigate = useNavigate();

  const emailInputRef = useRef<HTMLInputElement | null>(null);
  const paperStyle = {
    padding: "0 15px 40px 15px",
    width: "90%",
    maxWidth: 450,
    backgroundColor: "rgba(0, 0, 0, 0)",
  };
 
  const passwordRegExp =
    /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/;
  const initialValues = {
    email: "",
    password: "",
  };
  const validationSchema = Yup.object().shape({
    email: Yup.string().email("Enter valid email").required("Required"),
    password: Yup.string()
      .min(8, "Minimum characters should be 8")
      .matches(
        passwordRegExp,
        "Password must have one upper, lower case, number, special symbol"
      )
      .required("Required"),
  });

  type FormValueType = {
    email: string;
    password: string;
  };
  const onSubmit = (
    values: FormValueType,
    formikHelpers: FormikHelpers<FormValueType>
  ) => {
    console.log(values)
    const { resetForm } = formikHelpers;
    resetForm();
  };

  const dispatch = useDispatch();

  async function DataSubmit(
    email: string,
    password: string,
    isGoogle: boolean
  ) {
    try {
      let emailValid = false;
      let passwordValid = false;

      if (!isGoogle) {
        // Validate email
        const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
        if (emailRegex.test(email)) {
          emailValid = true;
        }

        // Validate password
        const passwordRegex =
          /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*])(?=.{8,})/;
        if (passwordRegex.test(password)) {
          passwordValid = true;
        }
      } else {
        emailValid = true;
        passwordValid = true;
      }

      email = email.toLowerCase();
      if (emailValid && passwordValid) {
        const response: { data: ILoginResponse } = await axios.post(
          `${BASE_URL}/login`,
          {
            email,
            password,
          }
        );

        const { success, message, userData, token } = response.data;


        if (!success) {
          toast.error(message);
        } else {
          const URLs = userData.URLs;
          if (URLs) {
            dispatch(
              UserDetails({
                role: userData.role,
                name: userData.name,
                email: userData.email,
                username: userData.username,
                phoneNumber:
                  userData.phoneNumber !== undefined
                    ? userData.phoneNumber
                    : null,
                _id: userData._id,
                about: userData.about !== undefined ? userData.about : null,
                isBanned: userData.isBanned,
                URLs: {
                  github:
                    URLs.github !== undefined ? userData.URLs!.github : null,
                  linkedin:
                    URLs.linkedin !== undefined ? userData.URLs!.linkedin : null,
                  pinterest:
                    URLs.pinterest !== undefined
                      ? userData.URLs!.pinterest
                      : null,
                },
                tags: userData.tags !== undefined ? userData.tags : null,
                avatarUrl:
                  userData.avatarUrl !== undefined ? userData.avatarUrl : '',
                  createdAt:userData.createdAt !== undefined ? userData.createdAt : '',
                
              })
            );
          } else {
            dispatch(
              UserDetails({
                role: userData.role,
                name: userData.name,
                email: userData.email,
                username: userData.username,
                phoneNumber:
                  userData.phoneNumber !== undefined
                    ? userData.phoneNumber
                    : null,
                _id: userData._id,
                about: userData.about !== undefined ? userData.about : null,
                isBanned: userData.isBanned,
                URLs: {
                  github: "",
                  linkedin: "",
                  pinterest: "",
                },
                tags: userData.tags !== undefined ? userData.tags : null,
                avatarUrl: userData.avatarUrl !== undefined ? userData.avatarUrl : '',
                createdAt:userData.createdAt !== undefined ? userData.createdAt : '',
              })
            );
          }

          if (userData.role == "Learn") {
            localStorage.setItem("jwt-learn", token);
            navigate("/learn");
          } else if (userData.role == "Lead") {
            localStorage.setItem("jwt-lead", token);

            navigate("/lead/");
          } else if (userData.role == "Admin") {
            localStorage.setItem("jwt-admin", token);
            navigate("/admin");
          } else if (userData.role == "SuperAdmin") {
            localStorage.setItem("jwt-S-admin", token);
            navigate("/Sadmin");
          }
        }
      } 
    } catch (error) {
      console.error("Error during DataSubmit:", error);
    }
  }
  function forgetpassword() {
    dispatch(handleForgetPasswordChangeState());
    dispatch(handleLoginChangeState());
  }
  useEffect(() => {
    if (emailInputRef.current) {
      emailInputRef.current.focus();
    }
    const handleKeyPress = (event: KeyboardEvent) => {
      

      if (event.key === "Enter") {
        const loginButton = document.getElementById("loginButton");
        if (loginButton) {
          loginButton.click();
        }
      }
    };

    window.addEventListener("keydown", handleKeyPress);

    return () => {
      window.removeEventListener("keydown", handleKeyPress);
    };
  }, []);
  return (
    <ErrorBoundary>

    <Grid>
      <Paper elevation={0} style={paperStyle}>
        <GoogleOAuthProvider clientId={CLIENT_ID}>
          <GoogleLogin
            
            onSuccess={(credentialResponse) => {
              const { email, sub }: IGoogleLogin = jwt_decode(
                credentialResponse.credential ?? `${CLIENT_ID}`
              );
              void DataSubmit(email, sub, true);
            }}
            onError={() => {
              toast.error("Authentication Failed");
            }}
          />
        </GoogleOAuthProvider>

        <Box className="flex items-center mt-4 mb-4">
  <hr className="flex-grow border-gray-300" />
  <span className="mx-4 text-gray-400">OR</span>
  <hr className="flex-grow border-gray-300" />
</Box>




        <Box display="flex" justifyContent="center">
          <Typography variant="caption">
            Discover new knowledge Log in
          </Typography>
        </Box>
        <Formik
          initialValues={initialValues}
          validationSchema={validationSchema}
          onSubmit={onSubmit}
        >
          {(props) => (
            <Form noValidate>
              <div className="mb-4 input-group">
                <input
                   ref={emailInputRef}
                  type="email"
                  id="email"
                  name="email"
                  className="input-field"
                  placeholder=" "
                  value={props.values.email}
                  onChange={props.handleChange}
                  onBlur={props.handleBlur}
                />
                <label htmlFor="email" className="input-label">
                  Email
                </label>
                <div className="text-red-600 text-sm mt-1 h-2">
                    {props.errors.email && props.touched.email && (
                      <>
                    {props.errors.email}
                      </>
                    )}
                    </div>
              </div>
              <div className="mb-4 input-group">
              <input
  type="password"
  id="password"
  name="password"
  className="input-field"
  placeholder=" "
  value={props.values.password}
  onChange={props.handleChange}
  onBlur={props.handleBlur}

/>
                <label htmlFor="password" className="input-label">
                  Password
                </label>
                <div className="text-red-600 text-sm mt-1 h-2">
                    {props.errors.password && props.touched.password && (
                      <>
                    {props.errors.password}
                      </>
                    )}
                    </div>
              </div>
              <button
                
                id="loginButton"
                type="button"
                onClick={() =>
                  void DataSubmit(
                    props.values.email,
                    props.values.password,
                    false
                  )
                }
                className="w-full md:max-w-md bg-8A3FFC text-white font-semibold py-2 px-4 rounded-full mt-5"
              >
                Login
              </button>
              
            </Form>
          )}
        </Formik>

        {/* <ForgetPassword/> */}
        <Button color="error" variant="text" onClick={() => void forgetpassword()}>
          Forget Password
        </Button>
        <ToastContainer />
      </Paper>
    </Grid>
                    </ErrorBoundary>
  );
};

export default LoginForm;
