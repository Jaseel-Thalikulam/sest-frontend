import axios from 'axios'
import {useEffect, useState} from 'react'
import { DataGrid, GridCellParams, GridColDef, GridValueGetterParams } from '@mui/x-data-grid';
import Button from '@mui/material/Button/Button';
import './StudentManagemnetTable.scss'
import axiosInstance from '../../admin/interceptor/axiosInstance';


  
const StudentManagemnetTable = () => {


  
  const columns: GridColDef[] = [

    { field: 'name', headerName: 'Name', width: 130 },
    { field: 'email', headerName: 'Email', width: 200 },
    { field: 'role', headerName: 'Role', width: 200 },
    {
      field: 'isBanned',
      headerName: 'Access',
      width: 200,
      renderCell: (params: GridCellParams) => {
        const data = params.row;
        const isBanned = data.isBanned
        return (
          <div>
            {isBanned}
            {isBanned ? 'Approved' : 'Denied'}
          </div>
        );
      },
    },
   {
      field: 'action',
      headerName: 'Action',
      width: 200,
      renderCell: (params: GridCellParams) => {
        const data = params.row;
        const isBanned = data.isBanned
        return (
          <div>
            {isBanned}
            {isBanned ?<Button
          variant="outlined"
              color="error"
          onClick={(event) => {
            event.stopPropagation(); // Prevent the row click event from being triggered
            handleButtonClick(params.row);
          }}
        >
          Deny
        </Button>  : <Button
          variant="outlined"
          color="primary"
          onClick={(event) => {
            event.stopPropagation(); // Prevent the row click event from being triggered
            handleButtonClick(params.row);
          }}
        >
          Approve
        </Button>}
          </div>
        );
      },
    },
  ];

  type UserType = {
    _id: string; 
    name: string;
    email: string;
    phoneNumber: number;
    password: string;
    isVerified: boolean;
    role: string;
    isBanned:boolean
  };

  const [users, setUsers] = useState<UserType[]>([]);
    
  async function handleButtonClick(userData: object) {
    if ('_id' in userData) {
      const id = userData._id
      const { data } = await axiosInstance.post('/Superadmin/userslist/blockuser', {
        id
      });

      
      const updatedUserIndex = users.findIndex((user) => user._id === id);
      if (updatedUserIndex !== -1) {
        // Update the isBanned property of the user
        const updatedUsers = [...users];
        updatedUsers[updatedUserIndex].isBanned = data.data.isBanned;
        setUsers(updatedUsers);
      }
    }

  }

    useEffect(() => {
      // Function to fetch all users' data from the server
      const fetchUsers = async () => {
        try {
          const { data } = await axiosInstance.get('http://localhost:4000/Superadmin/userslist');
                
          console.log("inside fetch :", data.data)

          let userdata = data.data
              
             
               
                
          setUsers(userdata);
        } catch (error) {
          console.error('Error fetching users:', error);
        }
      };
  
      fetchUsers();
    }, [])
    
    

    const rows = users
    const getRowId = (row: any) => row._id;



    return (
      <div className="table-container">
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
        // checkboxSelection
    
        />
      </div>
    )
  
}

  export default StudentManagemnetTable
