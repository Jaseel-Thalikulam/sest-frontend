import { useMediaQuery } from "@mui/material";
import { Link } from "react-router-dom";
const BASE_URL: string = import.meta.env.VITE_FRONTEND_BASE_URL as string;
function TeachWithUs() {
  const isScreenLargerThan400px = useMediaQuery("(min-width: 401px)");
  const isScreenSmallerThan950px = useMediaQuery("(max-width: 949px)");

  return (
    <>
      <div
        className={`bg-1C1D1F h-28 text-white p-4 ${
          isScreenSmallerThan950px
            ? "mt-80"
            : isScreenLargerThan400px
            ? "mt-80"
            : ""
        } `}
      >
        <div
          className={`${
            isScreenLargerThan400px
              ? "ml-48 mr-48 flex justify-between items-center pb-2"
              : "flex flex-col text-center "
          } border rounded  border-white h-full pl-10 pt-2 pb-2`}
        >
          <div>
            <h1 className="text-xl">Teach with us</h1>
            <h6 className="text-sm m-2">Empower the Future Generation</h6>
          </div>
          <Link to={`${BASE_URL}/welcome/educator`}>
            <div className="border-2 boreder-white m-5 p-3 rounded cursor-pointer">
              <button>Get started</button>
            </div>
          </Link>
        </div>
      </div>
    </>
  );
}

export default TeachWithUs;
