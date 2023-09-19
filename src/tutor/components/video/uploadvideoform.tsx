import React, { useCallback, useState } from 'react';
import { CloudUpload } from '@mui/icons-material';
import ProgressBar from '@ramonak/react-progress-bar';
import { useDropzone } from 'react-dropzone';
import classnames from 'classnames';
import axiosInstanceTutor from '../../interceptor/axiosInstanceTutor';
import { TextField, Typography, Button } from '@mui/material';
import { RootStateType } from '../../../redux/store';
import { useSelector } from 'react-redux';
import { IVideo } from '../../../interface/IVideo/IVideo';

type FileUploadState = {
  videoFile: File | null;
  thumbnailFile: File | null;
};

type Prop = {
  courseId: string;
  handlecloseModal: () => void;
  videos:IVideo[]
};

function Uploadvideoform({ courseId, handlecloseModal,videos }: Prop) {
  const data = useSelector((state: RootStateType) => state.user);
  const { _id } = data;

  const [fileUpload, setFileUpload] = useState<FileUploadState | null>(null);
  const [showprogress, setProgress] = useState(false);
  const [title, setTitle] = useState('');
  const [errors, setErrors] = useState<{ title: string; videoFile: string; thumbnailFile: string }>({
    title: '',
    videoFile: '',
    thumbnailFile: '',
  });

  const handleTitleChange = (event) => {
    setTitle(event.target.value);
  };

  const onVideoDrop = useCallback((files: File[]) => {
    if (files.length === 1 && files[0].type.startsWith('video/')) {
      setFileUpload({ ...fileUpload, videoFile: files[0] });
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
          setFileUpload({ ...fileUpload, thumbnailFile: files[0] });
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
      const formData = new FormData();
      formData.append('video', fileUpload.videoFile);
      formData.append('thumbnail', fileUpload.thumbnailFile);
      formData.append('title', title);
      formData.append('courseId', courseId);
      formData.append('userId', _id);

   const response =   await axiosInstanceTutor
        .post(`/upload/video`, formData, {
          headers: {
            "Content-Type": "multipart/form-data" 
          },
          onUploadProgress: (p) => {
            const percentCompleted = Math.round((p.loaded * 100) / p.total);
            setFileUpload({ ...fileUpload, percentCompleted });
            setProgress(true);
            console.log(`${percentCompleted}% Uploaded`);
          },
        })
      
      // console.log(response)
      
      if (response.data.success) {
        void handlecloseModal()
console.log(response.data)
        videos.push(response.data.videoData)
        // videos
      } else {
        void handlecloseModal()

      }

    }
  };

  return (
    <div className="form-container">
      <section className="mt-10">
        <TextField
          fullWidth
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
            <div {...getVideoRootProps()} accept="video/*">
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
          <div {...getThumbnailRootProps()} accept="image/*">
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
      {showprogress && (
        <div className="mt-10 bg-blue-100">
          <div className="flex">
            <div className="w-full">
              <p className="mb-4">{fileUpload.videoFile.name} </p>
              <ProgressBar completed={fileUpload.percentCompleted} bgColor="#0766ea" />
            </div>
          </div>
        </div>
      )}
      <div className="form-button">
        <Button variant="contained" color="primary" onClick={handleSubmit}>
          Upload
        </Button>
      </div>
    </div>
  );
}

export default Uploadvideoform;
