import React from 'react';
import axios from 'axios';
import { GET_REPORTS_URL } from '../../constants/url';
import Grid from '../Grid/Grid';
import extractAPIResponse from '../../utils/extractAPIResponse';

/**
 *
 */
export default function ReportGrid() {
  const [reports, setReports] = React.useState([]);
  const loadReports = () => axios.get(GET_REPORTS_URL)
    .then(({ data }) => extractAPIResponse(data));
  const deleteReports = (ids) => { throw new Error('Not supported'); };
  const updateReports = (rows) => { throw new Error('Not supported'); };
  const createNewReport = () => { throw new Error('Not supported'); };
  const showActions = {
    showView: true,
  };
  const showToolBar = {
    showSearch: true,
  };
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
      field: 'week',
      headerName: 'Week',
      align: 'right',
      headerAlign: 'right',
      hideable: true,
      flex: 1,
    },
    {
      field: 'year',
      headerName: 'Year',
      align: 'right',
      headerAlign: 'right',
      hideable: true,
      flex: 1,
    },
  ];

  return (
    <Grid
      columns={columns}
      createNewRow={createNewReport}
      deleteRows={deleteReports}
      loadRows={loadReports}
      rows={reports}
      setRows={setReports}
      showActions={showActions}
      showToolBar={showToolBar}
      updateRows={updateReports}
    />
  );
}
