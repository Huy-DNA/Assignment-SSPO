import * as React from 'react';
import axios from 'axios';
import { DELETE_FILES_URL, GET_FILES_URL, UPDATE_FILES_URL } from '../../constants/url';
import Grid from '../Grid/Grid';
import extractAPIResponse from '../../utils/extractAPIResponse';
import { useSelector } from 'react-redux';
import { LoginStatus } from '../../constants/loginStatus';

export default function PrinterGrid() {
  const isUser = useSelector(state => state.loginStatus.value) === LoginStatus.USER;
  const [files, setFiles] = React.useState([]);
  const loadFiles = () => axios.get(GET_FILES_URL)
    .then(({ data }) => extractAPIResponse(data));
  const deleteFiles = (ids) => axios.post(DELETE_FILES_URL, ids)
    .then(({ data }) => extractAPIResponse(data));
  const updateFiles = (rows) => axios.post(
      UPDATE_FILES_URL, 
      rows.map((row) => ({ id: row.id, name: row.name, content: row.content, })),
  ).then(({ data }) => extractAPIResponse(data));
  const createNewPrinter = async () => { throw "Not supported" };
  const showActions = isUser;
  const showToolBar = {
    showAdd: false,
    showDel: isUser,
  };
  const columns = [
    ...[
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
        editable: isUser,
        hideable: true,
        flex: 1,
      },
      {
        field: 'createdAt',
        headerName: 'Created at',
        align: 'right',
        headerAlign: 'right',
        type: 'dateime',
        hideable: true,
        flex: 1,
      },
    ],
    ...(isUser ? [] : [
      {
        field: 'userId',
        headerName: 'User Id',
        align: 'right',
        headerAlign: 'right',
        hideable: true, 
        flex: 1,
      },
    ]),
  ];

  return (
    <Grid
      columns={columns}
      createNewRow={createNewPrinter}
      deleteRows={deleteFiles}
      loadRows={loadFiles}
      rows={files}
      setRows={setFiles}
      showActions={showActions}
      showToolBar={showToolBar}
      updateRows={updateFiles}
    />
  );
}
