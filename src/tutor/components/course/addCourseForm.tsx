import React, { useState } from 'react';
import { Button, TextField, CardMedia } from '@mui/material';
import { AddPhotoAlternate } from '@mui/icons-material';
import Uploadvideoform from '../video/uploadvideoform';
import axiosInstanceTutor from '../../interceptor/axiosInstanceTutor';
import { useSelector } from 'react-redux';
import { RootStateType } from '../../../redux/store';
interface ModalProps {
  CloseModal: () => void;
  handleaddvideomodal: () => void;
  handlesetCourseId: (courseId: string) => void;
  courses
}
function AddCourseForm({CloseModal,handleaddvideomodal,handlesetCourseId,courses}:ModalProps) {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [coverImage, setCoverImage] = useState(null);
  const [invalidImage, setInvalidImage] = useState(false);
  const [descriptionError, setDescriptionError] = useState(false);
  const data = useSelector((state: RootStateType) => state.user);
  const { _id } = data;
  const handleTitleChange = (event) => {
    setTitle(event.target.value);
  };

  const handleDescriptionChange = (event) => {
    setDescription(event.target.value);
  };

  const handleCoverImageChange = (event) => {
    const selectedFile = event.target.files[0];

    if (selectedFile) {
      const img = new Image();
      img.src = URL.createObjectURL(selectedFile);

      img.onload = () => {
        if (img.width > img.height) {
          setInvalidImage(false); // Landscape image
          setCoverImage(selectedFile);
        } else {
          setInvalidImage(true); // Portrait image
          setCoverImage(null);
        }
      };
    }
  };


  const handleDrop = (event) => {
    event.preventDefault();
    handleCoverImageChange(event);
  };

  const handleDragOver = (event) => {
    event.preventDefault();
  };

  const handleUploadClick = () => {
    // Trigger the click event of the hidden file input
    document.getElementById('coverImageInput').click();
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    
    // Check if description contains at least 50 words
    const words = description.split(/\s+/);
    if (words.length < 50) {
      setDescriptionError(true);
      return;
    }
    
    setDescriptionError(false);

  
    const formData = new FormData();
    

    if (coverImage) {
      
      formData.append("coverImage", coverImage);
      formData.append("tutorId", _id);
      formData.append("title", title);
      formData.append("description", description);
      
      const response = await axiosInstanceTutor.post(
        "/create/course",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data", 
          },
        }
        );
      
      if (response.data.success) {
        
        courses.push(response.data.data)
        handlesetCourseId(response.data.data._id)
        CloseModal();
handleaddvideomodal()
      } else {
        // console.log(response.data.message)
      }
      
      }
      };

  return (
    <>
    <div className="bg-white p-4 flex flex-col h-full relative">
      <TextField
        fullWidth
        label="Title"
        value={title}
        onChange={handleTitleChange}
        required
        margin="normal"
      />
      <TextField
        fullWidth
        label="Description"
        value={description}
        onChange={handleDescriptionChange}
        required
        multiline
        rows={4}
        margin="normal"
        error={descriptionError}
        helperText={descriptionError ? 'Description must contain at least 50 words' : ''}
      />
      <div
        onClick={handleUploadClick}
        onDrop={handleDrop}
        onDragOver={handleDragOver}
        className="border-dashed border-2 border-gray-400 mt-4 mb-2 p-4 flex-grow cursor-pointer"
      >
        {coverImage ? (
          <CardMedia
            component="img"
            alt="Cover Image Preview"
            height="80" // Decreased height for smaller preview
            src={URL.createObjectURL(coverImage)}
          />
        ) : (
          <div className="text-gray-500 text-center">
            <AddPhotoAlternate fontSize="large" />
            {invalidImage ? (
              <p className="text-red-500">Only landscape images are allowed.</p>
            ) : (
              <p>Click to Upload or Drag and Drop an image here</p>
            )}
          </div>
        )}
      </div>
      <input
        type="file"
        accept="image/*"
        id="coverImageInput"
        onChange={handleCoverImageChange}
        style={{ display: 'none' }}
      />
      <div className="mt-auto">
        <Button
          type="submit"
          variant="contained"
          color="primary"
          size="small"
          className="float-right"
          disabled={!title || !description || invalidImage}
          onClick={handleSubmit}
        >
          Create
        </Button>
      </div>
      </div>

      
    </>
  );
}

export default AddCourseForm;
