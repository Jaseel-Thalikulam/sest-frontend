import { useEffect, useState } from 'react';
import { DataGrid, GridCellParams, GridColDef } from '@mui/x-data-grid';
import Button from '@mui/material/Button/Button';
import './CategoryManagementTable.scss';
import AddCategoryModal from '../../modal/AddCategoryModal';
import axiosInstance from '../../../interceptor/axiosInstance';
import AddCategoryForm from '../../form/AddCategory/AddCategoryForm';
import Loading from '../../../../common/Components/loadingComponent/Loading';
import ICategorydata from '../../../../interface/Icategory/IcategoryData';
import ICategoryResponse from '../../../../interface/Icategory/IcategoryResponse';
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
const CategoryManagemnetTable = () => {
  const [modalstate, setModal] = useState<boolean>(false);
  const [editmodalstate, setEditModal] = useState<boolean>(false);
  const [loading, setLoading] = useState(true);
  const [selectedCategory, setSelectedCategory] = useState<ICategorydata | null>(null);

  function handleModalOpenClose() {
    setModal(!modalstate);
  }

  function handleditModalOpenClose() {
    setEditModal(!editmodalstate);
  }

  const [categories, setCategories] = useState<ICategorydata[]>([]);

  async function handleButtonClick(categorydata: object) {
    if ('_id' in categorydata) {
      const id = categorydata._id;
      const response: { data: ICategoryResponse } = await axiosInstance.post('/unlistCategory', {
        id,
      });
      const updatedCategoryIndex = categories.findIndex((Category) => Category._id === id);
      const categoryDataFromBacKend = response.data.categorydata;
      if (updatedCategoryIndex !== -1) {
        const updatedcategories = [...categories];
        updatedcategories[updatedCategoryIndex].IsListed = categoryDataFromBacKend[0].IsListed;
        setCategories(updatedcategories);
      }
    }
  }

   function handleEditButtonClick(categorydata: ICategorydata) {
    if ('_id' in categorydata) {
      const id = categorydata._id;
      const selectedCategory = categories.find((category) => category._id === id);
      setSelectedCategory(selectedCategory);
      handleditModalOpenClose();
    }
  }

  const columns: GridColDef[] = [
    { field: 'Name', headerName: 'Name', width: 200 },
    { field: 'Description', headerName: 'Description', width: 500 },
    {
      field: 'isListed',
      headerName: 'IsListed',
      width: 200,
      renderCell: (params: GridCellParams<ICategorydata>) => {
        const data: ICategorydata = params.row;
        const IsListed: boolean = data.IsListed;
        return (
          <div>
            {IsListed}
            {IsListed ? 'True' : 'False'}
          </div>
        );
      },
    },
    {
      field: 'action',
      headerName: 'Action',
      width: 200,
      renderCell: (params: GridCellParams<ICategorydata>) => {
        const data: ICategorydata = params.row;
        const IsListed: boolean = data.IsListed;
        return (
          <div>
            {IsListed}
            {IsListed ? (
              <Button
                variant="outlined"
                color="primary"
                onClick={(event) => {
                  event.stopPropagation();
                  void handleButtonClick(params.row);
                }}
              >
                Unlist
              </Button>
            ) : (
              <Button
                variant="outlined"
                color="error"
                onClick={(event) => {
                  event.stopPropagation();
                  void handleButtonClick(params.row);
                }}
              >
                List
              </Button>
            )}
          </div>
        );
      },
    },
    {
      field: 'Edit',
      headerName: 'Edit',
      width: 200,
      renderCell: (params: GridCellParams<ICategorydata>) => {
        const data: ICategorydata = params.row;
        return (
          <div>
            <Button
              variant="outlined"
              color="primary"
              onClick={(event) => {
                event.stopPropagation();
                void handleEditButtonClick(params.row);
              }}
            >
              Edit
            </Button>
          </div>
        );
      },
    },
  ];

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response: { data: ICategoryResponse } = await axiosInstance.get(`/Categories`);
        setLoading(false);
        const categorydata = response.data.categorydata;
        setCategories(categorydata);
      } catch (error) {
        console.error('Error fetching users:', error);
      }
    };

    void fetchCategories();
  }, [categories]);

  const rows = categories;
  const getRowId = (row: ICategorydata) => row._id;

  return (
    <>
      <h1>Categories</h1>
      <div className="table-container">
        <Button style={{ marginBottom: '10px' }} variant="outlined" onClick={handleModalOpenClose}>
          Add Category
        </Button>
        {loading ? (
          <Loading />
        ) : (
          <DataGrid
            rows={rows}
            columns={columns}
            getRowId={getRowId}
            initialState={{
              pagination: {
                paginationModel: { page: 0, pageSize: 5 },
              },
            }}
            pageSizeOptions={[5, 10]}
          />
        )}
      </div>
      <AddCategoryModal data={"Add Category"} isOpen={modalstate} CloseModal={handleModalOpenClose}>
        <AddCategoryForm />
      </AddCategoryModal>
      <ToastContainer />
    </>
  );
};

export default CategoryManagemnetTable;
