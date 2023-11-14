import * as React from 'react';
import axios from 'axios';
import { v4 as uuidv4 } from 'uuid';
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
  GridRowEditStopReasons,
} from '@mui/x-data-grid';

function EditToolbar(props) {
  const { setRows, setRowModesModel, checkIDs, setCheckIDs } = props;

  // const handleAddPrinters = () => {
  //   const id = "";
  //   setRows((oldRows) => [...oldRows, {id, name: '', location: '', enabled: true }]);
  //   setRowModesModel((oldModel) => ({
  //     ...oldModel,
  //     [id]: { mode: GridRowModes.Edit, fieldToFocus: 'name' },
  //   }));
  // };
  const handleAddPrinters = () => {
    // Tạo một hàng mới mà không cần khởi tạo trường id
    const newPrinter = { name: '', location: '', enabled: true };

    // Thêm hàng mới vào grid
    setRows((oldRows) => [...oldRows, newPrinter]);

    // Cập nhật trạng thái rowModesModel để chuyển hàng mới vào chế độ chỉnh sửa
    const newId = uuidv4();
    setRowModesModel((oldModel) => ({
      ...oldModel,
      [newId]: { mode: GridRowModes.Edit, fieldToFocus: 'name' },
    }));

    console.log(newPrinter);

    // Gọi API để thêm máy in với dữ liệu từ hàng mới
    // axios({
    //   method: 'post',
    //   url: 'http://localhost:3000/api/printers/add',
    //   data: newPrinter,
    // })
    //   .then((response) => {
    //     // Cập nhật id của hàng sau khi nhận phản hồi từ máy chủ
    //     const { id } = response.data;
    //     const updatedRows = oldRows.map((row) =>
    //       row === newPrinter ? { ...row, id } : row
    //     );
    //     setRows(updatedRows);
    //   })
    //   .catch((error) => {
    //     // Xử lý lỗi khi gọi API thêm máy in
    //     console.error('Error adding printer:', error);
    //     // Nếu có lỗi, hãy xóa hàng mới từ grid
    //     setRows((oldRows) => oldRows.filter((row) => row !== newPrinter));
    //     // Nếu có lỗi, hãy xóa hàng mới từ rowModesModel
    //     setRowModesModel((oldModel) => {
    //       const { [newId]: deleted, ...newModel } = oldModel;
    //       return newModel;
    //     });
    //   });
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
        <Button color="primary" startIcon={<AddIcon />} onClick={handleAddPrinters}>
          Thêm máy in
        </Button>
      </GridToolbarContainer>
      <GridToolbarContainer>
        <Button color="primary" startIcon={<AddIcon />} onClick={handleDeletePrinters}>
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

  const handleDeleteClick = (id) => () => {
    setRows(rows.filter((row) => row.id !== id));
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
