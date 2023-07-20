import axios from 'axios'
import {useEffect, useState} from 'react'
import { DataGrid, GridColDef, GridValueGetterParams } from '@mui/x-data-grid';

const columns: GridColDef[] = [

    { field: 'name', headerName: 'Name', width: 130 },
    { field: 'email', headerName: 'Email', width: 200 },
    { field: 'role', headerName: 'Role', width: 200 },
    // {
    //   field: 'Fullname',
    //   headerName: 'Full name',
    //   description: 'This column has a value getter and is not sortable.',
    //   sortable: false,
    //   width: 160,
    //   valueGetter: (params: GridValueGetterParams) =>
    //     `${params.row.firstName || ''} ${params.row.lastName || ''}`,
    // },
  ];
  
  
  const StudentManagemnetTable = () => {
      const [users, setUsers] = useState([]);

    useEffect(() => {
        // Function to fetch all users' data from the server
        const fetchUsers = async () => {
            try {
                const {data} = await axios.get('http://localhost:4000/userslist');
                
                console.log("inside fetch :", data.data)

              let userdata = data.data
              
             
               
                
                setUsers(userdata); 
            } catch (error) {
                console.error('Error fetching users:', error);
            }
        };
  
        fetchUsers();
    }, [])
    
    

      const rows=users
      const getRowId = (row:any)=> row._id;

  return (
    <div style={{ height: 400, width: '100%' }}>
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
      checkboxSelection
    />
  </div>
  )
}

export default StudentManagemnetTable
