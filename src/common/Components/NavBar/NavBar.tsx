import {useState } from "react";
import "./NavBar.scss";
import { IconButton } from "@mui/material";
import { Link, useNavigate } from "react-router-dom";
import {axiosInstance} from "../../interceptor/axiosInstance";
import { Chip } from "@mui/material";
import { useSelector } from "react-redux";
import { RootStateType } from "../../../redux/store";
import PublicMethods from "../../../Methods/PublicMethods";
import { ISearchAPI, ISearchData } from "../../../interface/IsearchAPi/ISearchAPI";
import ErrorBoundary from "../errorBoundary/ErrorBoundary";
import Logo from "../../../../public/images/mini-logo.jpg"
function  NavBar() {
  const navigate = useNavigate();
  const [searchInput, setSearchQuery] = useState("");
  const [selectedOption, setSelectedOption] = useState("Tutor");
  const [showOptions, setShowOptions] = useState(false);
  const [searchResults, setSearchResults] = useState<ISearchData[]>([]);
  const data = useSelector((state: RootStateType) => state.user);
  const { _id } = data;
  const publicmethod = new PublicMethods();
  const handleToggleOptions = () => {
    setShowOptions(!showOptions);
  };

  function handleOptionClick(selectedfilter: string) {
    setSelectedOption(selectedfilter);
    setShowOptions(false);
  }

  function handleMessagesNavigate() {
    const currentPath = window.location.pathname;
    if (localStorage.getItem("jwt-learn")) {
      if (currentPath !== "/learn/message") {
        navigate("/learn/message");
      }
    } else if (localStorage.getItem("jwt-lead")) {
      if (currentPath !== "/lead/message") {
        navigate("/lead/message");
      }
    }
  }
  async function handleSearch(searchQuery: string) {
    setSearchQuery(searchQuery);

      const response:{data:ISearchAPI} = await axiosInstance.get("/search", {
        params: {
          searchInput: searchQuery,
          option: selectedOption,
        },
      });

      setSearchResults(response.data.Data);
   
  }

 function handleLogoClick(){
   if (localStorage.getItem('jwt-learn')) {
  navigate('/learn')
     
   } else if (localStorage.getItem('jwt-lead')) {
     
  navigate('/lead')
     
}
  }

  return (
    <>
      <ErrorBoundary>

      <div id="drawer-container" className="top-0 sticky z-30">
        <div className="sticky top-0 bg-white border-b border-gray-300 flex justify-between items-center">
          <div className="container mx-auto">
            <div className="flex items-center justify-between p-4">
              <div className="logo-container" onClick={()=>(void handleLogoClick())}>
                <img src={Logo} alt="Logo" className="h-8" />
              </div>

              {/* Search bar */}
              <div className="md:flex-1 flex items-center sm:ml-0 pl-44">
                <div className=" rounded-xl p-2 flex border ">
                  {" "}
                  {/* Adjusted border color and radius */}
                  <IconButton disableRipple>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 24 24"
                      fill="currentColor"
                      className="w-6 h-6"
                    >
                      <path
                        fillRule="evenodd"
                        d="M10.5 3.75a6.75 6.75 0 100 13.5 6.75 6.75 0 000-13.5zM2.25 10.5a8.25 8.25 0 1114.59 5.28l4.69 4.69a.75.75 0 11-1.06 1.06l-4.69-4.69A8.25 8.25 0 012.25 10.5z"
                        clipRule="evenodd"
                      />
                    </svg>
                  </IconButton>
                  <input
                    type="text"
                    className="bg-white outline-none text-gray-500 flex-grow rounded-xl  hover:bg-gray-200"
                    placeholder="Search..."
                    value={searchInput}
                    onChange={(e) => void handleSearch(e.target.value)}
                  />
                  <div className="relative">
                    <button
                      onClick={() =>void handleToggleOptions()}
                      onChange={() =>void handleSearch(searchInput)}
                      className={`ml-2 text-gray-600 p-2 rounded-full hover:bg-gray-300 hover:text-gray-700 options-container`}
                    >
                      {selectedOption}
                    </button>
                    {showOptions && (
                      <div className="z-20 w-80  top-full ">
                        <ul
                          className="absolute left-2 w-56 h-44 p-2 rounded-lg shadow-lg bg-white options-container space-y-4"
                          style={{ zIndex: 0 }}
                        >
                          {/* Options content */}
                          <li className="m-1 text-gray-100">
                            <button
                              className="flex items-start flex-col text-gray-700 hover:text-8A3FFC"
                              onClick={() => handleOptionClick("Tutor")}
                            >
                              <div className="flex items-center space-x-2">
                                <svg
                                  xmlns="http://www.w3.org/2000/svg"
                                  fill="none"
                                  viewBox="0 0 24 24"
                                  stroke-width="1.5"
                                  stroke="currentColor"
                                  className="w-6 h-6"
                                  >
                                  <path
                                    stroke-linecap="round"
                                    stroke-linejoin="round"
                                    d="M15 19.128a9.38 9.38 0 002.625.372 9.337 9.337 0 004.121-.952 4.125 4.125 0 00-7.533-2.493M15 19.128v-.003c0-1.113-.285-2.16-.786-3.07M15 19.128v.106A12.318 12.318 0 018.624 21c-2.331 0-4.512-.645-6.374-1.766l-.001-.109a6.375 6.375 0 0111.964-3.07M12 6.375a3.375 3.375 0 11-6.75 0 3.375 3.375 0 016.75 0zm8.25 2.25a2.625 2.625 0 11-5.25 0 2.625 2.625 0 015.25 0z"
                                    />
                                </svg>

                                <span>Tutor</span>
                              </div>
                              <span className="text-xs font-sans pl-8">
                                Unlock Your Learning Potential
                              </span>
                            </button>
                          </li>

                          <li className="m-1">
                            <button
                              className="flex items-start flex-col text-gray-700 hover:text-8A3FFC"
                              onClick={() => handleOptionClick("Student")}
                            >
                              <div className="flex items-center space-x-2">
                                <svg
                                  xmlns="http://www.w3.org/2000/svg"
                                  fill="none"
                                  viewBox="0 0 24 24"
                                  stroke-width="1.5"
                                  stroke="currentColor"
                                  className="w-6 h-6 "
                                  >
                                  <path
                                    stroke-linecap="round"
                                    stroke-linejoin="round"
                                    d="M4.26 10.147a60.436 60.436 0 00-.491 6.347A48.627 48.627 0 0112 20.904a48.627 48.627 0 018.232-4.41 60.46 60.46 0 00-.491-6.347m-15.482 0a50.57 50.57 0 00-2.658-.813A59.905 59.905 0 0112 3.493a59.902 59.902 0 0110.399 5.84c-.896.248-1.783.52-2.658.814m-15.482 0A50.697 50.697 0 0112 13.489a50.702 50.702 0 017.74-3.342M6.75 15a.75.75 0 100-1.5.75.75 0 000 1.5zm0 0v-3.675A55.378 55.378 0 0112 8.443m-7.007 11.55A5.981 5.981 0 006.75 15.75v-1.5"
                                  />
                                </svg>

                                <span>Student</span>
                              </div>
                              <span className="text-xs font-sans pl-8">
                                Explore, Learn, Succeed
                              </span>
                            </button>
                          </li>
                          <li className="m-1">
                            <button
                              className="flex items-start flex-col text-gray-700 hover:text-8A3FFC"
                              onClick={() => handleOptionClick("Playlist")}
                            >
                              <div className="flex items-center space-x-2">
                                <svg
                                  xmlns="http://www.w3.org/2000/svg"
                                  fill="none"
                                  viewBox="0 0 24 24"
                                  stroke-width="1.5"
                                  stroke="currentColor"
                                  className="w-6 h-6"
                                >
                                  <path
                                    stroke-linecap="round"
                                    stroke-linejoin="round"
                                    d="M20.25 6.375c0 2.278-3.694 4.125-8.25 4.125S3.75 8.653 3.75 6.375m16.5 0c0-2.278-3.694-4.125-8.25-4.125S3.75 4.097 3.75 6.375m16.5 0v11.25c0 2.278-3.694 4.125-8.25 4.125s-8.25-1.847-8.25-4.125V6.375m16.5 0v3.75m-16.5-3.75v3.75m16.5 0v3.75C20.25 16.153 16.556 18 12 18s-8.25-1.847-8.25-4.125v-3.75m16.5 0c0 2.278-3.694 4.125-8.25 4.125s-8.25-1.847-8.25-4.125"
                                  />
                                </svg>

                                <span>Course</span>
                              </div>
                              <span className="text-xs font-sans pl-8">
                                Your Learning Journey, Sorted
                              </span>
                            </button>
                          </li>
                        </ul>
                      </div>
                    )}
                  </div>
                </div>

                {searchInput && searchResults.length > 0 && (
                  <div className="absolute left-35 w-56 top-20 mt-2 p-2 bg-white border border-gray-300 rounded-lg shadow-lg">
                    {searchResults.map((result: ISearchData, index) => (
                      <div key={index} className="p-2 hover:bg-gray-200">
                   <Link to={`user/${result._id}`} className="flex items-center space-x-2">
                        <div className="flex items-center">
                        
                          <img
                            src={result.avatarUrl} 
                            alt="Avatar"
                            className="w-8 h-8 rounded-full mr-2"
                          />

                      
                          <div>
                            <div
                              className={`text-md${
                                result._id === _id ? " text-sm" : ""
                              }`}
                            >
                              {publicmethod.properCase(result.name)}
                              {result._id === _id && (
                                <Chip
                                  label="You"
                                  color="primary"
                                  variant="outlined"
                                  className="ml-2" 
                                />
                              )}
                            </div>
                            <div className="text-gray-500 text-sm">
                              {result.username}
                            </div>
                          </div>
                          </div>
                          </Link>
                      </div>
                    ))}
                  </div>
                )}
              </div>

              <div className="hidden md:flex space-x-4">
                <IconButton
                  onClick={() => void handleMessagesNavigate()}
                  className="transition-colors  hover:text-white hover:bg-blue-600"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth="1.5"
                    stroke="currentColor"
                    className="w-6 h-6"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-1.07 1.916l-7.5 4.615a2.25 2.25 0 01-2.36 0L3.32 8.91a2.25 2.25 0 01-1.07-1.916V6.75"
                    />
                  </svg>
                </IconButton>
              </div>
            </div>
          </div>
        </div>
      </div>
                    </ErrorBoundary>
    </>
  );
}

export default NavBar;
