import { Tab, Tabs, Toolbar, useMediaQuery, useTheme } from "@mui/material";
import "./Header.scss";
import AppBar from "@mui/material/AppBar";
import LOGO from "../../../../public/Logo/White logo - no background.svg";
import DrawerComponent from "./DrawerComponent";
import Login from "../login/login";
import { handleLoginChangeState } from "../../../redux/modalSlice/loginModalSlice";
const PAGES = ["Contact Us", "About Us"];
import { useDispatch } from "react-redux";
const Header = () => {
  const theme = useTheme();
  const isMatch = useMediaQuery(theme.breakpoints.down("sm"));
  const dispatch = useDispatch();
  return (
    <>
      <div className="sticky top-0 bg-white p-4 border-b border-gray-300 flex justify-between items-center">
        <div className="flex items-center">
          {/* Replace 'logo.svg' with your logo image */}
          <img src="logo.svg" alt="Logo" className="w-8 h-8" />
          {/* <span className="ml-2 text-xl font-bold">Your Brand</span> */}
        </div>
        <div className="space-x-4">
          <a href="#" className="text-gray-600 hover:text-gray-800">
            Contact Us
          </a>
          <button
            className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded-full"
            onClick={() => dispatch(handleLoginChangeState())}
          >
            Login
          </button>

        </div>
      </div>
      <Login />
    </>
  );
};

export default Header;
