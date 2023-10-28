import  { useEffect, useState } from "react";
import FavoriteIcon from "@mui/icons-material/Favorite";
import CommentIcon from "@mui/icons-material/Comment";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import ThumbUpIcon from "@mui/icons-material/ThumbUp";
import SendIcon from "@mui/icons-material/Send";
import PublicMethods from "../../../Methods/PublicMethods";
import { useSelector } from "react-redux";
import { RootStateType } from "../../../redux/store";
import {axiosInstance} from "../../interceptor/axiosInstance";
import DialogContent from "@mui/material/DialogContent";
import {
  DialogContentText,
  DialogActions,
  IconButton,
  TextField,
  Stack,
} from "@mui/material";
import AddPost from '../../../../public/svg/undraw_add_post_re_174w.svg'
import Button from "@mui/material/Button";
import CancelIcon from "@mui/icons-material/Cancel";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import ConfirmDeleteModal from "../../Components/Modal/confirmpostdeletModal/ConfirmDeleteModal";
import EditMediaModal from "../../Components/Modal/editMediaModal/editMediaModal";
import EditMediaForm from "../../Components/form/Editmedia/EditMediaForm";
import IFetchFeedPost, { Post } from "../../../interface/IPost/IFetchFeedPost";
import CommentIllustarte from "../../../../public/svg/undraw_opinion_re_jix4.svg";
import ICommonAPI from "../../../interface/IcommonAPI/IcommonAPI";
import { IPostAPI } from "../../../interface/IPost/IPostAPI";
import {  Image, Description } from "@mui/icons-material";
import UploadArticleModal from "../../../tutor/components/Article/uploadArticleModal";
import UploadArticleForm from "../../../tutor/components/Article/uploadArticleForm";
import UploadMediaModal from "../../../tutor/components/Media/UploadMediaModal";
import UploadMediaForm from "../../../tutor/components/Media/UploadMediaForm";

function ShowAllPosts() {
  const [isLoading, setIsLoading] = useState(true);
  const [posts, setPosts] = useState<Post[]>([]);
  const [commentText, setCommentText] = useState("");
  const [optionsVisible, setOptionsVisible] = useState(false);
  const [commentInputVisibility, setCommentInputVisibility] = useState<{ [postId: string]: boolean; }>({});
  const [refetchindicator, setrefetchindicator] = useState(false);
  const [isDeleteConfirmModalOpen, setDeleteConfirmModal] = useState(false);
  const [selectedPostId, setSelectedPostId] = useState<string | null>(null);
  const [editMediamodalstate, setEditMediaModal] = useState<boolean>(false);
  const [selectedPost, setSelectedPost] = useState<Post | null>(null);
  const [selectedCommentId, setSelectedCommentId] = useState<string | null>(null);
  const [isArticleModalOpen, setArticleModal] = useState(false);
  const [isMediaModalOpen, setMediaModal] = useState(false);
  const data = useSelector((state: RootStateType) => state.user);
  const { _id } = data;

  const publicmethods = new PublicMethods();
  function handleMediaeditModalOpenClose() {
    setEditMediaModal(!editMediamodalstate);
  }

 

  useEffect(() => {
    void(async function fetchPost() {
   
        const response: { data: IFetchFeedPost } =
          await axiosInstance.get("/userPost", {
            params: {
              userId: _id,
            },
          });

        setPosts(response.data.FeedPost);
        setIsLoading(false);
      
    })();
  }, [_id, refetchindicator]);

   function handleEditMedia(postdata: object) {
    if ("_id" in postdata) {
      const id = postdata._id;
      const selectedPost = posts.find((post) => post._id === id) || null;
      setSelectedPost(selectedPost);
      handleMediaeditModalOpenClose();
    }
  }
  async function handleDeleteComment(commentId: string, postId: string) {
    
      const response:{data:IPostAPI} = await axiosInstance.delete(
        "/post/deletecomment",
        {
          data: {
            userId: _id,
            postId,
            commentId,
          },
        }
      );
      const postIndex = posts.findIndex((post) => post._id === postId);

      if (postIndex !== -1) {
        const updatedPosts = [...posts];

        updatedPosts[postIndex] = {
          ...updatedPosts[postIndex],

          comments: response.data.Postdata.comments,
        };

        setPosts(updatedPosts);
      }

  }

  async function handleLikeComment(commentId: string, postId: string) {
   
    const response: {data:IPostAPI}= await axiosInstance.post("/post/likecomment", {
        userId: _id,
        postId,
        commentId,
      });

      const updatedPosts = [...posts]; // Create a copy of the posts array
      const postIndex = posts.findIndex((post) => post._id === postId);
     
      const comments = response.data.Postdata.comments;
      
      // Find the post that contains the comment with the given commentId

      updatedPosts[postIndex] = {
        ...updatedPosts[postIndex],

        comments: comments,
      };

      setPosts(updatedPosts);

  }
  async function handleLike(postId: string) {
    const timeStamp = new Date().toISOString();

     await axiosInstance.post("/post/like", {
        postId,
        timeStamp,
        userId: _id,
      });
 
  }

  const handleCommentSubmit = async (postId: string) => {
    const timeStamp = new Date().toISOString();
  
      const response:{data:IPostAPI} = await axiosInstance.post("/post/addComment", {
        postId,
        userId: _id,
        content: commentText,
        timeStamp,
      });

      const postIndex = posts.findIndex((post) => post._id === postId);

      if (postIndex !== -1) {
        const updatedPosts = [...posts];

        updatedPosts[postIndex] = {
          ...updatedPosts[postIndex],

          comments: response.data.Postdata.comments,
        };

        setPosts(updatedPosts);
      }
  
  };

  

  const handleCommentIconClick = (postId: string) => {
    setCommentInputVisibility((prevVisibility) => ({
      ...prevVisibility,
      [postId]: !prevVisibility[postId],
    }));
  };

  const handleSelectedComment = (commentId: string) => {
    setSelectedCommentId(commentId)
  }

  const handleToggleOptions = (postId: string) => {
    setSelectedPostId(postId);
    setOptionsVisible(!optionsVisible);
  };

  function handledeletemodalVisibilty() {
    setOptionsVisible(false);
    setDeleteConfirmModal(!isDeleteConfirmModalOpen);
  }

  const handleDeletePost = async (postId: string|null) => {
    handledeletemodalVisibilty();

 
      const response:{data:ICommonAPI} = await axiosInstance.delete("/deletepost", {
        data: {
          userId: _id,
          postId: postId,
        },
      });

      if (response.data.success) {
        toast.success(response.data.message);
        setrefetchindicator(!refetchindicator);
      } else {
        toast.error(response.data.message);
      }


    setOptionsVisible(false);
  };

  const renderPost = (post: Post) => {
    let userHasLiked;
    if (post.likes) {
      userHasLiked = post.likes.some((like) => like.userId === _id);
    }

    return (
      <div
        key={post._id}
        className="flex bg-white shadow-lg rounded-lg mx-4 md:mx-auto my-4 max-w-md md:max-w-2xl relative"
      >
        <div className="absolute top-0 right-0 m-2">
          <button
              
            onClick={() => handleToggleOptions(post._id)}
            className={` text-gray-600 p-2 rounded-full hover:bg-gray-300 hover:text-gray-700`}
          >
            ☰
          </button>
          {optionsVisible && selectedPostId === post._id && (
            <div className="bg-white absolute top-0 right-10 mt-10 p-2 rounded-lg shadow-lg">
              {post.type === "Article" && (
                <button className="flex items-center space-x-2 text-gray-700 hover:text-blue-500">
                  <EditIcon fontSize="small" />
                  <span>Edit</span>
                </button>
              )}
   
              {post.type === "Media" && (
                <>
                  <button
                    onClick={() =>void handleEditMedia(post)}
                    className="flex items-center space-x-2 text-gray-700 hover:text-blue-500"
                  >
                    <EditIcon fontSize="small" />
                    <span>Edit</span>
                  </button>

                  <EditMediaModal
                    CloseModal={handleMediaeditModalOpenClose}
                    data="Edit Media"
                    isOpen={editMediamodalstate}
                  >
                    <EditMediaForm
                      CloseModal={handleMediaeditModalOpenClose}
                      selectedPost={selectedPost}
                      setPost={setPosts}
                      posts={posts}
                    />
                  </EditMediaModal>
                </>
              )}
              <button
                onClick={() => handledeletemodalVisibilty()}
                className="flex items-center space-x-2 text-gray-700 hover:text-red-500 mt-2"
              >
                <DeleteIcon fontSize="small" />
                <span>Delete</span>
              </button>
            </div>
          )}
        </div>

     

        {/* Rest of the post content */}
        <div className="flex items-start px-4 py-6 w-full">
          <div className="flex-1 w-full">
            <div className="flex items-start justify-between">
              <div className="flex items-center">
                <img
                  src={post.userId.avatarUrl}
                  className="w-12 h-12 rounded-full object-cover mr-4 shadow"
                  alt="Author's avatar"
                />
                <div>
                  <h2 className="text-lg  text-gray-900">
                    {publicmethods.properCase(post.userId.name)}
                  </h2>
                  <small className="text-sm text-gray-700">
                    {publicmethods.formateTimeStamp(post.timeStamp)}
                  </small>
                </div>
              </div>
            </div>

            {post.type === "Article" && (
              <>
                <div className="w-full h-60 rounded-lg overflow-hidden mt-5">
                  <div className="flex items-center justify-center h-full">
                    <img
                      src={post.articleThumbnailURL}
                      alt="Article Thumbnail"
                      className="object-cover max-h-full rounded-md"
                    />
                  </div>
                </div>

                {/* Adjust the style for title and description */}
                <h1 className="text-xl font-semibold text-gray-800 mt-4 ml-2">
                  {post.articleTitle}
                </h1>
                <p className="text-gray-700 mt-2 ml-2">{post.articleContent}</p>

                <div className="mt-4 flex items-center">
                  <IconButton
                    aria-label="send"
                    color={userHasLiked ? "error" : "primary"}
                    onClick={() => void handleLike(post._id)}
                  >
                    <FavoriteIcon fontSize="small" />
                  </IconButton>

                  {/* Like count */}
                  <span className="text-xs text-gray-500 ml-1">
                    {post.likes?.length}
                  </span>

                  <IconButton
                    aria-label="send"
                    color="success"
                    onClick={() => handleCommentIconClick(post._id)}
                  >
                    <CommentIcon fontSize="small" />
                  </IconButton>
                  <span className="text-xs text-gray-500 ml-1">
                    {post.comments?.length}
                  </span>
                </div>
                {commentInputVisibility[post._id] && (
                  <Stack
                    direction="row"
                    alignItems="center"
                    spacing={1}
                    className="px-4 pb-4 pt-4"
                  >
                    <TextField
                      type="text"
                      placeholder="Add a comment..."
                      variant="standard"
                      size="small"
                      fullWidth
                      value={commentText}
                      onChange={(e) =>void setCommentText(e.target.value)}
                    />
                    <IconButton
                      aria-label="send"
                      color="primary"
                      onClick={() =>void handleCommentSubmit(post._id)}
                    >
                      <SendIcon />
                    </IconButton>
                  </Stack>
                )}

                {commentInputVisibility[post._id] &&
                  post.comments &&
                  post.comments.length > 0 && (
                    <div className="mt-4">
                      <h3 className="text-lg font-semibold text-gray-900">
                        Comments:
                      </h3>
                      {post.comments.map((comment) => (
                        <div
                          className="relative  flex items-start mt-2"
                          key={comment._id}
                        >
                          <div className="text-gray-400 text-xs hidden md:block absolute top-0 right-0 m-2">
                            {publicmethods.formateTimeStamp(comment.timeStamp)}
                          </div>
                          <img
                            className="w-8 h-8 rounded-full object-cover mr-2 shadow"
                            src={comment.userId.avatarUrl}
                            alt="Commenter's avatar"
                          />
                          <div className="flex-grow">
                            <div className="flex items-center justify-between">
                              <div>
                                <p className="text-gray-700 font-semibold">
                                  {publicmethods.properCase(
                                    comment.userId.name
                                  )}
                                </p>
                                <p className="text-gray-700">
                                  {comment.content}
                                </p>
                              </div>
                            </div>
                            <button
                              className="text-blue-500 hover:text-blue-700 mt-2"
                              onClick={() =>
                               void handleLikeComment(comment._id, post._id)
                              }
                            >
                              <ThumbUpIcon fontSize="small" /> Like
                            </button>
                            <span className="text-xs text-gray-500 ml-1">
                              {comment.likes?.length}
                            </span>
                          </div>

                          {comment.userId._id == _id && (
                            <div className="absolute top-4 right-0 m-2">
                              <button
                                onClick={() => handleSelectedComment(comment._id)}
                                className={`text-gray-600 p-2 rounded-full hover:text-gray-700`}
                              >
                                ☰
                              </button>
                              {optionsVisible &&
                                selectedCommentId === comment._id && (
                                  <div className="bg-white absolute top-0 right-10 mt-10 p-2 rounded-lg shadow-lg">
                                    {/* ... Edit options based on comment.type ... */}
                                    <button
                                      onClick={() =>
                                       void handleDeleteComment(
                                          comment._id,
                                          post._id
                                        )
                                      }
                                      className="flex items-center space-x-2 text-gray-700 hover:text-red-500 mt-2"
                                    >
                                      <DeleteIcon fontSize="small" />
                                      <span>Delete</span>
                                    </button>
                                  </div>
                                )}
                            </div>
                          )}
                        </div>
                      ))}
                    </div>
                  )}

                {commentInputVisibility[post._id] &&
                  (!post.comments || post.comments.length === 0) && (
                    <div className="mt-4 flex items-center">
                      <img src={CommentIllustarte} className="w-36 h-36" />{" "}
                      {/* Adjust the size as needed */}
                      <p className="ml-4 text-gray-700">
                        Lead the discussion with your first comment
                      </p>
                    </div>
                  )}
              </>
            )}

            {/* {post.type === "Poll" && (
              <div className="mt-2">
                <h1 className="text-xl font-semibold text-gray-900 mt-2">
                  {post.pollQuestion}
                </h1>
                
                {post.pollOptions && post.pollVotes ? (
                  post.pollOptions.map((option, index) => (
                    <div key={index} className="flex items-center mt-3">
                      <span className="w-1/5">{option}</span>

                      <div className="relative flex-1">
                        <div
                          style={{
                            width: `${
                              (post.pollVotes?post.pollVotes[index]:0 / post.totalVotes) * 100
                            }%`,
                          }}
                          className="h-4 bg-blue-500 rounded-full"
                        >
                          <span className="absolute inset-0 flex items-center justify-center text-white">
                            {`${Math.round(
                              (post.pollVotes?post.pollVotes[index]:0 / post.totalVotes) * 100
                            )}%`}
                          </span>
                        </div>
                      </div>
                    </div>
                  ))
                ) : (
                  <p className="text-gray-500 mt-3">
                    No poll options available.
                  </p>
                )}
              </div>
            )} */}

            {post.type === "Media" && (
              <>
                <div className="flex-1">
                  <div className="w-full max-h-96 rounded-lg overflow-hidden mt-5">
                    <p className="text-gray-700 mb-4">{post.mediaCaption}</p>
                    <img
                      src={post.mediaThumbnailURL}
                      alt="Article Thumbnail"
                      className="object-cover w-full h-full rounded-md"
                    />
                  </div>

                  <div className="mt-4 flex items-center">
                    <IconButton
                      aria-label="send"
                      color={userHasLiked ? "error" : "primary"}
                      onClick={() => void handleLike(post._id)}
                    >
                      <FavoriteIcon fontSize="small" />
                    </IconButton>
                    <span className="text-xs text-gray-500 ml-1">
                      {post.likes?.length}
                    </span>
                    <IconButton
                      aria-label="send"
                      color="success"
                      onClick={() => handleCommentIconClick(post._id)}
                    >
                      <CommentIcon fontSize="small" />
                    </IconButton>
                    <span className="text-xs text-gray-500 ml-1">
                      {post.comments?.length}
                    </span>
                  </div>

                  {commentInputVisibility[post._id] && (
                    <Stack
                      direction="row"
                      alignItems="center"
                      spacing={1}
                      className="px-4 pb-4 pt-4"
                    >
                      <TextField
                        type="text"
                        placeholder="Add a comment..."
                        variant="standard"
                        size="small"
                        fullWidth
                        value={commentText}
                        onChange={(e) =>void setCommentText(e.target.value)}
                      />
                      <IconButton
                        aria-label="send"
                        color="primary"
                        onClick={() =>void handleCommentSubmit(post._id)}
                      >
                        <SendIcon />
                      </IconButton>
                    </Stack>
                  )}

                  {commentInputVisibility[post._id] &&
                    post.comments &&
                    post.comments.length > 0 && (
                      <div className="mt-4">
                        <h3 className="text-lg font-semibold text-gray-900">
                          Comments:
                        </h3>
                        {post.comments.map((comment) => (
                          <div
                            className="flex items-start mt-2"
                            key={comment._id}
                          >
                            <img
                              className="w-8 h-8 rounded-full object-cover mr-2 shadow"
                              src={comment.userId.avatarUrl}
                              alt="Commenter's avatar"
                            />
                            <div className="flex-grow">
                              <div className="flex items-center justify-between">
                                <div>
                                  <p className="text-gray-700 font-semibold">
                                    {publicmethods.properCase(
                                      comment.userId.name
                                    )}
                                  </p>
                                  <p className="text-gray-700">
                                    {comment.content}
                                  </p>
                                </div>
                                <div className="text-gray-400 text-xs hidden md:block">
                                  {publicmethods.formateTimeStamp(
                                    comment.timeStamp
                                  )}
                                </div>
                              </div>
                              <button
                                className="text-blue-500 hover:text-blue-700 mt-2"
                                onClick={() =>
                                 void handleLikeComment(comment._id, post._id)
                                }
                              >
                                <ThumbUpIcon fontSize="small" /> Like
                              </button>
                              <span className="text-xs text-gray-500 ml-1">
                                {comment.likes?.length}
                              </span>
                            </div>
                            
                          </div>
                        ))}
                      </div>
                    )}
                </div>
              </>
            )}
          </div>
        </div>
      </div>
    );
  };

 
 

  function handelArticleButtonClick(isUploaded: boolean) {
    
    if (isUploaded) {
      setrefetchindicator(!refetchindicator) 
    }
    setArticleModal(!isArticleModalOpen);
  }
  function handleMediaButtonClick(isUploaded: boolean) {
    console.log(isUploaded, "issss")
    if (isUploaded) {
      setrefetchindicator(!refetchindicator) 
    }
    setMediaModal(!isMediaModalOpen);
  }
  return (
    <>
      <div className="flex-grow bg-white">

      <div className="mt-4 mb-4 bg-white shadow rounded-lg  sm:mx-auto my-4 max-w-md md:max-w-2xl relative">
                  <div className="bg-white p-4 rounded-lg shadow-md">
                    {/* Meeting, Image/Video, and Article Options */}
                    <div className="flex space-x-4 justify-center">
                    
            
                      <Button
                        variant="text"
                        startIcon={<Image className="text-purple-500" />}
                        onClick={()=> handleMediaButtonClick(false)}
                      >
                        Media
                      </Button>
                
                  
                      {/* Centered Button - Article */}
                      <Button
                        variant="text"
                        startIcon={<Description className="text-orange-500" />}
                        onClick={() => void handelArticleButtonClick(false)}
                      >
                        Article
                      </Button>
                    </div>
                  </div>
                </div>
                      <div className="p-4 rounded-lg w-full   mb-4 md:mb-0 max-h-screen hide-scrollbar">
     
          <div className="p-4 rounded-lg">
          
          {isLoading ? (
  [1, 2].map((x) => (
    <div
      className="bg-white shadow-lg rounded-lg mx-4 md:mx-auto my-4 max-w-md md:max-w-2xl"
      key={x}
    >
      <div className="flex items-start px-4 py-6 animate-pulse">
        <div className="w-12 h-12 rounded-full bg-gray-300 mr-4"></div>
        <div className="flex-1">
          <div className="w-1/4 h-4 bg-gray-300 mb-2"></div>
          <div className="w-3/4 h-4 bg-gray-300 mb-2"></div>
          <div className="w-full h-60 bg-gray-300 rounded-lg overflow-hidden mt-5"></div>
        </div>
      </div>
    </div>
  ))
) : (
  posts.length === 0 ? (
    <div className="flex justify-center items-start md:pt-20 h-screen ">
    <div className="flex items-center">
      <img src={AddPost} alt="add your first post" className="w-1/2 h-auto mx-auto" />
      <h1 className="ml-4 text-3xl text-gray-500 hidden md:block">Time to add your first post</h1>
    </div>
  </div>
  
  ) : (
    posts.map((post) => renderPost(post))
  )
)}

          </div>
        </div>
      </div>

      <ConfirmDeleteModal
          data="Are You Sure ?"
          isOpen={isDeleteConfirmModalOpen}
          CloseModal={handledeletemodalVisibilty}
        >
          <DialogContent>
            <DialogContentText>
              Are you sure you want to delete the post?
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button
              color="primary"
              startIcon={<CancelIcon />}
              onClick={() => void handledeletemodalVisibilty()}
            >
              Cancel
            </Button>
            <Button
              onClick={() =>void handleDeletePost(selectedPostId)}
              color="error"
              startIcon={<DeleteIcon />}
            >
              Delete
            </Button>
          </DialogActions>
        </ConfirmDeleteModal>

      <UploadArticleModal
        
        isOpen={isArticleModalOpen}
        CloseModal={()=> handelArticleButtonClick(false)}
        data="Author Your Content"
      >
        <UploadArticleForm CloseModal={handelArticleButtonClick} />
      </UploadArticleModal>

      <UploadMediaModal
        isOpen={isMediaModalOpen}
        CloseModal={()=>handleMediaButtonClick(false)}
        data="Share Your Insights"
      >
        <UploadMediaForm CloseModal={handleMediaButtonClick} />
      </UploadMediaModal>
      <ToastContainer />
    </>
  );
}

export default ShowAllPosts;
