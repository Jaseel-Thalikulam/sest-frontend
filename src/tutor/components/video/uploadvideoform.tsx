import  { useCallback, useState } from 'react';
import { CloudUpload } from '@mui/icons-material';
import { useDropzone } from 'react-dropzone';
import classnames from 'classnames';
import { axiosInstance } from '../../../common/interceptor/axiosInstance';
import { TextField, Typography, Button } from '@mui/material';
import { RootStateType } from '../../../redux/store';
import { useSelector } from 'react-redux';
import { IVideo } from '../../../interface/IVideo/IVideo';
import { ChangeEvent } from 'react';
import { IUploadVideo } from '../../../interface/IVideo/IUploadVideo';
import ErrorBoundary from '../../../common/Components/errorBoundary/ErrorBoundary';
import Uploading from '../../../common/Components/uploadingComponent/Uploading';

type FileUploadState = {
  videoFile: File | null|undefined;
  thumbnailFile: File | null | undefined;
percentCompleted: number;
};

type Prop = {
  courseId: string;
  handlecloseModal: () => void;
  videos?:IVideo[]
};

function Uploadvideoform({ courseId, handlecloseModal,videos }: Prop) {
  const data = useSelector((state: RootStateType) => state.user);
  const { _id } = data;
  const [fileUpload, setFileUpload] = useState<FileUploadState | null|undefined>(null);
  const [title, setTitle] = useState('');
  const [uploading,setUploading]=useState(false)
  const [errors, setErrors] = useState<{ title: string; videoFile: string; thumbnailFile: string }>({
    title: '',
    videoFile: '',
    thumbnailFile: '',
  });

  const handleTitleChange = (event: ChangeEvent<HTMLInputElement>) => {
    setTitle(event.target.value);
  };
  const onVideoDrop = useCallback((files: File[]) => {
    if (files.length === 1 && files[0].type.startsWith('video/')) {
      setFileUpload({
        ...fileUpload,
        videoFile: files[0],
        thumbnailFile: fileUpload?.thumbnailFile || null,
        percentCompleted: fileUpload?.percentCompleted || 0,
      });
      setErrors({ ...errors, videoFile: '' });
    } else {
      setErrors({ ...errors, videoFile: 'Invalid video file type. Please upload a video file.' });
    }
  }, [fileUpload, errors]);
  
  

  const onThumbnailDrop = useCallback((files: File[]) => {
    if (files.length === 1 && files[0].type.startsWith('image/')) {
      const image = new Image();
      image.src = URL.createObjectURL(files[0]);
      image.onload = () => {
        if (image.width > image.height) {
          setFileUpload({
            ...fileUpload,
            thumbnailFile: files[0],
            videoFile: fileUpload?.videoFile || null,
            percentCompleted: fileUpload?.percentCompleted || 0,
          });
          setErrors({ ...errors, thumbnailFile: '' });
        } else {
          setErrors({ ...errors, thumbnailFile: 'Thumbnail must be in landscape orientation.' });
        }
      };
    } else {
      setErrors({ ...errors, thumbnailFile: 'Invalid thumbnail image type. Please upload an image file.' });
    }
  }, [fileUpload, errors]);
  
  const { getRootProps: getVideoRootProps, getInputProps: getVideoInputProps, isDragActive: isVideoDragActive } =
    useDropzone({ onDrop: onVideoDrop });

  const { getRootProps: getThumbnailRootProps, getInputProps: getThumbnailInputProps, isDragActive: isThumbnailDragActive } =
    useDropzone({ onDrop: onThumbnailDrop });

  const dragAreaClasses = classnames({
    'p-10 border-gray-400 border-2 border-dashed rounded-lg mb-2': true,
    'bg-gray-200': isVideoDragActive || isThumbnailDragActive
  });

  const handleSubmit =async () => {
    if (!title.trim()) {
      setErrors({ ...errors, title: 'Title is required.' });
    } else {
      setErrors({ ...errors, title: '' });
    }

    if (!fileUpload || !fileUpload.videoFile) {
      setErrors({ ...errors, videoFile: 'Please upload a video file.' });
    }

    if (!fileUpload || !fileUpload.thumbnailFile) {
      setErrors({ ...errors, thumbnailFile: 'Please upload a thumbnail image.' });
    }

    if (title.trim() && fileUpload && fileUpload.videoFile && fileUpload.thumbnailFile) {
      setUploading(true)
      const formData = new FormData();
      formData.append('video', fileUpload.videoFile);
      formData.append('thumbnail', fileUpload.thumbnailFile);
      formData.append('title', title);
      formData.append('courseId', courseId);
      formData.append('userId', _id);

   const response:{data:IUploadVideo} =   await axiosInstance
        .post(`/upload/video`, formData, {
          headers: {
            "Content-Type": "multipart/form-data" 
          },

        })
      
      // console.log(response)
      
      if (response.data.success) {
        void handlecloseModal()
if(videos)
{

  // videos
  videos.push(response.data.videoData)
        }
      } else {
        void handlecloseModal()

      }
      setUploading(false)
    }
  };

  return (
    <ErrorBoundary>
      <Uploading isUploading={uploading} />
    <div className="form-container">
      <section className="mt-10">
        <TextField
            fullWidth
            variant='standard'
          label="Title"
          value={title}
          onChange={handleTitleChange}
          required
          margin="normal"
          error={!!errors.title}
          helperText={errors.title}
          />
        <div className="my-10">
          <div className={dragAreaClasses}>
            <div {...getVideoRootProps()} >
              <input {...getVideoInputProps()} />
              {isVideoDragActive ? (
                <div className="flex flex-col">
                  <CloudUpload className="text-gray-400 w-12 text-center m-auto" />
                  <p className="text-center">Drop the video file</p>
                </div>
              ) : (
                <div className="flex flex-col">
                  <CloudUpload className="text-gray-400 w-12 text-center m-auto" />
                  <p className="text-center">Drag video files here</p>
                </div>
              )}
            </div>
          </div>
          {fileUpload && fileUpload.videoFile && (
            <div className="mt-4">
              <p className="mb-2">Video Preview:</p>
              <video width="320" height="240" controls>
                <source src={URL.createObjectURL(fileUpload.videoFile)} type="video/mp4" />
                Your browser does not support the video tag.
              </video>
            </div>
          )}
          {errors.videoFile && (
            <Typography variant="body2" color="error" className="mt-2">
              {errors.videoFile}
            </Typography>
          )}
        </div>
      </section>
      <section className="mt-10">
        <div className={dragAreaClasses}>
          <div {...getThumbnailRootProps()} >
            <input {...getThumbnailInputProps()} />
            {isThumbnailDragActive ? (
              <div className="flex flex-col">
                <CloudUpload className="text-gray-400 w-12 text-center m-auto" />
                <p className="text-center">Drop the thumbnail image</p>
              </div>
            ) : (
              <div className="flex flex-col">
                <CloudUpload className="text-gray-400 w-12 text-center m-auto" />
                <p className="text-center">Drag thumbnail images here</p>
              </div>
            )}
          </div>
        </div>
        {fileUpload && fileUpload.thumbnailFile && (
          <div className="mt-4">
            <p className="mb-2">Thumbnail Preview:</p>
            <img src={URL.createObjectURL(fileUpload.thumbnailFile)} alt="Thumbnail" width="320" height="240" />
          </div>
        )}
        {errors.thumbnailFile && (
          <Typography variant="body2" color="error" className="mt-2">
            {errors.thumbnailFile}
          </Typography>
        )}
      </section>
    
      <div className="form-button ">
        <Button  color="primary" onClick={()=> void handleSubmit()}>
          Upload
        </Button>
      </div>
    </div>
        </ErrorBoundary>
  );
}

export default Uploadvideoform;
