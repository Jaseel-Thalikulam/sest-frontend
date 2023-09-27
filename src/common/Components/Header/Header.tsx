import { useTheme } from "@mui/material";
import "./Header.scss";
import Login from "../login/login";
import { handleLoginChangeState } from "../../../redux/modalSlice/loginModalSlice";

import { useDispatch } from "react-redux";
import ErrorBoundary from "../errorBoundary/ErrorBoundary";
const Header = () => {
  const theme = useTheme();
  
  const dispatch = useDispatch();
  return (
    <>
      <ErrorBoundary>

      <div className=" top-0 bg-white   border-gray-300 flex justify-between items-center mr-20 ml-20 p-3">
        <div className="flex items-center">
          {/* Replace 'logo.svg' with your logo image */}
          <img src="logo.svg" alt="Logo" className="w-8 h-8" />
          {/* <span className="ml-2 text-xl font-bold">Your Brand</span> */}
        </div>
        <div className="space-x-4">
          <a href="#" className="text-c0c0c0 font-medium text-sm m-3">
            CONTACT US
          </a>
          <button
            className="text-c0c0c0 font-medium text-sm rounded-full "
            onClick={() => dispatch(handleLoginChangeState())}
          >
            LOGIN
          </button>

        </div>
      </div>
            </ErrorBoundary>
      <Login />
    </>
  );
};

export default Header;
