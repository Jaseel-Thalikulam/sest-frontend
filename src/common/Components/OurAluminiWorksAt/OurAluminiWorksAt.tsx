import { useMediaQuery } from "@mui/material";
import { Typography } from "@mui/material";
import Hostinger from "../../../../public/svg/Hostinger.svg";
import ZOHO from "../../../../public/svg/ZOHO-New.svg";
import AirBnb from "../../../../public/svg/Airbnb-logo.svg";
import Unilever from "../../../../public/svg/Unilever-New.svg";
import NetFlix from "../../../../public/svg/NETFLIX.svg";

function OurAluminiWorksAt() {
  const isSmallScreen = useMediaQuery("(max-width: 400px)");
  return (
    <>
      <div className="bg-white h-auto pt-10 mb-32">
        <div
          className={`lg:ml-48 lg:mr-48 ml-4 md:ml-48 mr-4 md:mr-48 h-32 ${
            isSmallScreen ? "mt-2" : "mt-10 mb-10"
          }`}
              >
                  <Typography
            variant="h3"
            component="h1"
            sx={{
              mb: 2,
              fontSize: '2rem',
              fontWeight: 'bold',
              lineHeight: 'none',
              color: '#12222E',
              maxWidth: '100%',
            }}
          >
            Our alumni works at
          </Typography>
          <div className="flex justify-center h-full">
            {/* Flex Container for All Alumni Images */}
            <div
              className={`flex w-full ${
                isSmallScreen ? "flex-col" : "flex-wrap"
              }`}
            >
              {/* Inner Div 1 */}
              <div
                className={`w-1/3 h-full ${
                  isSmallScreen ? "mb-4" : "mb-0 pr-4"
                }`}
              >
                <img
                  src={Hostinger}
                  alt="Hostinger"
                  className="h-full w-full object-contain hover:scale-105 transition-transform duration-700"
                />
              </div>

              {/* Inner Div 2 */}
              <div
                className={`w-1/3 h-full ${
                  isSmallScreen ? "mb-4" : "mb-0 pr-4"
                }`}
              >
                <img
                  src={ZOHO}
                  alt="ZOHO"
                  className="h-full w-full object-contain hover:scale-105 transition-transform duration-700"
                />
              </div>

              {/* Inner Div 3 */}
              <div
                className={`w-1/3 h-full ${
                  isSmallScreen ? "mb-4" : "mb-0 pr-4"
                }`}
              >
                <img
                  src={AirBnb}
                  alt="AirBnb"
                  className="h-full w-full object-contain hover:scale-105 transition-transform duration-700"
                />
              </div>

              {/* Centered Div for Second Row */}
              <div className="flex justify-center w-full mt-5">
                {/* Inner Div 4 */}
                <div
                  className={`w-1/3 h-full ${
                    isSmallScreen ? "mb-4" : "mb-0 pr-4"
                  }`}
                >
                  <img
                    src={Unilever}
                    alt="Unilever"
                    className="h-36 w-full object-contain hover:scale-105 transition-transform duration-700"
                  />
                </div>

                {/* Inner Div 5 */}
                <div
                  className={`w-1/3 h-full ${
                    isSmallScreen ? "mb-4" : "mb-0 pr-4"
                  }`}
                >
                  <img
                    src={NetFlix}
                    alt="NetFlix"
                    className="h-36 w-full object-contain hover:scale-105 transition-transform duration-700"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
          </div>
      
    </>
  );
}

export default OurAluminiWorksAt;
