import React, { useState } from "react";
import { Button, IconButton } from "@mui/material";
import { CloudUpload, Delete } from "@mui/icons-material";
import axiosInstance from "../../../admin/interceptor/axiosInstance";
import { RootStateType } from "../../../redux/store";
import { useSelector } from "react-redux";
import axiosInstanceTutor from "../../interceptor/axiosInstanceTutor";
import { toast } from "react-toastify";
type CloseModalFunction = () => void;

interface Props {
  CloseModal: CloseModalFunction;
}
function UploadMediaForm({ CloseModal }:Props) {
  const [mediaFiles, setMediaFiles] = useState<File[]>([]);
  const [caption, setCaption] = useState("");
  const MAX_FILES = 1; // Accept only one image
  const [mediaFilesError, setMediaFilesError] = useState("");
  const [captionError, setCaptionError] = useState("");
  const data = useSelector((state: RootStateType) => state.user);

  const { _id } = data;

  const handleMediaUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(event.target.files || []);

    if (files.length === 0) {
      setMediaFilesError("Please select an image.");
      return;
    } else {
      setMediaFilesError("");
    }

    setMediaFiles(files);
  };

  const handleRemoveMedia = () => {
    setMediaFiles([]);
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (mediaFiles.length === 0) {
      setMediaFilesError("Please select an image.");
      return;
    } else {
      setMediaFilesError("");
    }

    if (caption.trim() === "") {
      setCaptionError("Please enter a caption");
      return;
    } else {
      setCaptionError("");
    }

  
      const formData = new FormData();
      if (mediaFiles[0]) {
        const file = mediaFiles[0]
        formData.append("mediaThumbnail", file);
        formData.append("userId", _id);
        formData.append("timeStamp", new Date().toISOString());
        formData.append("type", "Media");
        formData.append("caption", caption);

    
        
        const response = await axiosInstanceTutor.post(
          "/post/media",
          formData,
          {
            headers: {
              "Content-Type": "multipart/form-data", // Important for sending files
            },
          }
        );
        
        if (response.data.success) {
          CloseModal()
          toast.success(response.data.message)
        } else {
          CloseModal()
          toast.error(response.data.message)
          
        }
        
        }
    
  };

  return (
    <div className="w-full md:w-2/3 lg:w-1/2 mx-auto p-8">
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          {mediaFiles.length > 0 && (
            <div className="flex mb-4">
              <div className="w-1/2 pr-2 relative">
                <IconButton
                  color="inherit"
                  className="absolute top-0 left-0 z-10 w-6"
                  onClick={handleRemoveMedia}
                >
                  <Delete />
                </IconButton>
                <div className="aspect-ratio-container">
                  <img
                    src={URL.createObjectURL(mediaFiles[0])}
                    alt="Image Preview"
                    className="object-cover w-full h-full rounded-md"
                  />
                </div>
              </div>
            </div>
          )}
          <label htmlFor="media" className="block font-medium mb-2">
            Image
          </label>
          <label
            htmlFor="media"
            className="border border-gray-300 rounded px-3 py-2 w-full flex items-center justify-center cursor-pointer"
          >
            <CloudUpload /> Upload Image
            <input
              type="file"
              id="media"
              accept="image/jpeg,image/png"
              onChange={handleMediaUpload}
              className="hidden"
            />
          </label>
          {mediaFilesError && (
            <p className="text-red-500 text-sm mt-1">{mediaFilesError}</p>
          )}
        </div>
        <div className="mb-4">
          <label htmlFor="caption" className="block font-medium mb-2">
            Caption
          </label>
          <input
            type="text"
            id="caption"
            value={caption}
            onChange={(e) => setCaption(e.target.value)}
            className="border border-gray-300 px-4 py-2 rounded-md w-full"
          />
          {captionError && (
            <p className="text-red-500 text-sm mt-1">{captionError}</p>
          )}
        </div>
        <Button
          type="submit"
          variant="text"
          color="primary"
          className="font-medium"
        >
          Upload
        </Button>
      </form>
    </div>
  );
}

export default UploadMediaForm;
