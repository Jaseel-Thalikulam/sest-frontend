import './LandingPage.scss'
import Banner from '../../Components/Banner/Banner'
import HighlightOptions from '../../Components/HighlightOptions/HighlightOptions'
import Ourmission from '../../Components/Ourmission/Ourmission'
import ShowCaseCourses from '../../Components/ShowCaseCourses/ShowCaseCourses'
import OurAluminiWorksAt from '../../Components/OurAluminiWorksAt/OurAluminiWorksAt'
import { useMediaQuery } from "@mui/material";
import TeachWithUs from '../../Components/LandingPage/TeachWithUs'

const LandingPage = () => {
  const isScreenLargerThan400px = useMediaQuery("(min-width: 401px)");

  return (
    <>
      
      <Banner />

      <div className='ml-4 md:ml-48 mr-4 md:mr-48'>
        <HighlightOptions />
        <Ourmission />
      </div>
      
      <ShowCaseCourses />

      {isScreenLargerThan400px && <OurAluminiWorksAt />}
      <TeachWithUs/>
     
    </>
  );
}

export default LandingPage;
