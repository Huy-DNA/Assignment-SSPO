import React from 'react';
import { GET_TRANSACTIONS_URL } from '../../constants/url';
import Grid from '../Grid/Grid';
import axios from 'axios';
import extractAPIResponse from '../../utils/extractAPIResponse';

export default function TransactionGrid() {
  const [transactions, setTransactions] = React.useState([]);
  const loadTransactions = () => axios.get(GET_TRANSACTIONS_URL)
    .then(({ data }) => extractAPIResponse(data));
  const deleteTransactions = (ids) => { throw new Error('Not supported') };
  const updateTransactions = (rows) => { throw new Error('Not supported') };
  const createNewTransaction = () => { throw new Error('Not supported') };
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
      field: 'userId',
      headerName: 'User Id',
      align: 'right',
      headerAlign: 'right',
      hideable: true,
      flex: 1,
    },
    {
      field: 'success',
      headerName: 'Success',
      align: 'right',
      headerAlign: 'right',
      hideable: true,
      flex: 1,
    },
    {
      field: 'createdAt',
      headerName: 'Created at',
      align: 'right',
      headerAlign: 'right',
      type: 'dateTime',
      hideable: true,
      flex: 1,
    },
    {
      field: 'room',
      headerName: 'Room',
      type: 'number',
      align: 'right',
      headerAlign: 'right',
      hideable: true,
      flex: 1,
    },
    {
      field: 'status',
      headerName: 'Status',
      align: 'right',
      headerAlign: 'right',
      hideable: true,
      flex: 1,
    },
    {
      field: 'paperNo',
      headerName: 'No papers',
      type: 'number',
      hideable: true,
      flex: 1,
    },
    {
      field: 'price',
      headerName: 'Price',
      type: 'number',
      hideable: true,
      flex: 1,
    },
  ];

  return (
    <Grid
      columns={columns}
      createNewRow={createNewTransaction}
      deleteRows={deleteTransactions}
      loadRows={loadTransactions}
      rows={transactions}
      setRows={setTransactions}
      showActions={showActions}
      showToolBar={showToolBar}
      updateRows={updateTransactions}
    />
  );
}
