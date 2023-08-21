import React, { useEffect, useState } from "react";

function Posts() {
  const [isLoading, setIsLoading] = useState(true);
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    // Simulate fetching posts from an API
    setTimeout(() => {
      const fetchedPosts = [
        {
          id: 1,
          author: "Brad Adams",
          timestamp: "22h ago",
          content:
            "Joined 12 SEP 2012. Lorem ipsum, dolor sit amet conse. Saepe optio minus rem dolor sit amet!",
          likes: 12,
          comments: 8,
          shares: "share",
          avatar:
            "https://images.unsplash.com/photo-1542156822-6924d1a71ace?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=500&q=60",
          type: "text",
        },
        {
          id: 2,
          author: "Emma Johnson",
          timestamp: "15h ago",
          image:
            "https://images.unsplash.com/photo-1542156822-6924d1a71ace?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=500&q=60",
          likes: 23,
          comments: 15,
          shares: "share",
          avatar:
            "https://images.unsplash.com/photo-1542156822-6924d1a71ace?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=500&q=60",
          type: "image",
        },
        // Add more post objects here
      ];
      setPosts(fetchedPosts);
      setIsLoading(false);
    }, 2000); // Simulated 2 seconds delay
  }, []);

  return (
    <div className="p-4 rounded-lg">
      {isLoading ? (
        // <div className="flex bg-white shadow-lg rounded-lg mx-4 md:mx-auto my-4 max-w-md md:max-w-2xl">
          <div className="flex items-start px-4 py-6 animate-pulse">
            <div className="w-12 h-12 rounded-full bg-gray-300 mr-4"></div>
            <div className="flex-1">
              <div className="w-1/4 h-4 bg-gray-300 mb-2"></div>
              <div className="w-3/4 h-4 bg-gray-300 mb-2"></div>
              <div className="w-full h-60 bg-gray-300 rounded-lg overflow-hidden mt-5"></div>
            </div>
          </div>
        // </div>
      ) : (
        posts.map((post) => (
          <div
            key={post.id}
            className="flex bg-white shadow-lg rounded-lg mx-4 md:mx-auto my-4 max-w-md md:max-w-2xl"
          >
            {post.type === "text" ? (
              <div className="flex items-start px-4 py-6">
                <img
                  className="w-12 h-12 rounded-full object-cover mr-4 shadow"
                  src={post.avatar}
                  alt="avatar"
                />
                <div className="">
                  <div className="flex items-center justify-between">
                    <h2 className="text-lg font-semibold text-gray-900 -mt-1">
                      {post.author}
                    </h2>
                    <small className="text-sm text-gray-700">
                      {post.timestamp}
                    </small>
                  </div>
                  <p className="text-gray-700">{post.content}</p>
                  <div className="mt-4 flex items-center">
                    <div className="flex mr-2 text-gray-700 text-sm mr-3">
                      <svg
                        fill="none"
                        viewBox="0 0 24 24"
                        className="w-4 h-4 mr-1"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0"
                        />
                      </svg>
                      <span>{post.likes}</span>
                    </div>
                    <div className="flex mr-2 text-gray-700 text-sm mr-3">
                      <svg
                        fill="none"
                        viewBox="0 0 24 24"
                        className="w-4 h-4 mr-1"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M17 8h2a2 2 0 012 2v6a2 2 0 01-2 2h-2v4l-4-4H9a1.994 1.994 0 01-1.414-.586m0 0L11 14h4a2 2 0 002 2V6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2v4l.586-.586z"
                        />
                      </svg>
                      <span>{post.comments}</span>
                    </div>
                    <div className="flex mr-2 text-gray-700 text-sm mr-4">
                      <svg
                        fill="none"
                        viewBox="0 0 24 24"
                        className="w-4 h-4 mr-1"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12"
                        />
                      </svg>
                      <span>{post.shares}</span>
                    </div>
                  </div>
                </div>
              </div>
            ) : (
              <div className="flex items-start px-4 py-6">
                <img
                  className="w-12 h-12 rounded-full object-cover mr-4 shadow"
                  src={post.avatar}
                  alt="avatar"
                />
                <div className="">
                  <div className="flex items-center justify-between">
                    <h2 className="text-lg font-semibold text-gray-900 -mt-1">
                      {post.author}
                    </h2>
                    <small className="text-sm text-gray-700">
                      {post.timestamp}
                    </small>
                  </div>
                  <div className="w-full h-60 rounded-lg overflow-hidden mt-5 items-center">
                    <img
                      src={post.image}
                      alt="post-image"
                      className="object-cover w-full h-full"
                    />
                  </div>
                  <div className="mt-4 flex items-center">
                    {/* ... (other icons or UI elements) */}
                  </div>
                </div>
              </div>
            )}
          </div>
        ))
      )}
    </div>
  );
}

export default Posts;
