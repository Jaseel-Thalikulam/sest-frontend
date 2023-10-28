
import Loading from '../loadingComponent/Loading'
type props = {
    isUploading :boolean
}
function Uploading({isUploading}:props) {
  return (
      <>
          
          {isUploading?(<div className="upload-spinner  fixed top-0 left-0 w-full h-full flex justify-center items-center bg-white bg-opacity-75 z-10" id="uploadSpinner">
        {/* <span className="loader"></span> */}
        <Loading/>
      </div>):null}
      </>
  )
}

export default Uploading
