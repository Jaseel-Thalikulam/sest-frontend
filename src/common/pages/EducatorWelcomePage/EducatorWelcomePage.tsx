
import EducatorWelcomeBanner from '../../Components/Banner/EducatorWelcomeBanner'
import ErrorBoundary from '../../Components/errorBoundary/ErrorBoundary'
function EducatorWelcomePage() {
  return (
    <>
      <ErrorBoundary>

      <EducatorWelcomeBanner />
      </ErrorBoundary>
      
      </>
  )
}

export default EducatorWelcomePage
