import Header from '../../Components/Header/Header'
import './LandingPage.scss'
import Banner from '../../Components/Banner/Banner'
import HighlightOptions from '../../Components/HighlightOptions/HighlightOptions'
import Ourmission from '../../Components/Ourmission/Ourmission'
const LandingPage = () => {
  return (
      <>
      <Header />
      <Banner />

      <div className='ml-4 md:ml-48 mr-4 md:mr-48'>
      <HighlightOptions />
      <Ourmission/>
      </div > 
      </>
   
  )
}

export default LandingPage
