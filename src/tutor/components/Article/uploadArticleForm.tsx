import React, { ChangeEvent, useState } from "react";
import { Button, TextField, TextareaAutosize,  } from "@mui/material";
import { CloudUpload } from "@mui/icons-material";
import { RootStateType } from "../../../redux/store";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";
import {axiosInstance} from "../../../common/interceptor/axiosInstance";
import ICommonAPI from "../../../interface/IcommonAPI/IcommonAPI";
import ErrorBoundary from "../../../common/Components/errorBoundary/ErrorBoundary";
import Uploading from "../../../common/Components/uploadingComponent/Uploading";

type CloseModalFunction = (isUploaded:boolean) => void;

interface Props {
  CloseModal: CloseModalFunction;
  Title?: string;
  Content?: string;
  ThumbnailUrl?: string;
}

function UploadArticleForm({ CloseModal }:Props,) {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [uploading,setUploading]=useState(false)
  const data = useSelector((state: RootStateType) => state.user);
  const { _id } = data;
  const [article, setArticle] = useState({
    title: "",
    content: "",
    image: null as string | null,
  });

  const [errors, setErrors] = useState({
    title: "",
    content: "",
    image: "",
  });


  

  const validateForm = () => {
    let valid = true;
    const newErrors = { title: "", content: "", image: "" };

    if (article.title.trim() === "") {
      newErrors.title = "Title is required";
      valid = false;
    }

    if (article.content.trim() === "") {
      newErrors.content = "Content is required";
      valid = false;
    }

    if (!article.image) {
      newErrors.image = "Image is required";
      valid = false;
    }

    setErrors(newErrors);
    return valid;
  };

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setArticle((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };

  const handleImageChange: React.ChangeEventHandler<HTMLInputElement> = (
    e: ChangeEvent<HTMLInputElement>
  ) => {
    if (
      e.target &&
      e.target instanceof HTMLInputElement &&
      e.target.files &&
      e.target.files[0]
    ) {
      const reader = new FileReader();

      reader.onload = (e) => {
        if (e.target && e.target.result) {
          setArticle((prevState) => ({
            ...prevState,
            image: e.target!.result as string,
          }));
        }
      };

      reader.readAsDataURL(e.target.files[0]);
      setSelectedFile(e.target.files[0]);
    }
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {

    e.preventDefault();
    if (validateForm()) {
      setUploading(true)
      const formData = new FormData();

      if (selectedFile) {
        formData.append("articleThumbnail", selectedFile);
        formData.append("userId", _id);
        formData.append("timeStamp", new Date().toISOString());
        formData.append("type", "Article");
        formData.append("articleTitle", article.title);
        formData.append("articleContent", article.content);
       
       
        const response:{data:ICommonAPI} = await axiosInstance.post(
            "/post/article",
            formData,
            {
              headers: {
                "Content-Type": "multipart/form-data", // Important for sending files
              },
            }
          );

          if (response.data.success) {
            CloseModal(true);
            toast.success("Article Successfully Uploaded");
          }
      setUploading(false)
        
        
      }
    }
  };

  return (
    <ErrorBoundary>


<Uploading isUploading={uploading}/>
      

    <div className="w-full md:w-2/3 lg:w-1/2 mx-auto">
      <div className="mb-8">
        <label className="block font-medium mb-2">Image</label>
        <input
          type="file"
          id="image"
          name="image"
          accept="image/*"
          onChange={handleImageChange}
          className="hidden"
        />
        <label
          htmlFor="image"
          className="border border-gray-300 rounded px-3 py-2 w-full flex items-center justify-center cursor-pointer"
        >
          {article.image ? (
            <img
              src={article.image}
              alt="Uploaded Image Preview"
              className="max-w-full h-auto"
            />
          ) : (
            <CloudUpload />
          )}
        </label>
        <div className="text-red-500">{errors.image}</div>
      </div>
      <form onSubmit={(event)=>void handleSubmit(event)}>
        <TextField
          fullWidth
          id="title"
          name="title"
          label="Title"
          variant="standard"
          value={article.title}
          onChange={handleInputChange}
          error={!!errors.title}
          helperText={errors.title}
          className="mb-6"
          />
        <TextareaAutosize
          id="content"
          name="content"
          aria-label="Content"
            minRows={5}
          
          placeholder="Content"
          value={article.content}
          onChange={handleInputChange}
          className="border border-gray-300 rounded px-3 py-2 w-full mb-4 outline-none"
        />
        <div className="text-red-500">{errors.content}</div>
        <Button
          type="submit"
          variant="text"
          color="primary"
          className="block w-full md:w-auto"
        >
          Upload
        </Button>
      </form>
    </div>
          </ErrorBoundary>
  );
}

export default UploadArticleForm;
