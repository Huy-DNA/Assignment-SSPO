import * as React from 'react';
import axios from 'axios';
import {
  DELETE_PRINTERS_URL,
  GEN_PRINTER_URL,
  GET_PRINTERS_URL,
  UPDATE_PRINTERS_URL,
} from '../../constants/url';
import Grid from '../Grid/Grid';
import extractAPIResponse from '../../utils/extractAPIResponse';
import { useSelector } from 'react-redux';
import { LoginStatus } from '../../constants/loginStatus';

export default function PrinterGrid() {
  const isManager = useSelector(state => state.loginStatus.value) === LoginStatus.MANAGER;
  const [printers, setPrinters] = React.useState([]);
  const loadPrinters = () => axios.get(GET_PRINTERS_URL)
    .then(({ data }) => extractAPIResponse(data));
  const deletePrinters = (ids) => axios.post(DELETE_PRINTERS_URL, ids)
    .then(({ data }) => extractAPIResponse(data));
  const updatePrinters = (rows) => axios.post(UPDATE_PRINTERS_URL, rows)
    .then(({ data }) => extractAPIResponse(data));
  const createNewPrinter = () => axios.post(GEN_PRINTER_URL)
    .then(({ data }) => extractAPIResponse(data));
  const showActions = {
    showEdit: isManager,
    showDel: isManager,
    showView: true,
  };
  const showToolBar = {
    showAdd: isManager,
    showDel: isManager,
    showSearch: true,
  };
  const columns = [
    {
      field: 'code',
      headerName: 'Code',
      align: 'right',
      headerAlign: 'right',
      hideable: true,
      flex: 1,
    },
    {
      field: 'brand',
      headerName: 'Brand',
      align: 'right',
      headerAlign: 'right',
      editable: isManager,
      hideable: true,
      flex: 2,
    },
    {
      field: 'name',
      headerName: 'Name',
      align: 'right',
      headerAlign: 'right',
      editable: isManager,
      hideable: true,
      flex: 2,
    },
    {
      field: 'campus',
      headerName: 'Campus',
      type: 'singleSelect',
      valueOptions: ['BK1', 'BK2'],
      align: 'right',
      headerAlign: 'right',
      editable: isManager,
      hideable: true,
      flex: 1,
    },
    {
      field: 'building',
      headerName: 'Building',
      type: 'singleSelect',
      valueOptions: ['H1', 'H2', 'H3', 'H6', 'A1', 'A2', 'B1', 'B2', 'C1', 'C2'],
      align: 'right',
      headerAlign: 'right',
      editable: isManager,
      hideable: true,
      flex: 1,
    },
    {
      field: 'room',
      headerName: 'Room',
      type: 'number',
      align: 'right',
      headerAlign: 'right',
      editable: isManager,
      hideable: true,
      flex: 1,
    },
    {
      field: 'enabled',
      headerName: 'Enabled',
      align: 'right',
      headerAlign: 'right',
      editable: isManager,
      type: 'singleSelect',
      hideable: true,
      valueOptions: [true, false],
      renderCell: (params) => (
        <span className={params.value ? 'text-blue-700' : 'text-gray-600'}>{`${params.value}`}</span>
      ),
      flex: 1,
    },
    {
      field: 'description',
      headerName: 'Desc.',
      editable: isManager,
      type: 'text',
      hideable: true,
      flex: 2,
    },
  ];

  return (
    <Grid
      columns={columns}
      createNewRow={createNewPrinter}
      deleteRows={deletePrinters}
      loadRows={loadPrinters}
      rows={printers}
      setRows={setPrinters}
      showActions={showActions}
      showToolBar={showToolBar}
      updateRows={updatePrinters}
    />
  );
}
