
import { Box, Typography } from "@mui/material";
import bannerImage from "../../../../public/images/slider-image-1 (1).jpg";
import { UserDetails } from "../../../redux/userSlice/UserSlice";
import { handleChangeState } from "../../../redux/modalSlice/RegisterFormModalSlice";
import { useDispatch } from "react-redux";
import RegisterFormModal from "../Register/RegisterFormModal";
import VerifyOTPModalWrap from "../Register/VerifyOTPModalWrap";
import ErrorBoundary from "../errorBoundary/ErrorBoundary";

const Banner = () => {
  const dispatch = useDispatch();

  function RoleOfUser(role: string) {
 

    dispatch(
      UserDetails({
        role: role,
        email:"",
        URLs: {
          github: "",
          linkedin: "",
          pinterest: "",
        },
        name: "",
        username: "",
        _id: "",
        phoneNumber: null,
        isBanned: false,
        tags: null,
        avatarUrl: "",
        createdAt:""
      })
    );
    dispatch(handleChangeState());
  }

  return (
    <>
      <ErrorBoundary>

      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          minHeight: "100vh",
          backgroundRepeat: "no-repeat",
          backgroundBlendMode: "multiply",
          textAlign: "left",
        }}
      >
        <Box
          sx={{
            px: [2, 4],
            mx: "auto",
            maxWidth: ["full", "xl"],
            py: 10,
            display: "flex",
            flexDirection: ["column", "row-reverse"],
            alignItems: "center",
          }}
        >
          <div className="w-full md:w-1/2 lg:w-1/3 xl:w-2/4 pl-14 ">
            <div
              style={{
                position: "relative",
                width: "100%",
                maxHeight: "100%",
              }}
              >
              <svg
                viewBox="0 0 250 250"
                xmlns="http://www.w3.org/2000/svg"
                style={{
                  position: "absolute",
                  zIndex: 0,
                  width: "100%",
                  height: "auto",
                }}
                >
                <path
                  fill="#8A3FFC"
                  d="M50.2,-57.8C65.9,-46.7,79.9,-31.6,82.4,-15C84.8,1.7,75.5,20,65,36.8C54.4,53.5,42.5,68.8,25.8,78C9,87.3,-12.5,90.4,-29.7,83.4C-46.9,76.4,-59.8,59.2,-68.9,41C-78,22.8,-83.4,3.6,-79.4,-13.2C-75.5,-30,-62.4,-44.3,-47.6,-55.5C-32.8,-66.7,-16.4,-74.8,0.4,-75.4C17.3,-75.9,34.5,-68.8,50.2,-57.8Z"
                  transform="translate(100 100)"
                />
              </svg>

              {/* Smaller image size */}
              <img
                src={bannerImage}
                alt="Illustration"
                style={{
                  position: "relative",
                  top: 0,
                  left: 0,
                  width: "70%", // Adjust the width to make the image smaller
                  height: "auto",
                  maxWidth: "100%",
                  zIndex: 1,
                  clipPath: "polygon(20% 0, 100% 0, 85% 100%, 0% 75%)",
                }}
              />
            </div>
          </div>

          <Box
            sx={{
              flex: "1",
              mt: [6, -20],
              ml: [0, 10],
              textAlign: ["center", "left"],
            }}
          >
      <Typography
  variant="h3"
  component="h1"
  sx={{
    mb: 2,
    fontSize: ["5vw", "5rem"], // Use 'vw' for responsive font size
    fontWeight: "bold",
    lineHeight: "none",
    color: "#12222E",
    maxWidth: "90%",
    "@media (max-width: 600px)": {
      fontSize: "3rem",
    },
    "@media (min-width: 600px) and (max-width: 900px)": {
      fontSize: "4rem",
    },
    "@media (min-width: 900px)": {
      fontSize: "5rem",
    },
  }}
>
  Ready to stand out from the crowd?
</Typography>



            <Typography
              variant="subtitle1"
              sx={{
                fontSize: ["1.5vw", "1.5rem"], // Use 'vw' for responsive font size
                color: "#555",
                mb: 0.5,
                fontWeight: "bold",
              }}
            >
              Your journey begins here.
            </Typography>

            <Typography
              variant="subtitle1"
              sx={{
                fontSize: ["1.2vw", "md"], // Use 'vw' for responsive font size
                color: "#777",
                mb: 6,
              }}
            >
              Explore endless possibilities.
            </Typography>

            <button
              onClick={() => RoleOfUser("Learn")}
              className="bg-violet-600 p-3 pl-5 pr-5 text-white  rounded-3xl text-xs text"
            >
              GET STARTED
            </button>

            {/* <Register /> */}
          </Box>
        </Box>
      </Box>
              </ErrorBoundary>
      <RegisterFormModal />
      <VerifyOTPModalWrap/>

    </>
  );
};

export default Banner;
