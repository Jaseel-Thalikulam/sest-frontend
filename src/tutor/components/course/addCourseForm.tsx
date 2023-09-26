import React, { useEffect, useState } from 'react';
import { Button, TextField, CardMedia, Stack, Chip, FormControl, InputLabel, MenuItem, Select } from '@mui/material';
import { AddPhotoAlternate } from '@mui/icons-material';
import { axiosInstance } from '../../../common/interceptor/axiosInstance';
import { useSelector } from 'react-redux';
import { RootStateType } from '../../../redux/store';
import { ChangeEvent } from 'react';
import { ICourse } from '../../../interface/ICourse/Icourse';
import { ICourseAPI } from '../../../interface/ICourse/ICourseAPI';
import ICategoryResponse from '../../../interface/Icategory/IcategoryResponse';
import ICategorydata from '../../../interface/Icategory/IcategoryData';
import DoneIcon from "@mui/icons-material/Done";

interface ModalProps {
  CloseModal: () => void;
  handleaddvideomodal: () => void;
  handlesetCourseId: (courseId: string) => void;
  courses: ICourse[];
}

function AddCourseForm({ CloseModal, handleaddvideomodal, handlesetCourseId, courses }: ModalProps) {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [Category, setCategories] = useState<ICategorydata[]>([]);
  const [coverImage, setCoverImage] = useState<null | File>(null);
  const [invalidImage, setInvalidImage] = useState(false);
  const [descriptionError, setDescriptionError] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState('');
  const data = useSelector((state: RootStateType) => state.user);
  const { _id } = data;

  const handleTitleChange = (event: ChangeEvent<HTMLInputElement>) => {
    setTitle(event.target.value);
  };

  const handleDescriptionChange = (event: ChangeEvent<HTMLInputElement>) => {
    setDescription(event.target.value);
  };

  const handleCoverImageChange = (files: FileList | null) => {
    if (files && files.length > 0) {
      const selectedFile = files[0];

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
    }
  };

  const handleDrop = (event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    const files = event.dataTransfer.files;
    handleCoverImageChange(files);
  };

  const handleDragOver = (event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault();
  };

  const handleUploadClick = () => {
    const fileInput = document.getElementById('coverImageInput');
    if (fileInput) {
      fileInput.click();
    }
  };

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response: { data: ICategoryResponse } = await axiosInstance.get("/getCategories");
        const categories = response.data.categorydata;
        setCategories(categories);
      } catch (error) {
        console.error("Error fetching categories:", error);
      }
    };

    void fetchCategories();
  }, []);

  const handleSubmit = async () => {
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
      formData.append("category", selectedCategory); // Add selected category

      const response: { data: ICourseAPI } = await axiosInstance.post(
        "/create/course",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      if (response.data.success) {
        courses.push(response.data.CourseData);
        handlesetCourseId(response.data.CourseData._id);
        CloseModal();
        handleaddvideomodal();
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
          onDrop={(event) => void handleDrop(event)}
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
          onChange={(e) => handleCoverImageChange(e.target.files)}
          style={{ display: 'none' }}
        />
        <div className="col-sm-10">
          <FormControl fullWidth variant="outlined" margin="normal">
            <InputLabel id="category-label">Category</InputLabel>
            <Select
              labelId="category-label"
              id="category-select"
              value={selectedCategory}
              label="Category"
              onChange={(e) => setSelectedCategory(e.target.value as string)}
            >
              <MenuItem value="">
                <em>None</em>
              </MenuItem>
              {Category.map((category) => (
                <MenuItem key={category._id} value={category._id}>
                  {category.Name}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </div>
        <div className="mt-auto">
          <Button
            type="submit"
            variant="contained"
            color="primary"
            size="small"
            className="float-right"
            disabled={!title || !description || invalidImage}
            onClick={() => void handleSubmit()}
          >
            Create
          </Button>
        </div>
      </div>
    </>
  );
}

export default AddCourseForm;
