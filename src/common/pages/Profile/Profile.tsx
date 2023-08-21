import * as React from "react";
import { RootStateType } from "../../../redux/store";
import "./scss/Profile.scss";
import AddIcon from "@mui/icons-material/Add";
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";
import { useDispatch, useSelector } from "react-redux";
import { Box, Button, Chip } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { TabContext, TabList, TabPanel } from "@mui/lab";
import Tab from "@mui/material/Tab";
import IconButton from "@mui/material/IconButton";
import { AddUserDetailsChangeState } from "../../../redux/modalSlice/AddUserDetailsSlice";
import AddUserDetails from "./AddUserDetails";
import { ChangeEvent } from "react";
import "react-toastify/dist/ReactToastify.css";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import { UserDetails } from "../../../redux/userSlice/UserSlice";
import APIResponse from "../../../interface/IaddUserDetails/IaddUserDetails";
import defaultAvatar from "../../../../public/defaultAvatar/defaultavatar.png";
const BASE_URL: string = import.meta.env.VITE_BACKEND_BASE_URL as string;

const ProfilePage: React.FC = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const data = useSelector((state: RootStateType) => state.user);

  const [value, setValue] = React.useState("1");

  const handleCopy = () => {
    try {
      void navigator.clipboard.writeText(username);

      toast.success("Copied to Clipboard");
    } catch (err) {
      toast.success("Something went wrong");
      console.log(err);
    }
  };

  const handleChange = (event: React.SyntheticEvent, newValue: string) => {
    setValue(newValue);
  };

  const HandleClickAddDetails = () => {
    dispatch(AddUserDetailsChangeState());
  };

  function toProperCase(str: string) {
    return str.replace(
      /\w\S*/g,
      (txt: string) => txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase()
    );
  }
  function formatDate(dateString: string | null): string {
    if (!dateString) return ""; // Handle the case when dateString is null or empty

    const date = new Date(dateString);
    if (isNaN(date.getTime())) {
      throw new Error("Invalid date format"); // Throw an error if the dateString is not a valid date
    }

    const options: Intl.DateTimeFormatOptions = {
      day: "numeric",
      month: "long",
      year: "numeric",
    };
    return date.toLocaleDateString("en-GB", options);
  }

  const {
    name,
    username,
    email,
    phoneNumber,
    role,
    about,
    DOB,
    URLs,
    tags,
    _id,
    avatarUrl,
  } = data;

  const Email = toProperCase(email);
  const Name = toProperCase(name);
  const DateOfBirth = formatDate(DOB);

  const handleGoBack = () => {
    navigate(-1);
  };

  function handleAvatarSubmit() {
    const avatarUpload = document.getElementById(
      "avatar-upload"
    ) as HTMLInputElement;
    avatarUpload.click();
  }

  async function handleAvatarChange(event: ChangeEvent<HTMLInputElement>) {
    const file = event.target.files?.[0];
    if (file) {
      const formData = new FormData();
      formData.append("image", file);
      formData.append("userId", _id);

      const response: { data: APIResponse } = await axios.post(
        `${BASE_URL}/upload/avatar`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data", // Important for sending files
          },
        }
      );

      const { success, message, userData } = response.data;

      if (success) {
        const URLs = userData.URLs;

        if (URLs) {
          dispatch(
            UserDetails({
              role: userData.role,
              name: userData.name,
              email: userData.email,
              username: userData.username,
              phoneNumber: userData.phoneNumber,
              DOB: userData.DOB,
              _id: userData._id,
              about: userData.about,
              isBanned: userData.isBanned,
              URLs: {
                github: URLs.github,
                linkedin: URLs.linkedin,
                pinterest: URLs.pinterest,
              },
              tags: userData.tags,
              avatarUrl: userData.avatarUrl,
            })
          );
        } else {
          dispatch(
            UserDetails({
              role: userData.role,
              name: userData.name,
              email: userData.email,
              username: userData.username,
              phoneNumber: userData.phoneNumber,
              DOB: userData.DOB,
              _id: userData._id,
              about: userData.about,
              isBanned: userData.isBanned,
              URLs: {
                github: "",
                linkedin: "",
                pinterest: "",
              },
              tags: userData.tags,
              avatarUrl: userData.avatarUrl,
            })
          );
        }
        toast.success(message);
      } else {
        toast.error(message);
      }
    }
  }

  return (
    <>
      <head>
        <link
          rel="stylesheet"
          href="https://fonts.googleapis.com/css?family=Roboto:300,400,500,700|Material+Icons"
        />
        <link
          rel="stylesheet"
          href="https://unpkg.com/bootstrap-material-design@4.1.1/dist/css/bootstrap-material-design.min.css"
          integrity="sha384-wXznGJNEXNG1NFsbm0ugrLFMQPWswR3lds2VeinahP8N0zJw9VWSopbjv2x7WCvX"
          crossOrigin="anonymous"
        />
        <link
          href="https://maxcdn.bootstrapcdn.com/font-awesome/latest/css/font-awesome.min.css"
          rel="stylesheet"
        />
        <link
          rel="stylesheet"
          type="text/css"
          href="https://fonts.googleapis.com/css?family=Roboto:300,400,500,700|Roboto+Slab:400,700|Material+Icons"
        />
        <link
          rel="stylesgeet"
          href="https://rawgit.com/creativetimofficial/material-kit/master/assets/css/material-kit.css"
        />
      </head>

      <body className="profile-page">
        {/* Navigation */}
        <nav
          className="navbar navbar-color-on-scroll navbar-transparent fixed-top navbar-expand-lg"
          color-on-scroll="100"
          id="sectionsNav"
        >
          <div className="container">
            <div className="navbar-translate">
              <Button
                variant="text"
                startIcon={<ArrowBackIosIcon />}
                disableRipple
                style={{ color: "white" }}
                onClick={handleGoBack}
              >
                Back
              </Button>

              <button
                className="navbar-toggler"
                type="button"
                data-toggle="collapse"
                aria-expanded="false"
                aria-label="Toggle navigation"
              >
                <span className="navbar-toggler-icon"></span>
                <span className="navbar-toggler-icon"></span>
                <span className="navbar-toggler-icon"></span>
              </button>
            </div>
          </div>
        </nav>

        {/* Header */}
        <div
          className="page-header header-filter"
          data-parallax="true"
          style={{
            backgroundImage:
              "url('http://wallpapere.org/wp-content/uploads/2012/02/black-and-white-city-night.png')",
          }}
        ></div>
        <div className="main main-raised">
          <div
            className="button-container"
            style={{ position: "absolute", top: "20px", right: "50px" }}
          >
            <IconButton color="primary" onClick={() => HandleClickAddDetails()}>
              <AddIcon />
            </IconButton>
          </div>

          <div className="profile-content">
            <div className="container">
              <div className="row">
                {/* Profile Info */}
                <div className="col-md-6 ml-auto mr-auto">
                  <div className="profile">
                    <div className="avatar">
                      {avatarUrl !== null ? (
                        <img
                          src={avatarUrl}
                          alt="Circle Image"
                          className="avatar_IMG"
                        />
                      ) : (
                        // You can replace 'null' with any fallback JSX you want to render when avatarUrl is undefined
                        <img
                          src={defaultAvatar}
                          alt="Circle Image"
                          className="img-raised rounded-circle img-fluid avatar-img"
                        />
                      )}

                      <i
                        className="fa fa-solid fa-camera icon"
                        onClick={handleAvatarSubmit}
                      ></i>
                    </div>
                    <input
                      type="file"
                      id="avatar-upload"
                      className="fileinput"
                      accept="image/*"
                      onChange={(event) => void handleAvatarChange(event)}
                    />

                    <div className="name">
                      <h3 className="title">{Name}</h3>
                      <h5 className="title">Rating : 2.1</h5>
                      <span className="username" onClick={handleCopy}>
                        {username}
                      </span>

                      <h6>{role}</h6>
                      {URLs.linkedin && (
                        <a
                          href={URLs.linkedin}
                          className="btn btn-just-icon btn-link btn-linkedin"
                        >
                          <i className="fa fa-linkedin"></i>
                        </a>
                      )}

                      {URLs.github && (
                        <a
                          href={URLs.github}
                          className="btn btn-just-icon btn-link btn-github"
                        >
                          <i className="fa fa-github"></i>
                        </a>
                      )}

                      {URLs.pinterest && (
                        <a
                          href={URLs.pinterest}
                          className="btn btn-just-icon btn-link btn-pinterest"
                        >
                          <i className="fa fa-pinterest"></i>
                        </a>
                      )}
                    </div>
                  </div>
                </div>
              </div>
              <div className="description text-center">
                <p>{about}</p>
              </div>
              <div
                className="col-md-6 ml-auto mr-auto"
                style={{
                  display: "flex",
                  flexWrap: "wrap",
                  gap: "8px",
                  justifyContent: "center",
                }}
              >
                {tags.map((tag) =>
                  tag.IsListed ? (
                    <Chip
                      label={tag.Name}
                      variant="outlined"
                      color="default"
                      size="small"
                    />
                  ) : null
                )}
              </div>
              <div className="row">
                {/* Profile Tabs */}
                <div className="col-md-8 ml-auto mr-auto pb-2">
                  <TabContext value={value}>
                    <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
                      <TabList
                        onChange={handleChange}
                        aria-label="lab API tabs example"
                        centered
                      >
                        <Tab label="Personal Details" value="1" />
                        <Tab label="Courses" value="2" />
                      </TabList>
                    </Box>
                    <TabPanel value="1">
                      <div className="contact_info_and_basic_info">
                        {DateOfBirth ? (
                          <div className="basic_info">
                            <h3 className="heading">Basic Information</h3>
                            <ul>
                              <li className="birthday">
                                <h5 className="label">Birthday:</h5>
                                <span className="info">{DateOfBirth}</span>
                              </li>
                            </ul>
                          </div>
                        ) : null}
                        <div className="contact_Info">
                          <h3 className="heading">Contact Information</h3>
                          <ul>
                            {phoneNumber ? (
                              <li className="phone">
                                <h5 className="label">Phone:</h5>
                                <span className="info">{phoneNumber}</span>
                              </li>
                            ) : null}

                            <li className="email">
                              <h5 className="label">E-mail:</h5>
                              <span className="info">{Email}</span>
                            </li>
                          </ul>
                        </div>
                      </div>
                    </TabPanel>
                    <TabPanel value="2">Item Two</TabPanel>
                  </TabContext>
                </div>
              </div>
            </div>
          </div>
        </div>
        <footer className="footer text-center"></footer>

        {/* Scripts */}
        <script src="https://cdnjs.cloudflare.com/ajax/libs/jquery/3.2.1/jquery.min.js"></script>
        <script
          src="https://unpkg.com/popper.js@1.12.6/dist/umd/popper.js"
          integrity="sha384-fA23ZRQ3G/J53mElWqVJEGJzU0sTs+SvzG8fXVWP+kJQ1lwFAOkcUOysnlKJC33U"
          crossOrigin="anonymous"
        ></script>
        <script src="//maxcdn.bootstrapcdn.com/bootstrap/4.0.0/js/bootstrap.min.js"></script>
        <script
          src="https://unpkg.com/bootstrap-material-design@4.1.1/dist/js/bootstrap-material-design.js"
          integrity="sha384-CauSuKpEqAFajSpkdjv3z9t8E7RlpJ1UP0lKM/+NdtSarroVKu069AlsRPKkFBz9"
          crossOrigin="anonymous"
        ></script>
      </body>
      <ToastContainer pauseOnHover={false} />
      <AddUserDetails />
    </>
  );
};

export default ProfilePage;
