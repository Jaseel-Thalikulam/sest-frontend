import { Box, Typography } from '@mui/material';
import Register from '../Register/Register';
import bannerillustrate from '../../../../public/illustrations/undraw_online_learning_re_qw08.svg';

const Banner = () => {
  return (
    <Box
      sx={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        minHeight: '100vh',
        backgroundRepeat: 'no-repeat',
        backgroundBlendMode: 'multiply',
        textAlign: 'left',
      }}
    >
      <Box
        sx={{
          px: 4,
          mx: 'auto',
          maxWidth: 'xl',
          py: 10, // Consistent padding for both xs and lg
          display: 'flex',
          flexDirection: 'row-reverse', // Always reverse order
          alignItems: 'center',
        }}
      >
        <div className="w-full md:w-1/2 lg:w-1/3 xl:w-2/4">
          <img
            src={bannerillustrate}
            alt="Illustration"
            className="w-full h-auto mx-auto" // Center the illustration
          />
        </div>

        <Box
          sx={{
            flex: '1',
            ml: 10, // Consistent margin for both xs and lg
          }}
        >
          <Typography
            variant="h2"
            component="h1"
            sx={{
              mt: -20,
              mb: 5,
              fontSize: '2.5rem', // Consistent font size
              fontWeight: 'bold',
              lineHeight: 'none',
              color: '#1A8FE3',
              maxWidth: '70%',
            }}
          >
            Ignite Your Career Path: Master New Skills, Shape Your Future
          </Typography>

          <Register />
        </Box>
      </Box>
    </Box>
  );
};

export default Banner;
