import { useState, useEffect, SetStateAction, Dispatch } from "react";
import { Form } from "react-bootstrap";
import { Button } from "@mui/material";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axiosInstance from "../../../interceptor/axiosInstance";
import "bootstrap/dist/css/bootstrap.min.css";
import ICategorydata from "../../../../interface/Icategory/IcategoryData";

interface EditCategoryFormProps {
    selectedCategory: ICategorydata | null;
    setCategory: Dispatch<SetStateAction<ICategorydata[]>>
    categories: ICategorydata[]
    CloseModal: () => void;
}

function EditCategoryForm({ selectedCategory,setCategory,categories ,CloseModal}: EditCategoryFormProps) {
  const [formData, setFormData] = useState({
    Name: selectedCategory ? selectedCategory.Name : "",
    Description: selectedCategory ? selectedCategory.Description : "",
  });

  useEffect(() => {
    setFormData({
      Name: selectedCategory ? selectedCategory.Name : "",
      Description: selectedCategory ? selectedCategory.Description : "",
    });
  }, [selectedCategory]);

  const { Name, Description } = formData;

  async function handleSubmit() {
    const letterCount = Description.replace(/\s+/g, "").length;
    if (!Name || !Description) {
      toast.error("Please provide both Name and Description.");
      return;
    } else if (/\d/.test(Name)) {
      toast.error("Name should not contain numbers.");
      return;
    } else if (/\d/.test(Description)) {
      toast.error("Description should not contain numbers.");
      return;
    } else if (letterCount < 15) {
      toast.error("Description should have a minimum of 15 letters.");
      return;
    }

    try {
      // Update the category on the server
      console.log(Name, Description);
      const response = await axiosInstance.post("/updateCategory", {
        Name,
        Description,
        categoryId: selectedCategory?._id,
      });

        const { success, message, data } = response.data;
        
        if (success) {
        const categoryIndex = categories.findIndex((category) => category._id === selectedCategory?._id);
            console.log(data)
            
            if (categoryIndex !== -1) {
                const updatedCategories = [...categories];
        
                updatedCategories[categoryIndex] = {
                  ...updatedCategories[categoryIndex],
        
                  Name: response.data.data.Name,
                  Description: response.data.data.Description,
                };
        
                console.log(updatedCategories,"updated category")
                setCategory(updatedCategories);
              }

            setCategory(data)
            CloseModal()
        toast.success(message);
      } else {
        toast.error(message);
      }
    } catch (error) {
      console.error(error);
      toast.error("Error saving Category");
    }
  }

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
                    placeholder="Name"
                    aria-label="Name"
                    aria-describedby="basic-icon-default-fullname2"
                    value={Name}
                    onChange={(e) =>
                      setFormData({ ...formData, Name: e.target.value })
                    }
                  />
                </div>
              </div>
            </div>
            <div className="row mb-3">
              <Form.Label
                className="col-sm-2 form-label"
                htmlFor="basic-icon-default-message"
              >
                Description
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
                    as="textarea"
                    id="basic-icon-default-message"
                    placeholder="Description"
                    aria-label="Description"
                    aria-describedby="basic-icon-default-message2"
                    value={Description}
                    onChange={(e) =>
                      setFormData({ ...formData, Description: e.target.value })
                    }
                  />
                </div>
              </div>
            </div>

            <div className="row justify-content-end">
              <div className="col-sm-10">
                <Button type="button" onClick={handleSubmit} variant="text">
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
        pauseOnFocusLoss
        draggable
      />
    </div>
  );
}

export default EditCategoryForm;
