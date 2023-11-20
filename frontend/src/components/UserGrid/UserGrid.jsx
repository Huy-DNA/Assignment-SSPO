import React from 'react';
import { GET_USERS_URL } from '../../constants/url';
import Grid from '../Grid/Grid';
import axios from 'axios';
import extractAPIResponse from '../../utils/extractAPIResponse';

export default function UserGrid() {
  const [users, setUsers] = React.useState([]);
  const loadUsers = () => axios.get(GET_USERS_URL)
    .then(({ data }) => extractAPIResponse(data));
  const deleteUsers = (ids) => { throw new Error('Not supported') };
  const updateUsers = (rows) => { throw new Error('Not supported') };
  const createNewUser = () => { throw new Error('Not supported') };
  const showActions = false;
  const showToolBar = false;
  const columns = [
    {
      field: 'id',
      headerName: 'Id',
      align: 'right',
      headerAlign: 'right',
      hideable: true,
      flex: 1,
    },
    {
      field: 'name',
      headerName: 'Name',
      align: 'right',
      headerAlign: 'right',
      hideable: true,
      flex: 1,
    },
    {
      field: 'role',
      headerName: 'Role',
      align: 'right',
      headerAlign: 'right',
      type: 'singleSelect',
      valueOptions: ['Manager', 'Student'],
      hideable: true,
      flex: 1,
    },
  ];

  return (
    <Grid
      columns={columns}
      createNewRow={createNewUser}
      deleteRows={deleteUsers}
      loadRows={loadUsers}
      rows={users}
      setRows={setUsers}
      showActions={showActions}
      showToolBar={showToolBar}
      updateRows={updateUsers}
    />
  );
}
