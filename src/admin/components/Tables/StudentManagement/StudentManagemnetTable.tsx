  
import {useEffect, useState} from 'react'
import { DataGrid, GridCellParams, GridColDef } from '@mui/x-data-grid';
import Button from '@mui/material/Button/Button';
import './StudentManagemnetTable.scss'
import axiosInstance from '../../../interceptor/axiosInstance';
import Loading from '../../../../common/Components/loadingComponent/Loading';
import IBlockUserResponse from '../../../../interface/tables/IstudentManagementTable/IBlockUserResponse';
import IUserSlice from '../../../../interface/Iredux/IuserSlice';


  
const StudentManagemnetTable = () => {

  const [loading, setLoading] = useState(true);
  const columns: GridColDef[] = [

    { field: 'name', headerName: 'Name', width: 130 },
    { field: 'email', headerName: 'Email', width: 200 },
    { field: 'role', headerName: 'Role', width: 200 },
    {
      field: 'isBanned',
      headerName: 'Access',
      width: 200,
      renderCell: (params: GridCellParams) => {
        const data:{isBanned:boolean} = params.row;
        const isBanned:boolean = data.isBanned
        return (
          <div>
            {isBanned}
            {isBanned ? 'Denied' : 'Approved'}
          </div>
        );
      },
    },
   {
      field: 'action',
      headerName: 'Action',
      width: 200,
      renderCell: (params: GridCellParams) => {
        const data:{isBanned:boolean} = params.row;
        const isBanned:boolean = data.isBanned 
        return (
          <div>
            {isBanned}
            {isBanned ?<Button
          variant="outlined"
              color="primary"
          onClick={(event) => {
            event.stopPropagation();
           void handleButtonClick(params.row);
          }}
        >
          Approve
        </Button>  : <Button
          variant="outlined"
          color="error"
          onClick={(event) => {
            event.stopPropagation();
          void handleButtonClick(params.row);
          }}
        >
          DENY
        </Button>}
          </div>
        );
      },
    },
  ];

  const [users, setUsers] = useState<IUserSlice[]>([]);
    
  async function handleButtonClick(userData: object) {
    if ('_id' in userData) {
      const id = userData._id
      const response:{ data: IBlockUserResponse} = await axiosInstance.post('/blockuser', {
        id
      });
      const updatedUserIndex = users.findIndex((user) => user._id === id);
      const userdata = response.data.Userdata
      if (updatedUserIndex !== -1) {
        // Update the isBanned property of the user
        const updatedUsers = [...users];
        updatedUsers[updatedUserIndex].isBanned =userdata.isBanned;
        setUsers(updatedUsers);
      }
    }

  }

    useEffect(() => {
      // Function to fetch all users' data from the server
      const fetchUsers = async () => {
        try {
          const { data } = await axiosInstance.get('/userslist');
          let userdata = data.data
          setUsers(userdata);
          setLoading(false)
        } catch (error) {
          console.error('Error fetching users:', error);
          setLoading(false)
  
        }
      };
  
     void fetchUsers();
    }, [])
    
    

    const rows = users
    const getRowId = (row:any) => row._id;



  return (
    <>
      <h1>Users</h1>
      <div className="table-container">
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
      </>
    )
  
}

  export default StudentManagemnetTable
