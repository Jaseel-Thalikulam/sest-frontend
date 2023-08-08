import { Box, Typography } from '@mui/material';
import Register from '../Register/Register';


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
      backgroundColor: '#00235', // Changed the background color
      textAlign: 'left', // Align the typography to the left
    }}
  >
    <Box
      sx={{
        px: 4,
        mx: 'auto',
        maxWidth: 'xl',
        py: { xs: 16, lg: 40 }, // Converted from py-16 and lg:py-40
      }}
    >
   <Typography
  variant="h2"
  component="h1"
  sx={{
    mt: -20, // Adjust the margin top (you can use a different value if needed)
    mb: 5,
    fontSize: { xs: '2rem', md: '2.5rem', lg: '3rem' },
    fontWeight: 'bold',
    lineHeight: 'none',
      color: '#fff',
      maxWidth: '70%'
  }}
>
Ignite Your Career Path: Master New Skills, Shape Your Future
</Typography>


    
       
        <Register />
    </Box>
  </Box>
    
  );
};

export default Banner;
