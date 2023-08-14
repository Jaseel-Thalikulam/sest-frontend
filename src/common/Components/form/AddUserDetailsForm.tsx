import { useEffect, useState } from "react";
import Chip from "@mui/material/Chip";
import Stack from "@mui/material/Stack";
import DoneIcon from "@mui/icons-material/Done";
import DeleteIcon from "@mui/icons-material/Delete";
import { Form } from "react-bootstrap";
import "./AddUserDetailsForm.scss";
import { Button } from "@mui/material";
import { useDispatch } from "react-redux";
import { UserDetails } from "../../../redux/userSlice/UserSlice";
import { RootStateType } from "../../../redux/store";
import { useSelector } from "react-redux";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import APIResponse from "../../../interface/IaddUserDetails/IaddUserDetails";
import APICategoryResponse from "../../../interface/Icategory/Icategory";
import ICategoryResponse from "../../../interface/Icategory/IcategoryResponse";
import ICategorydata from "../../../interface/Icategory/IcategoryData";
import axiosInstanceTutor from "../../../tutor/interceptor/axiosInstanceTutor";
import axiosInstanceStudent from "../../../student/interceptor/axiosInstance.Student";

function AddUserDetailsForm() {
  const data = useSelector((state: RootStateType) => state.user);
  const dispatch = useDispatch();
  function toProperCase(str: string) {
    return str.replace(
      /\w\S*/g,
      (txt: string) => txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase()
    );
  }

  const { name, email, phoneNumber, role, about, URLs, _id, DOB, tags } = data;

  const Email = toProperCase(email);
  const Name = toProperCase(name);
  const Role = toProperCase(role);

  const [Number, setPhone] = useState(phoneNumber ? phoneNumber : "");
  const [About, setAbout] = useState(about ? about : "");
  const [dob, setDOB] = useState(DOB ? DOB : "");
  const [githuburl, setgithub] = useState(URLs.github ? URLs.github : "");
  const [linkedinurl, setlinkedin] = useState(
    URLs.linkedin ? URLs.linkedin : ""
  );
  const [pinteresturl, setpinterest] = useState(
    URLs.pinterest ? URLs.pinterest : ""
  );
  const [Category, setCategories] = useState<ICategorydata[]>([]);
  const tagIds = tags.map((tag) => tag._id);

  const handleAdd = async (categoryId: string) => {
    const { data } = await axiosInstanceTutor.post<APICategoryResponse>(
      "/insertCategory",
      {
        categoryId,
        userId: _id,
      }
    );

    const { message, success, tutordata } = data;

    if (success) {
      const URLs = tutordata.URLs;

      if (URLs) {
        dispatch(
          UserDetails({
            role: tutordata.role,
            name: tutordata.name,
            email: tutordata.email,
            username: tutordata.username,
            phoneNumber: tutordata.phoneNumber,
            DOB: tutordata.DOB,
            _id: tutordata._id,
            about: tutordata.about,
            isBanned: tutordata.isBanned,
            URLs: {
              github: URLs.github,
              linkedin: URLs.linkedin,
              pinterest: URLs.pinterest,
            },
            tags: tutordata.tags,
            avatarUrl: tutordata.avatarUrl,
          })
        );
      } else {
        dispatch(
          UserDetails({
            role: tutordata.role,
            name: tutordata.name,
            email: tutordata.email,
            username: tutordata.username,
            phoneNumber: tutordata.phoneNumber,
            DOB: tutordata.DOB,
            _id: tutordata._id,
            about: tutordata.about,
            isBanned: tutordata.isBanned,
            URLs: {
              github: "",
              linkedin: "",
              pinterest: "",
            },
            tags: tutordata.tags,
            avatarUrl: tutordata.avatarUrl,
          })
        );
      }
      toast.success(message);
    } else {
      toast.error(message);
    }
  };

  const handleDelete = async (categoryId: string) => {
    const { data } = await axiosInstanceTutor.post<APICategoryResponse>(
      "/removeCategory",
      {
        categoryId,
        userId: _id,
      }
    );

    const { success, message, tutordata } = data;

    if (success) {
      if (URLs) {
        dispatch(
          UserDetails({
            role: tutordata.role,
            name: tutordata.name,
            email: tutordata.email,
            username: tutordata.username,
            phoneNumber: tutordata.phoneNumber,
            DOB: tutordata.DOB,
            _id: tutordata._id,
            about: tutordata.about,
            isBanned: tutordata.isBanned,
            URLs: {
              github: URLs.github,
              linkedin: URLs.linkedin,
              pinterest: URLs.pinterest,
            },
            tags: tutordata.tags,
            avatarUrl: tutordata.avatarUrl,
          })
        );
      } else {
        dispatch(
          UserDetails({
            role: tutordata.role,
            name: tutordata.name,
            email: tutordata.email,
            username: tutordata.username,
            phoneNumber: tutordata.phoneNumber,
            DOB: tutordata.DOB,
            _id: tutordata._id,
            about: tutordata.about,
            isBanned: tutordata.isBanned,
            URLs: {
              github: "",
              linkedin: "",
              pinterest: "",
            },
            tags: tutordata.tags,
            avatarUrl: tutordata.avatarUrl,
          })
        );
      }
      toast.success(message);
    } else {
      toast.error(message);
    }
  };

  async function handleSubmit(): Promise<void> {
    if (DOB !== "" && null) {
      const currentDate = new Date();
      const userDOB = new Date(dob);
      const ageDifferenceInMilliseconds =
        currentDate.getTime() - userDOB.getTime();
      const minimumAgeInMilliseconds = 18 * 365 * 24 * 60 * 60 * 1000;

      if (ageDifferenceInMilliseconds < minimumAgeInMilliseconds) {
        toast.error("You must be at least 18 years old.");
        return;
      }
    }

    // Validate URLs
    const urlPattern = /^(ftp|http|https):\/\/[^ "]+$/;
    if (githuburl && !urlPattern.test(githuburl)) {
      toast.error("Invalid GitHub URL");
      return;
    }
    if (linkedinurl && !urlPattern.test(linkedinurl)) {
      toast.error("Invalid LinkedIn URL.");
      return;
    }
    if (pinteresturl && !urlPattern.test(pinteresturl)) {
      toast.error("Invalid Pinterest URL.");
      return;
    }

    // Validate Phone Number
    const phonePattern = /^[0-9]{10}$/;
    if (!phonePattern.test(Number) && Number != "") {
      toast.error("Invalid phone number. Phone number should be 10 digits.");
      return;
    }

    let data;
    try {
      if (role == "Learn") {
        const response = await axiosInstanceStudent.post<APIResponse>(
          "/editprofile",
          {
            Number,
            About,
            githuburl,
            linkedinurl,
            pinteresturl,
            DOB,
            _id,
          }
        );
        data = response.data;
      } else if (role == "Lead") {
        const response = await axiosInstanceTutor.post<APIResponse>(
          "/editprofile",
          {
            Number,
            About,
            githuburl,
            linkedinurl,
            pinteresturl,
            DOB,
            _id,
          }
        );
        data = response.data;
      }

      if (data) {
        const { message, success, userData } = data;

        console.log(data);

        if (success) {
          setPhone(userData.phoneNumber ? userData.phoneNumber : "");
          setAbout(userData.about ? userData.about : "");
          if (userData.URLs !== undefined) {
            setgithub(userData.URLs.github ? userData.URLs.github : "");
            setlinkedin(userData.URLs.linkedin ? userData.URLs.linkedin : "");
            setpinterest(
              userData.URLs.pinterest ? userData.URLs.pinterest : ""
            );
          }

          const URLs = userData.URLs;
          if (URLs) {
            dispatch(
              UserDetails({
                role: userData.role,
                name: userData.name,
                email: userData.email,
                username: userData.username,
                phoneNumber: userData.phoneNumber,
                DOB: userData.DOB,
                _id: userData._id,
                about: userData.about,
                isBanned: userData.isBanned,
                URLs: {
                  github: URLs.github,
                  linkedin: URLs.linkedin,
                  pinterest: URLs.pinterest,
                },
                tags: userData.tags,
                avatarUrl: userData.avatarUrl,
              })
            );
          } else {
            dispatch(
              UserDetails({
                role: userData.role,
                name: userData.name,
                email: userData.email,
                username: userData.username,
                phoneNumber: userData.phoneNumber,
                DOB: userData.DOB,
                _id: userData._id,
                about: userData.about,
                isBanned: userData.isBanned,
                URLs: {
                  github: "",
                  linkedin: "",
                  pinterest: "",
                },
                tags: userData.tags,
                avatarUrl: userData.avatarUrl,
              })
            );
          }
          toast.success(message);
        } else {
          toast.error(message);
        }
      }
    } catch (error) {
      console.log(error);
      toast.error("Error saving user details.");
    }
  }

  useEffect(() => {
      if (role == "Lead") {
      const fetchCategories = async () => {
        try {
          const response: { data: ICategoryResponse } =
            await axiosInstanceTutor.get("/getCategories");
          const Category = response.data.categorydata;

          setCategories(Category);
        } catch (error) {
          console.error("Error fetching users:", error);
        }
      };

      void fetchCategories();
    }
    });

  return (
    <div className="col-12">
      <div className="card mb-4">
        <div className="card-body">
          <Form>
            <div className="row mb-3">
              <Form.Label
                className="col-sm-2 col-form-label"
                htmlFor="basic-icon-default-fullname"
              >
                Name
              </Form.Label>
              <div className="col-sm-10">
                <div className="input-group input-group-merge">
                  <span
                    id="basic-icon-default-fullname2"
                    className="input-group-text"
                  >
                    <i className="bx bx-user"></i>
                  </span>
                  <Form.Control
                    type="text"
                    id="basic-icon-default-fullname"
                    placeholder="John Doe"
                    aria-label="John Doe"
                    aria-describedby="basic-icon-default-fullname2"
                    value={Name}
                    readOnly
                  />
                </div>
              </div>
            </div>
            <div className="row mb-3">
              <Form.Label
                className="col-sm-2 col-form-label"
                htmlFor="basic-icon-default-company"
              >
                Role
              </Form.Label>
              <div className="col-sm-10">
                <div className="input-group input-group-merge">
                  <span
                    id="basic-icon-default-company2"
                    className="input-group-text"
                  >
                    <i className="bx bx-buildings"></i>
                  </span>
                  <Form.Control
                    type="text"
                    id="basic-icon-default-company"
                    placeholder="ACME Inc."
                    aria-label="ACME Inc."
                    aria-describedby="basic-icon-default-company2"
                    value={Role}
                    readOnly
                  />
                </div>
              </div>
            </div>
            <div className="row mb-3">
              <Form.Label
                className="col-sm-2 col-form-label"
                htmlFor="basic-icon-default-email"
              >
                Email
              </Form.Label>
              <div className="col-sm-10">
                <div className="input-group input-group-merge">
                  <span className="input-group-text">
                    <i className="bx bx-envelope"></i>
                  </span>
                  <Form.Control
                    type="text"
                    id="basic-icon-default-email"
                    placeholder="john.doe"
                    aria-label="Your Email Here"
                    value={Email}
                    aria-describedby="basic-icon-default-email2"
                    readOnly
                  />
                </div>
              </div>
            </div>
            <div className="row mb-3">
              <Form.Label
                className="col-sm-2 form-label"
                htmlFor="basic-icon-default-phone"
              >
                Phone No
              </Form.Label>
              <div className="col-sm-10">
                <div className="input-group input-group-merge">
                  <span
                    id="basic-icon-default-phone2"
                    className="input-group-text"
                  >
                    <i className="bx bx-phone"></i>
                  </span>

                  <Form.Control
                    type="number"
                    id="basic-icon-default-phone"
                    className="form-control phone-mask"
                    placeholder="Your contact Number Here"
                    aria-label="Your contact Number Here"
                    aria-describedby="basic-icon-default-phone2"
                    maxLength={10}
                    value={Number}
                    onChange={(e) => setPhone(e.target.value)}
                  />
                </div>
              </div>
            </div>
            <div className="row mb-3">
              <Form.Label
                className="col-sm-2 form-label"
                htmlFor="basic-icon-default-message"
              >
                About
              </Form.Label>
              <div className="col-sm -10">
                <div className="input-group input-group-merge">
                  <span
                    id="basic-icon-default-message2"
                    className="input-group-text"
                  >
                    <i className="bx bx-comment"></i>
                  </span>
                  <Form.Control
                    as="textarea"
                    id="basic-icon-default-message"
                    placeholder="Fill Up Your About"
                    aria-label="Fill Up Your About"
                    aria-describedby="basic-icon-default-message2"
                    value={About}
                    onChange={(e) => setAbout(e.target.value)}
                  />
                </div>
              </div>
            </div>

            <div className="row mb-3">
              <Form.Label
                className="col-sm-2 form-label"
                htmlFor="basic-icon-default-message"
              >
                D.O.B
              </Form.Label>
              <div className="col-sm-10">
                <div className="input-group input-group-merge">
                  <span
                    id="basic-icon-default-message2"
                    className="input-group-text"
                  >
                    <i className="bx bx-comment"></i>
                  </span>
                  <Form.Control
                    type="date"
                    className="form-control"
                    placeholder="Your Pinterest URL"
                    id="basic-url1"
                    aria-describedby="basic-addon14"
                    value={dob}
                    onChange={(e) => setDOB(e.target.value)}
                  />
                </div>
              </div>
            </div>

            <div className="row mb-3">
              <Form.Label
                className="col-sm-2 form-label"
                htmlFor="basic-icon-default-message"
              >
                GitHub
              </Form.Label>
              <div className="col-sm-10">
                <div className="input-group input-group-merge">
                  <span
                    id="basic-icon-default-message2"
                    className="input-group-text"
                  >
                    <i className="bx bx-comment"></i>
                  </span>
                  <Form.Control
                    type="text"
                    className="form-control"
                    placeholder="Your GitHub URL"
                    id="basic-url1"
                    aria-describedby="basic-addon14"
                    value={githuburl}
                    onChange={(e) => setgithub(e.target.value)}
                  />
                </div>
              </div>
            </div>
            <div className="row mb-3">
              <Form.Label
                className="col-sm-2 form-label"
                htmlFor="basic-icon-default-message"
              >
                Linkedin
              </Form.Label>
              <div className="col-sm-10">
                <div className="input-group input-group-merge">
                  <span
                    id="basic-icon-default-message2"
                    className="input-group-text"
                  >
                    <i className="bx bx-comment"></i>
                  </span>
                  <Form.Control
                    type="text"
                    className="form-control"
                    placeholder="Your LinkedIn URL"
                    id="basic-url1"
                    aria-describedby="basic-addon14"
                    value={linkedinurl}
                    onChange={(e) => setlinkedin(e.target.value)}
                  />
                </div>
              </div>
            </div>
            <div className="row mb-3">
              <Form.Label
                className="col-sm-2 form-label"
                htmlFor="basic-icon-default-message"
              >
                Pinterest
              </Form.Label>
              <div className="col-sm-10">
                <div className="input-group input-group-merge">
                  <span
                    id="basic-icon-default-message2"
                    className="input-group-text"
                  >
                    <i className="bx bx-comment"></i>
                  </span>
                  <Form.Control
                    type="text"
                    className="form-control"
                    placeholder="Your Pinterest URL"
                    id="basic-url1"
                    aria-describedby="basic-addon14"
                    value={pinteresturl}
                    onChange={(e) => setpinterest(e.target.value)}
                  />
                </div>
              </div>
            </div>

            {role === "Lead" && (
              <div className="row mb-3">
                <Form.Label
                  className="col-sm-2 form-label"
                  htmlFor="basic-icon-default-message"
                >
                  Tags
                </Form.Label>
                <div className="col-sm-10">
                  <div className="input-group input-group-merge">
                    <Stack spacing={1}>
                      {tags.map((tag) => (
                        <Chip
                          key={tag._id}
                          label={tag.Name}
                          onDelete={() => void handleDelete(tag._id)}
                          deleteIcon={<DeleteIcon />}
                          variant="outlined"
                        />
                      ))}

                      {Category.map((category) => {
                        if (
                          !tagIds.includes(category._id) &&
                          category.IsListed
                        ) {
                          return (
                            <Chip
                              key={category._id}
                              label={category.Name}
                              onDelete={() => void handleAdd(category._id)}
                              deleteIcon={<DoneIcon />}
                            />
                          );
                        }
                        return null;
                      })}
                    </Stack>
                  </div>
                </div>
              </div>
            )}

            <div className="row justify-content-end">
              <div className="col-sm-10">
                <Button
                  type="button"
                  onClick={() => void handleSubmit()}
                  variant="text"
                >
                  Save
                </Button>
              </div>
            </div>
          </Form>
        </div>
      </div>
      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
      />
    </div>
  );
}

export default AddUserDetailsForm;
