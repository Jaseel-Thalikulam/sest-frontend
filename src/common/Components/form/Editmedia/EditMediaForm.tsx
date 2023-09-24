import React, { useState, useEffect, SetStateAction, Dispatch } from "react";
import { Button, IconButton } from "@mui/material";
import { CloudUpload, Delete } from "@mui/icons-material";
import { RootStateType } from "../../../../redux/store";
import { useSelector } from "react-redux";
import { axiosInstance } from "../../../interceptor/axiosInstance";
import { toast } from "react-toastify";
import { Post } from "../../../../interface/IPost/IFetchFeedPost";
import { IPostAPI } from "../../../../interface/IPost/IPostAPI";

type CloseModalFunction = () => void;

interface Props {
  CloseModal: CloseModalFunction;
  selectedPost: Post;
  setPost: Dispatch<SetStateAction<Post[]>> // You need to define this function to update the post
  posts:Post[]
}

function EditMediaForm({ CloseModal, selectedPost, setPost,posts }: Props) {
  const [mediaFiles, setMediaFiles] = useState<string | File>(""); // Initialize with string for the existing image URL
  const [caption, setCaption] = useState(selectedPost.mediaCaption); // Initialize with the existing caption
  const [mediaFilesError, setMediaFilesError] = useState("");
  const [captionError, setCaptionError] = useState("");
  const data = useSelector((state: RootStateType) => state.user);

  const { _id } = data;

  useEffect(() => {
    
    if (selectedPost.mediaThumbnailURL) {
      setMediaFiles(selectedPost.mediaThumbnailURL);
    }
  }, [selectedPost.mediaThumbnailURL]);

  const handleMediaUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files || [];

    if (files.length === 0) {
      setMediaFilesError("Please select an image.");
      return;
    } else {
      setMediaFilesError("");
    }

    setMediaFiles(files[0]);

  };

  const handleRemoveMedia = () => {
    setMediaFiles("");
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (!mediaFiles || mediaFiles.length === 0) {
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
    }console.log()

    const formData = new FormData();
    if (typeof mediaFiles === "string") {
      
      formData.append("userId", _id);
      formData.append("timeStamp", new Date().toISOString());
      formData.append("type", "Media");
      formData.append("caption", caption);
      formData.append("postId", selectedPost._id);
    } else {
        formData.append("mediaThumbnail", mediaFiles);
        formData.append("userId", _id);
        formData.append("timeStamp", new Date().toISOString());
        formData.append("type", "Media");
        formData.append("caption", caption);
        formData.append("postId", selectedPost._id);
    }

     
      
    
  
    const response :{data:IPostAPI}= await axiosInstance.post("/post/editmedia", formData, {
      headers: {
        "Content-Type": "multipart/form-data", // Important for sending files
      },
    });

    if (response.data.success) {
      const postIndex = posts.findIndex((post) => post._id === response.data.Postdata._id);
      console.log(postIndex)
      if (postIndex !== -1) {
        const updatedPosts = [...posts];

        updatedPosts[postIndex] = {
          ...updatedPosts[postIndex],

          mediaThumbnailURL: response.data.Postdata.mediaThumbnailURL,
          mediaCaption: response.data.Postdata.mediaCaption,
        };

        setPost(updatedPosts);
      }
      CloseModal();
      toast.success(response.data.message);
  
    } else {
      CloseModal();
      toast.error(response.data.message);
    }
    
  };

  return (
    <div className="w-full md:w-2/3 lg:w-1/2 mx-auto p-8">
      <form onSubmit={(event)=>void handleSubmit(event)}>
        <div className="mb-4">
          {mediaFiles && (
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
                  {typeof mediaFiles === "string" ? (
                    <img
                      src={mediaFiles}
                      alt="Image Preview"
                      className="object-cover w-full h-full rounded-md"
                    />
                  ) : (
                    <img
                      src={URL.createObjectURL(mediaFiles)}
                      alt="Image Preview"
                      className="object-cover w-full h-full rounded-md"
                    />
                  )}
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

export default EditMediaForm;
