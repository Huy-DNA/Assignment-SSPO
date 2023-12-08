import * as React from 'react';
import axios from 'axios';
import { useSelector } from 'react-redux';
import { DELETE_FILES_URL, GET_FILES_URL, UPDATE_FILES_URL } from '../../constants/url';
import Grid from '../Grid/Grid';
import extractAPIResponse from '../../utils/extractAPIResponse';
import { LoginStatus } from '../../constants/loginStatus';

/**
 *
 * @param root0
 * @param root0.files
 * @param root0.setFiles
 */
export default function FileGrid({ files, setFiles }) {
  const isUser = useSelector((state) => state.loginStatus.value) === LoginStatus.USER;
  const loadFiles = () => axios.get(GET_FILES_URL)
    .then(({ data }) => extractAPIResponse(data))
    .then((rows) => rows.map((row) => ({ ...row, uploadedAt: new Date(row.uploadedAt) })));
  const deleteFiles = (ids) => axios.post(DELETE_FILES_URL, ids)
    .then(({ data }) => extractAPIResponse(data));
  const updateFiles = (rows) => axios.post(
    UPDATE_FILES_URL,
    rows.map((row) => ({ id: row.id, name: row.name, content: row.content })),
  ).then(({ data }) => extractAPIResponse(data));
  const createNewFile = async () => { throw new Error('Not supported'); };
  const showActions = isUser;
  const showToolBar = {
    showAdd: false,
    showDel: isUser,
    showSearch: true,
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
        field: 'uploadedAt',
        headerName: 'Uploaded at',
        align: 'right',
        headerAlign: 'right',
        type: 'dateTime',
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
      createNewRow={createNewFile}
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
