import ErrorBoundary from '../errorBoundary/ErrorBoundary'
import './Loading.scss'

const Loading = () => {
  return (
    <ErrorBoundary>
      <div className="flex justify-center items-center h-screen"> 
        <span className="loader"></span>
      </div>
    </ErrorBoundary>
  )
}

export default Loading
