import {useEffect, useState} from 'react'
import { DataGrid, GridCellParams, GridColDef } from '@mui/x-data-grid';
import Button from '@mui/material/Button/Button';
import './CategoryManagementTable.scss'
import AddCategoryModal from '../../modal/AddCategoryModal';
import axiosInstance from '../../../interceptor/axiosInstance';
import AddCategoryForm from '../../form/AddCategory/AddCategoryForm';
import Loading from '../../../../common/Components/loadingComponent/Loading';
import ICategorydata from '../../../../interface/Icategory/IcategoryData';
import ICategoryResponse from '../../../../interface/Icategory/IcategoryResponse';

  
const CategoryManagemnetTable = () => {
  
  const [modalstate, setModal] = useState<boolean>(false);
  const [loading, setLoading] = useState(true);
  function handleModalOpenClose() { 
    setModal(!modalstate);
  
  }
  
  // const [categories, setCategories] = useState<CategoryType[]>([]);

  const [categories, setCategories] = useState<ICategorydata[]>([]);
    
  async function handleButtonClick(categorydata: object) {
    if ('_id' in categorydata) {
      const id = categorydata._id
      const response:{ data: ICategoryResponse} = await axiosInstance.post('/unlistCategory', {
        id
      });

      console.log(response.data)
      const updatedCategoryIndex = categories.findIndex((Category) => Category._id === id);
      const categoryData = response.data.categorydata
      if (updatedCategoryIndex !== -1) {
        // Update the isBanned property of the user
        const updatedcategories = [...categories];
        updatedcategories[updatedCategoryIndex].IsListed=categoryData.IsListed;
        setCategories(updatedcategories);
      }
    }

  }

  const columns: GridColDef[] = [

    { field: 'Name', headerName: 'Name', width: 200 },
    { field: 'Description', headerName: 'Description', width: 500 },
       {
      field: 'isListed',
      headerName: 'IsListed',
      width: 200,
      renderCell: (params: GridCellParams) => {
        const data:{IsListed:boolean} = params.row;
        const IsListed:boolean = data.IsListed
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
      renderCell: (params: GridCellParams) => {
        const data:{IsListed:boolean} = params.row;
        const IsListed:boolean = data.IsListed 
        return (
          <div>
            {IsListed}
            {IsListed ?<Button
          variant="outlined"
              color="primary"
          onClick={(event) => {
            event.stopPropagation();
           void handleButtonClick(params.row);
          }}
        >
          Unlist
        </Button>  : <Button
          variant="outlined"
          color="error"
          onClick={(event) => {
            event.stopPropagation();
          void handleButtonClick(params.row);
          }}
        >
          List
        </Button>}
          </div>
        );
      },
    },

  ];

  // type CategoryType = {
  //   _id: string; 
  //   name: string;
  // };


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
