import React, { useEffect, useState } from "react";
import {axiosInstance} from "../../../common/interceptor/axiosInstance";
import { RootStateType } from "../../../redux/store";
import { useSelector } from "react-redux";
import IFetchFeedPost, { Post } from "../../../interface/IPost/IFetchFeedPost";
import PublicMethods from "../../../Methods/PublicMethods";
import { IconButton } from "@mui/material";
import SendIcon from "@mui/icons-material/Send"; // Import the SendIcon
import TextField from "@mui/material/TextField"; // Import TextField
import Stack from "@mui/material/Stack"; // Import Stack
import ThumbUpIcon from "@mui/icons-material/ThumbUp";
import DeleteIcon from "@mui/icons-material/Delete";
import CommentIllustarte from "../../../../public/illustrations/undraw_opinion_re_jix4.svg";  
import {  IPostAPI } from "../../../interface/IPost/IPostAPI";
function Posts() {
  const [isLoading, setIsLoading] = useState(true);
  const [posts, setPosts] = useState<Post[]>([]);
  const data = useSelector((state: RootStateType) => state.user);
  const { _id } = data;
  const publicmethods = new PublicMethods();
  const [optionsVisible, setOptionsVisible] = useState(false);
  const [selectedCommentId, setSelectedCommentId] = useState<string | null>(
    null
  );

  // Initialize comment input visibility state
  const [commentInputVisibility, setCommentInputVisibility] = useState<{
    [postId: string]: boolean;
  }>({});
  const [commentText, setCommentText] = useState("");

  useEffect(() => {
    // Simulate fetching posts from an API
    void(async function fetchPost() {
     
  console.warn(_id,"ddddddd")
        const response: { data: IFetchFeedPost } =
          await axiosInstance.get("/fetchFeedPost", {
            params: {
              userId: _id,
            },
          });

        setPosts(response.data.FeedPost);
        setIsLoading(false);
    })();
  }, [_id]);

  async function handleLike(postId: string) {
    const timeStamp = new Date().toISOString();

    
      const response:{data:IPostAPI} = await axiosInstance.post("/post/like", {
        postId,
        timeStamp,
        userId: _id,
      });

      const postIndex = posts.findIndex((post) => post._id === postId);

      if (postIndex !== -1) {
        const updatedPosts = [...posts];

        updatedPosts[postIndex] = {
          ...updatedPosts[postIndex],

          likes: response.data.Postdata.likes,
        };

        setPosts(updatedPosts);
      }

  }

  const handleCommentIconClick = (postId: string) => {
    setCommentInputVisibility((prevVisibility) => ({
      ...prevVisibility,
      [postId]: !prevVisibility[postId],
    }));
  };

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

  function handleToggleOptions(commentId: string) {
    setOptionsVisible(!optionsVisible);
    setSelectedCommentId(commentId);
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
    
      const response:{data:IPostAPI} = await axiosInstance.post("/post/likecomment", {
        userId: _id,
        postId,
        commentId,
      });

      const updatedPosts = [...posts]; // Create a copy of the posts array
      const postIndex = posts.findIndex((post) => post._id === postId);
    
      const comments = response.data.Postdata.comments;

      updatedPosts[postIndex] = {
        ...updatedPosts[postIndex],

        comments: comments,
      };

      setPosts(updatedPosts);
   
  }

  const renderPost = (post: Post) => {
    if (post.type === "Article") {
      let userHasLiked;
      if (post.likes) {
        userHasLiked = post.likes.some((like) => like.userId === _id);
      }

      return (
        <div
          key={post._id}
          className="flex bg-white shadow-lg rounded-lg mx-4 md:mx-auto my-4 max-w-md md:max-w-2xl"
        >
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
                  color={userHasLiked ? "error" : "default"}
                  onClick={() => void handleLike(post._id)}
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill={userHasLiked ? "currentColor" : "none"}
                    viewBox="0 0 24 24"
                    strokeWidth="1.5"
                    stroke="currentColor"
                    className="w-6 h-6"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12z"
                    />
                  </svg>
                </IconButton>

                {/* Like count */}
                <span className="text-xs text-gray-500 ml-1">
                  {post.likes?.length}
                </span>

                <IconButton
                  aria-label="send"
                  color="primary"
                  onClick={() => handleCommentIconClick(post._id)}
                >
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-5 h-5">
  <path fillRule="evenodd" d="M3.43 2.524A41.29 41.29 0 0110 2c2.236 0 4.43.18 6.57.524 1.437.231 2.43 1.49 2.43 2.902v5.148c0 1.413-.993 2.67-2.43 2.902a41.202 41.202 0 01-5.183.501.78.78 0 00-.528.224l-3.579 3.58A.75.75 0 016 17.25v-3.443a41.033 41.033 0 01-2.57-.33C1.993 13.244 1 11.986 1 10.573V5.426c0-1.413.993-2.67 2.43-2.902z" clipRule="evenodd" />
</svg>


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
                    onClick={() => void handleCommentSubmit(post._id)}
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
                                {publicmethods.properCase(comment.userId.name)}
                              </p>
                              <p className="text-gray-700">{comment.content}</p>
                            </div>
                          </div>
                          <button
                            className="text-blue-500 hover:text-blue-700 mt-2"
                            onClick={() => void
                              handleLikeComment(comment._id, post._id)
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
                              onClick={() => handleToggleOptions(comment._id)}
                              className={`text-gray-600 p-2 rounded-full hover:text-gray-700`}
                            >
                              ☰
                            </button>
                            {optionsVisible &&
                              selectedCommentId === comment._id && (
                                <div className="bg-white absolute top-0 right-10  p-2 rounded-lg shadow-lg">
                                  {/* ... Edit options based on comment.type ... */}
                                  <button
                                    onClick={() => void
                                      handleDeleteComment(comment._id, post._id)
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
            </div>
          </div>
        </div>
      );
    }

    // else if (post.type === "Poll") {
    //   return (
    //     <div
    //       key={post._id}
    //       className="bg-white shadow-lg rounded-lg mx-4 md:mx-auto my-4 max-w-md md:max-w-2xl"
    //     >
    //       <div className="flex items-start px-6 py-4 w-full">
    //         <img
    //           className="w-12 h-12 rounded-full object-cover mr-4 shadow"
    //           src={post.userId.avatarUrl}
    //           alt="Author's avatar"
    //         />
    //         <div className="flex-1">
    //           <div className="flex items-center justify-between">
    //             <h2 className="text-lg font-semibold text-gray-900">
    //               {publicmethods.properCase(post.userId.name)}
    //             </h2>
    //             <small className="text-sm text-gray-500">
    //               {publicmethods.formateTimeStamp(post.timeStamp)}
    //             </small>
    //           </div>

    //           <div className="mt-2">
    //             <h1 className="text-xl font-semibold text-gray-900 mt-2">
    //               {post.pollQuestion}
    //             </h1>
    //             {/* Check if pollOptions and pollVotes are defined before mapping */}
    //             {post.pollOptions && post.pollVotes ? (
    //               post.pollOptions.map((option, index) => (
    //                 <div key={index} className="flex items-center mt-3">
    //                   <span className="w-1/5">{option}</span>

    //                   <div className="relative flex-1">
    //                     <div
    //                       style={{
    //                         width: `${
    //                           (post.pollVotes
    //                             ? post.pollVotes[index]
    //                             : 0 / post.totalVotes) * 100
    //                         }%`,
    //                       }}
    //                       className="h-4 bg-blue-500 rounded-full"
    //                     >
    //                       <span className="absolute inset-0 flex items-center justify-center text-white">
    //                         {`${Math.round(
    //                           (post.pollVotes
    //                             ? post.pollVotes[index]
    //                             : 0 / post.totalVotes) * 100
    //                         )}%`}
    //                       </span>
    //                     </div>
    //                   </div>
    //                 </div>
    //               ))
    //             ) : (
    //               <p className="text-gray-500 mt-3">
    //                 No poll options available.
    //               </p>
    //             )}
    //           </div>
    //         </div>
    //       </div>
    //     </div>
    //   );
    // }
    else if (post.type === "Media") {
      let userHasLiked;
      if (post.likes) {
        userHasLiked = post.likes.some((like) => like.userId === _id);
      }
      return (
        <div
          key={post._id}
          className="flex bg-white shadow-lg rounded-lg mx-4 md:mx-auto my-4 max-w-md md:max-w-2xl"
        >
          <div className="flex items-start px-4 py-6 w-full">
            <div className="flex-1">
              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <img
                    className="w-12 h-12 rounded-full object-cover mr-4 shadow"
                    src={post.userId.avatarUrl}
                    alt="Author's avatar"
                  />
                  <div>
                    <h2 className="text-lg text-gray-900">
                      {publicmethods.properCase(post.userId.name)}
                    </h2>
                    <small className="text-sm text-gray-700">
                      {publicmethods.formateTimeStamp(post.timeStamp)}
                    </small>
                  </div>
                </div>
              </div>

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
                  color={userHasLiked ? "error" : "default"}
                  onClick={() => void handleLike(post._id)}
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill={userHasLiked ? "currentColor" : "none"}
                    viewBox="0 0 24 24"
                    strokeWidth="1.5"
                    stroke="currentColor"
                    className="w-6 h-6"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12z"
                    />
                  </svg>
                </IconButton>
                <span className="text-xs text-gray-500 ml-1">
                  {post.likes?.length}
                </span>
                <IconButton
                  aria-label="send"
                  color="primary"
                  onClick={() => handleCommentIconClick(post._id)}
                >
                   <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-5 h-5">
  <path fillRule="evenodd" d="M3.43 2.524A41.29 41.29 0 0110 2c2.236 0 4.43.18 6.57.524 1.437.231 2.43 1.49 2.43 2.902v5.148c0 1.413-.993 2.67-2.43 2.902a41.202 41.202 0 01-5.183.501.78.78 0 00-.528.224l-3.579 3.58A.75.75 0 016 17.25v-3.443a41.033 41.033 0 01-2.57-.33C1.993 13.244 1 11.986 1 10.573V5.426c0-1.413.993-2.67 2.43-2.902z" clipRule="evenodd" />
</svg>
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
                    className="outline-none"
                    type="text"
                    placeholder="Add a comment..."
                      variant="standard"
                    size="small"
                    fullWidth
                    value={commentText}
                    onChange={(e) => void setCommentText(e.target.value)}
                  />
                  <IconButton
                    aria-label="send"
                    color="primary"
                    onClick={() => void handleCommentSubmit(post._id)}
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
                      <div className="flex items-start mt-2" key={comment._id}>
                        <img
                          className="w-8 h-8 rounded-full object-cover mr-2 shadow"
                          src={comment.userId.avatarUrl}
                          alt="Commenter's avatar"
                        />
                        <div className="flex-grow">
                          <div className="flex items-center justify-between">
                            <div>
                              <p className="text-gray-700 font-semibold">
                                {publicmethods.properCase(comment.userId.name)}
                              </p>
                              <p className="text-gray-700">{comment.content}</p>
                            </div>
                            <div className="text-gray-400 text-xs hidden md:block">
                              {publicmethods.formateTimeStamp(
                                comment.timeStamp
                              )}
                            </div>
                          </div>
                          <button
                            className="text-blue-500 hover:text-blue-700 mt-2"
                            onClick={() => void
                              handleLikeComment(comment._id, post._id)
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
          </div>
        </div>
      );
    }

    // Handle other post types (text, image, video, poll, etc.) here if needed

    return null; // Return null for unsupported post types
  };

  return (
    <div className="p-4 rounded-lg">
      {isLoading ? (
        <div className="flex items-start px-4 py-6 animate-pulse">
          <div className="w-12 h-12 rounded-full bg-gray-300 mr-4"></div>
          <div className="flex-1">
            <div className="w-1/4 h-4 bg-gray-300 mb-2"></div>
            <div className="w-3/4 h-4 bg-gray-300 mb-2"></div>
            <div className="w-full h-60 bg-gray-300 rounded-lg overflow-hidden mt-5"></div>
          </div>
        </div>
      ) : (
        posts.map((post) => renderPost(post))
      )}
    </div>
  );
}

export default Posts;
