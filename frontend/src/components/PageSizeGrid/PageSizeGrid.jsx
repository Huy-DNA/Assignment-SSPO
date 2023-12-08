import * as React from 'react';
import axios from 'axios';
import { useSelector } from 'react-redux';
import {
  GET_CONFIGS_URL,
} from '../../constants/url';
import Grid from '../Grid/Grid';
import extractAPIResponse from '../../utils/extractAPIResponse';
import { LoginStatus } from '../../constants/loginStatus';

/**
 *
 */
export default function PageSizeGrid() {
  const isManager = useSelector((state) => state.loginStatus.value) === LoginStatus.MANAGER;
  const [pageSizes, setPageSizes] = React.useState([]);
  const loadPageSizes = () => axios.get(`${GET_CONFIGS_URL}/pageSizes`)
    .then(({ data }) => extractAPIResponse(data));
  const deletePageSizes = (ids) => axios.post(`${GET_CONFIGS_URL}/pageSizes/delete`, ids)
    .then(({ data }) => extractAPIResponse(data));
  const updatePageSizes = (rows) => axios.post(`${GET_CONFIGS_URL}/pageSizes/update`, rows)
    .then(({ data }) => extractAPIResponse(data));
  const createNewPageSize = () => axios.post(`${GET_CONFIGS_URL}/pageSizes/gen`)
    .then(({ data }) => extractAPIResponse(data));

  const showActions = {
    showEdit: isManager,
    showDel: isManager,
  };
  const showToolBar = {
    showAdd: isManager,
    showDel: isManager,
    showSearch: true,
  };
  const columns = [
    {
      field: 'name',
      headerName: 'Label',
      align: 'right',
      headerAlign: 'right',
      editable: isManager,
      hideable: true,
      valueGetter: ({ value }) => value.toUpperCase(),
      description: 'The name of type of printing paper',
    },
    {
      field: 'equiv',
      headerName: 'Equivalent pages',
      align: 'right',
      headerAlign: 'right',
      editable: isManager,
      hideable: true,
      minWidth: 200,
      description: 'The number of unit pages that a paper of this type is equivalent to',
    },
  ];

  return (
    <Grid
      columns={columns}
      createNewRow={createNewPageSize}
      deleteRows={deletePageSizes}
      loadRows={loadPageSizes}
      rows={pageSizes}
      setRows={setPageSizes}
      showActions={showActions}
      showToolBar={showToolBar}
      updateRows={updatePageSizes}
    />
  );
}
