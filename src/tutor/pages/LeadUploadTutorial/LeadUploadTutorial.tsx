import React, { useCallback, useEffect,useState } from 'react'
import { useDropzone } from 'react-dropzone'
import  ProgressBar from  '@ramonak/react-progress-bar'
import axiosInstanceTutor from '../../interceptor/axiosInstanceTutor';
import { CloudUpload } from "@mui/icons-material";
import classnames from 'classnames'
import ReactPlayer from 'react-player'
function LeadUploadTutorial() {
const [video,setVideo]=useState<any>(null)
    const [fileUpload, setFileUpload] = useState(null);

   
    const onDrop = useCallback((files) => {
        const formData = new FormData();
        formData.append('file', files[0]);

     axiosInstanceTutor.post(`/upload/course`, formData, {
            onUploadProgress: (p) => {
                const percentCompleted = Math.round((p.loaded * 100) / p.total);
                setFileUpload({ fileName: files[0].name, percentCompleted });
                console.log(`${percentCompleted}%Uploaded`)
            }
        })
        

    },[])

    const {getRootProps,getInputProps,isDragActive} = useDropzone({onDrop})

    const dragAreaClasses = classnames({
        'p-10 border-gray-400 border-2 border-dashed rounded-lg': true,
        'bg-gray-200':isDragActive
    })

  return (
      <>
          {/* <video height={500} width={800} controls={true} autoPlay >
              <source src='https://d3p2fgd1341q85.cloudfront.net/jNHrYwLobXQDHpgxvideo (2160p).mp4'  />
         </video> */}
          
          {/* <section className='mt-10'>
              <p>upload</p>
              <div className="my-10">
                  <div className={dragAreaClasses}{...getRootProps()}>
                      <input {...getInputProps()} className='border botrder-red-500' />
                      {
                          isDragActive ? (
                              <div className='flex flex-col'>
                                  <CloudUpload className='text-gray-400 w-12 text-center m-auto' />
                                  <p className='text-center'>Drop  the file</p>
                          </div>
                          ) : (
                              <div className='flex flex-col'>
                                  <CloudUpload className='text-gray-400 w-12 text-center m-auto' />
                                  <p className='text-center'>Drag files here</p>
                          </div>
                                  
                          )
                      }
                  </div>
                  
              </div>
          </section>
         {fileUpload &&( <div className='mt-10 bg-blue-100'>
              <div className='flex'>
                  <div className='w-full'>
                      <p className='mb-4'>{fileUpload.fileName} </p>
                      <ProgressBar completed={fileUpload.percentCompleted} bgColor='#0766ea'/>
                  </div>
                  
              </div>
          </div>)} */}


      </>
  )
}

export default LeadUploadTutorial
