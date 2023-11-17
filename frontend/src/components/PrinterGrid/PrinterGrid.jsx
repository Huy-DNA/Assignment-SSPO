import * as React from 'react';
import axios from 'axios';
import {
  DELETE_PRINTERS_URL,
  GEN_PRINTER_URL,
  GET_PRINTERS_URL,
  UPDATE_PRINTERS_URL,
} from '../../../constants/url';
import Grid from '../Grid/Grid';

export default function PrinterGrid() {
  const [printers, setPrinters] = React.useState([]);
  const loadPrinters = () => axios.get(GET_PRINTERS_URL)
    .then((response) => Object.values(response.data)[1]);
  const deletePrinters = (ids) => axios.post(DELETE_PRINTERS_URL, ids);
  const updatePrinters = (rows) => axios.post(UPDATE_PRINTERS_URL, rows);
  const createNewPrinter = () => axios.post(GEN_PRINTER_URL)
    .then((response) => Object.values(response.data)[1]);
  const showActions = true;
  const columns = [
    {
      field: 'code',
      headerName: 'Code',
    },
    {
      field: 'brand',
      headerName: 'Brand',
      editable: true,
    },
    {
      field: 'name',
      headerName: 'Name',
      editable: true,
    },
    {
      field: 'campus',
      headerName: 'Campus',
      type: 'singleSelect',
      valueOptions: ['BK1', 'BK2'],
      editable: true,
    },
    {
      field: 'building',
      headerName: 'Building',
      type: 'singleSelect',
      valueOptions: ['H1', 'H2', 'H3', 'H6', 'A1', 'A2', 'B1', 'B2', 'C1', 'C2'],
      editable: true,
    },
    {
      field: 'room',
      headerName: 'Room',
      type: 'number',
      editable: true,
    },
    {
      field: 'enabled',
      headerName: 'Enabled',
      editable: true,
      type: 'singleSelect',
      valueOptions: ['true', 'false'],
    },
    {
      field: 'description',
      headerName: 'Desc.',
      editable: true,
      type: 'text',
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
      updateRows={updatePrinters}
    />
  );
}
