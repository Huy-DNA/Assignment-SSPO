import * as React from 'react';
import axios from 'axios';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import AddIcon from '@mui/icons-material/Add';
import RemoveCircleOutlineIcon from '@mui/icons-material/RemoveCircleOutline';
import EditIcon from '@mui/icons-material/Edit';
import SaveIcon from '@mui/icons-material/Save';
import CancelIcon from '@mui/icons-material/Close';
import {
  GridRowModes,
  DataGrid,
  GridToolbarContainer,
  GridActionsCellItem,
  GridRowEditStopReasons,
} from '@mui/x-data-grid';

function EditToolbar(props) {
  const { setRows, setRowModesModel, checkIDs, setCheckIDs } = props;

  const handleAddRow = () => {
    const id = '';
    setRows((oldRows) => [...oldRows, {id, name: '', location: '', enabled: true }]);
    setRowModesModel((oldModel) => ({
      ...oldModel,
      [id]: { mode: GridRowModes.Edit, fieldToFocus: 'name' },
    }));
  };
  const handleAddPrinters = (data) => {
    axios({
      method: 'post',
      url: 'http://localhost:3000/api/printers/add',
      data: data,
    })
      .then((response) => {
        
      })
      .catch((error) => {
        
      });
  };

  const handleDeletePrinters = () => {
    console.log(checkIDs);
    axios({
      method: 'post',
      url: 'http://localhost:3000/api/printers/delete',
      data: checkIDs,
    })
      .then((response) => {
        console.log('Printers deleted successfully', response.data);
        setRows((oldRows) => oldRows.filter((row) => !checkIDs.includes(row.id)));
        setRowModesModel({});
      })
      .catch((error) => {
        console.error('Error deleting printers', error);
      });
  };

  return (
    <div style={{ display: 'flex' }}>
      <GridToolbarContainer>
        <Button color="primary" startIcon={<AddIcon />} onClick={handleAddRow}>
          Thêm máy in
        </Button>
      </GridToolbarContainer>
      <GridToolbarContainer>
        <Button color="primary" startIcon={<RemoveCircleOutlineIcon />} onClick={handleDeletePrinters}>
          Xoá máy in
        </Button>
      </GridToolbarContainer>
    </div>
  );
}

export default function FullFeaturedCrudGrid() {
  const [rows, setRows] = React.useState([]);
  const [rowModesModel, setRowModesModel] = React.useState({});
  const [checkIDs, setCheckIDs] = React.useState([]);

  React.useEffect(() => {
    axios.get('http://localhost:3000/api/printers')
      .then(response => {
        setRows(Object.values(response.data)[1]);
      })
      .catch(error => {
        console.error('Error fetching data:', error);
      });
  }, []);


  const handleRowEditStop = (params, event) => {
    if (params.reason === GridRowEditStopReasons.rowFocusOut) {
      event.defaultMuiPrevented = true;
    }
  };

  const handleEditClick = (id) => () => {
    setRowModesModel({ ...rowModesModel, [id]: { mode: GridRowModes.Edit } });
  };

  const handleSaveClick = (id) => () => {
    setRowModesModel({ ...rowModesModel, [id]: { mode: GridRowModes.View } });
  };

  const handleCancelClick = (id) => () => {
    setRowModesModel({
      ...rowModesModel,
      [id]: { mode: GridRowModes.View, ignoreModifications: true },
    });

    const editedRow = rows.find((row) => row.id === id);
    if (editedRow.isNew) {
      setRows(rows.filter((row) => row.id !== id));
    }
  };

  const processRowUpdate = (newRow) => {
    const updatedRow = { ...newRow, isNew: false };
    setRows(rows.map((row) => (row.id === newRow.id ? updatedRow : row)));
    return updatedRow;
  };

  const handleRowModesModelChange = (newRowModesModel) => {
    setRowModesModel(newRowModesModel);
  };

  const columns = [
    { field: 'name', headerName: 'Name', width: 280, editable: true },
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
          />
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
        rows={rows}
        columns={columns}
        editMode="row"
        checkboxSelection
        rowModesModel={rowModesModel}
        onRowModesModelChange={handleRowModesModelChange}
        onRowEditStop={handleRowEditStop}
        processRowUpdate={processRowUpdate}
        onRowSelectionModelChange={(ids) => {
          setCheckIDs(ids)
        }}
        slots={{
          toolbar: EditToolbar,
        }}
        slotProps={{
          toolbar: { setRows, setRowModesModel, checkIDs, setCheckIDs },
        }}
      />
    </Box>
  );
}
