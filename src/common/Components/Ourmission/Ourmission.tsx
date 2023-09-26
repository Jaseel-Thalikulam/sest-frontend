import { Typography } from '@mui/material';
import React from 'react';

function OurMission() {
  return (
    <div className="flex-1 p-5 mb-10  relative">
      <div className="flex flex-col-reverse md:flex-row">
        {/* Right Side */}
        <div className="flex-1 md:order-1 max-xl:hidden">
          <svg
            width="310"
            height="500"
            xmlns="http://www.w3.org/2000/svg"
            className="overflow-visible w-full md:w-72 lg:w-96 xl:w-112" // Adjust the width as needed
          >
            <rect
              width="30vh"
              height="60vh"
              fill="#FED700"
              transform="translate(90, -110) rotate(-20 225 100)"
            />
          </svg>
          <img
            src="https://images.pexels.com/photos/4492182/pexels-photo-4492182.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
            alt="Your Image"
            className="mb-4 md:absolute top-2 border-8 border-white md:w-1/2  h-[45vh] "
            style={{ zIndex: 1 }}
          />
        </div>

        {/* Left Side */}
        <div className="flex-1 md:order-0 overflow-visible">
          <Typography
            variant="h3"
            component="h1"
            className='text-color-12222E'
            sx={{
              mb: 2,
              fontSize: '2rem',
              fontWeight: 'bold',
              lineHeight: 'none',
              color: '#12222E',
              maxWidth: '100%',
            }}
          >
            Our Mission
          </Typography>
          <h6 className="text-888888 w-full md:w-[80%] mb-10 text-sm leading-relaxed">
            At our core, we are driven by a singular mission: to revolutionize e-learning. We're dedicated to delivering quality education that transforms lives, making learning accessible to all, anywhere.
          </h6>
          <button className="bg-violet-600 p-3 pl-5 pr-5 text-white rounded-3xl text-xs text">
            MORE DETAILS
          </button>
        </div>
      </div>
    </div>
  );
}

export default OurMission;
