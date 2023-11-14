import * as React from 'react';
import { v4 as uuidv4 } from 'uuid';
import axios from 'axios';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import AddIcon from '@mui/icons-material/Add';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/DeleteOutlined';
import SaveIcon from '@mui/icons-material/Save';
import CancelIcon from '@mui/icons-material/Close';
import {
  GridRowModes,
  DataGrid,
  GridToolbarContainer,
  GridActionsCellItem,
} from '@mui/x-data-grid';
import {
  CREATE_PRINTERS_URL,
  DELETE_PRINTERS_URL,
  GET_PRINTERS_URL,
  UPDATE_PRINTERS_URL,
} from '../../../constants/url';

function EditToolbar({ setRows, setRowModesModel }) {
  const handleClick = () => {
    const newPrinter = {
      id: uuidv4(),
      name: '',
      location: '',
      enabled: true,
    };
    setRows((oldRows) => [newPrinter, ...oldRows]);
    setRowModesModel((oldModel) => ({
      ...oldModel,
      [newPrinter.id]: { mode: GridRowModes.Edit, fieldToFocus: 'name' },
    }));
  };

  return (
    <GridToolbarContainer>
      <Button color="primary" startIcon={<AddIcon />} onClick={handleClick}>
        Thêm máy in
      </Button>
    </GridToolbarContainer>
  );
}

export default function FullFeaturedCrudGrid() {
  const [printers, setPrinters] = React.useState([]);
  const [rowModesModel, setRowModesModel] = React.useState({});

  React.useEffect(() => {
    axios.get(GET_PRINTERS_URL)
      .then((response) => {
        setPrinters(Object.values(response.data)[1]);
      });
  }, []);

  const handleEditClick = (id) => () => {
    setRowModesModel({ ...rowModesModel, [id]: { mode: GridRowModes.Edit } });
  };

  const handleSaveClick = (id) => () => {
    setRowModesModel({ ...rowModesModel, [id]: { mode: GridRowModes.View } });
  };

  const handleDeleteClick = (id) => () => {
    setPrinters(printers.filter((printer) => printer.id !== id));
    axios.post(DELETE_PRINTERS_URL, [id]);
  };

  const handleCancelClick = (id) => () => {
    setRowModesModel({
      ...rowModesModel,
      [id]: { mode: GridRowModes.View, ignoreModifications: true },
    });
  };

  const handleRowModesModelChange = (newRowModesModel) => {
    setRowModesModel(newRowModesModel);
  };

  const handleRowEditStop = ({ row }) => {
    axios.post(CREATE_PRINTERS_URL, [row]);
  };

  const processRowUpdate = (updatedRow) => {
    axios.post(UPDATE_PRINTERS_URL, [updatedRow]);
    setPrinters((oldPrinters) => {
      const newPrinters = [...oldPrinters];
      const updatedPrinterId = newPrinters.findIndex((printer) => printer.id === updatedRow.id);
      if (updatedPrinterId >= 0) {
        newPrinters[updatedPrinterId] = updatedRow;
      }
      return newPrinters;
    });
    return updatedRow;
  };

  const columns = [
    {
      field: 'name',
      headerName: 'Name',
      width: 280,
      editable: true,
    },
    {
      field: 'location',
      headerName: 'Vị trí máy in',
      type: 'text',
      width: 280,
      align: 'left',
      headerAlign: 'left',
      editable: true,
    },
    {
      field: 'enabled',
      headerName: 'Enabled',
      width: 180,
      editable: true,
      type: 'singleSelect',
      valueOptions: ['true', 'false'],
    },
    {
      field: 'actions',
      type: 'actions',
      headerName: 'Actions',
      width: 100,
      cellClassName: 'actions',
      getActions: ({ id }) => {
        const isInEditMode = rowModesModel[id]?.mode === GridRowModes.Edit;

        if (isInEditMode) {
          return [
            <GridActionsCellItem
              icon={<SaveIcon />}
              label="Save"
              sx={{
                color: 'primary.main',
              }}
              onClick={handleSaveClick(id)}
            />,
            <GridActionsCellItem
              icon={<CancelIcon />}
              label="Cancel"
              className="textPrimary"
              onClick={handleCancelClick(id)}
              color="inherit"
            />,
          ];
        }

        return [
          <GridActionsCellItem
            icon={<EditIcon />}
            label="Edit"
            className="textPrimary"
            onClick={handleEditClick(id)}
            color="inherit"
          />,
          <GridActionsCellItem
            icon={<DeleteIcon />}
            label="Delete"
            onClick={handleDeleteClick(id)}
            color="inherit"
          />,
        ];
      },
    },
  ];

  return (
    <Box
      sx={{
        height: 500,
        width: '100%',
        '& .actions': {
          color: 'text.secondary',
        },
        '& .textPrimary': {
          color: 'text.primary',
        },
      }}
    >
      <DataGrid
        rows={printers}
        columns={columns}
        editMode="row"
        rowModesModel={rowModesModel}
        onRowModesModelChange={handleRowModesModelChange}
        onRowEditStop={handleRowEditStop}
        processRowUpdate={processRowUpdate}
        slots={{
          toolbar: EditToolbar,
        }}
        slotProps={{
          toolbar: { setRows: setPrinters, setRowModesModel },
        }}
      />
    </Box>
  );
}
