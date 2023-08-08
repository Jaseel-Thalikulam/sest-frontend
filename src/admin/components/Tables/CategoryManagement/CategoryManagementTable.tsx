import {useEffect, useState} from 'react'
import { DataGrid, GridColDef } from '@mui/x-data-grid';
import Button from '@mui/material/Button/Button';
import './CategoryManagementTable.scss'
import AddCategoryModal from '../../modal/AddCategoryModal';
import axiosInstance from '../../../interceptor/axiosInstance';
import AddCategoryForm from '../../form/AddCategory/AddCategoryForm';
import Loading from '../../../../common/Components/loadingComponent/Loading';

  
const CategoryManagemnetTable = () => {
  
  const [modalstate, setModal] = useState<boolean>(false);
  const [loading, setLoading] = useState(true);
  function handleModalOpenClose() { 
    setModal(!modalstate);
  
  }

  const columns: GridColDef[] = [

    { field: 'Name', headerName: 'Name', width: 200 },
    { field: 'Description', headerName: 'Description', width:500 },

  ];

  type CategoryType = {
    _id: string; 
    name: string;
  };

  const [categories, setCategories] = useState<CategoryType[]>([]);

    useEffect(() => {
      // Function to fetch all users' data from the server
      const fetchCategories = async () => {
        try {
          const { data } = await axiosInstance.get(`/Categories`);
          
          setLoading(false)
               
          let categorydata = data.data
               
          setCategories(categorydata);
        } catch (error) {
          console.error('Error fetching users:', error);
        }
      };
  
      fetchCategories();
    }, [])
    
    

    const rows = categories
    const getRowId = (row: any) => row._id;

 

  return (
    <>
    
    <h1>Categories</h1>

      
              <div className="table-container">
                <Button style={{ marginBottom: '10px' }} variant='outlined' onClick={handleModalOpenClose}>Add Category</Button>     
         {loading ? (
           <Loading/>
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
      <AddCategoryForm/>
      </AddCategoryModal>
     
  </>
    )
    
}

  export default CategoryManagemnetTable
