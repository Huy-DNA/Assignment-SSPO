import React, { useContext } from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import AddIcon from '@mui/icons-material/Add';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/DeleteOutlined';
import SaveIcon from '@mui/icons-material/Save';
import CancelIcon from '@mui/icons-material/Close';
import ViewIcon from '@mui/icons-material/Visibility';
import RemoveCircleOutlineIcon from '@mui/icons-material/RemoveCircleOutline';
import {
  GridRowModes,
  DataGrid,
  GridToolbarContainer,
  GridActionsCellItem,
  GridToolbarQuickFilter,
} from '@mui/x-data-grid';
import { Toolbar } from '@mui/material';
import { NotificationStatus } from '../../constants/notification';
import useNotification from '../../hooks/useNotification';
import { useNavigate } from 'react-router';
import { Link } from 'react-router-dom';

function EditToolbar({ setRows, setRowModesModel, checkedIds, createNewRow, deleteRows, columns, showToolBar }) {
  const notify = useNotification();
  const handleAddRows = async () => {
    try {
      const newRow = await createNewRow();
      setRows((oldRows) => [newRow, ...oldRows]);
      setRowModesModel((oldModel) => ({
        ...oldModel,
        [newRow.id]: { mode: GridRowModes.Edit, fieldToFocus: columns[0].field },
      }));
      notify(NotificationStatus.OK, '');
    } catch (e) {
      notify(NotificationStatus.ERR, e.message);
    } 
  };

  const handleDeleteRows = async () => {
    try {
      await deleteRows(checkedIds);
      setRows((oldRows) => oldRows.filter((row) => !checkedIds.includes(row.id)));
      setRowModesModel({});
      notify(NotificationStatus.OK, '');
    } catch (e) {
      notify(NotificationStatus.ERR, e.message);
    }
  };

  return (
    <div>
      <GridToolbarContainer>
        <Toolbar>
          <div className="flex flex-row gap-2">
            {
              (showToolBar === true || showToolBar.showAdd) && 
                <Button color="primary" startIcon={<AddIcon />} onClick={handleAddRows}>
                  Thêm
                </Button>
            }
            {
              (showToolBar === true || showToolBar.showDel) &&
              <Button color="primary" startIcon={<RemoveCircleOutlineIcon />} onClick={handleDeleteRows}>
                Xoá
              </Button>
            }
            <GridToolbarQuickFilter />
          </div>
        </Toolbar>
      </GridToolbarContainer>
    </div>
  );
}

export default function Grid({
  columns,
  rows,
  setRows,
  loadRows,
  deleteRows,
  updateRows,
  createNewRow,
  showActions,
  showToolBar,
}) {
  const notify = useNotification();
  const navigate = useNavigate();
  const [rowModesModel, setRowModesModel] = React.useState({});
  const [loading, setLoading] = React.useState(true);
  const [checkedIds, setCheckedIds] = React.useState([]);

  React.useEffect(() => {
    loadRows().then((rows) => setRows((oldRows) => [...oldRows, ...rows]))
              .then(() => setLoading(false))
              .catch((e) => notify(NotificationStatus.ERR, e.message));
  }, []);

  const handleEditClick = (id) => () => {
    setRowModesModel({ ...rowModesModel, [id]: { mode: GridRowModes.Edit } });
  };

  const handleSaveClick = (id) => () => {
    setRowModesModel({ ...rowModesModel, [id]: { mode: GridRowModes.View } });
  };

  const handleDeleteClick = (id) => () => {
    setRows(rows.filter((row) => row.id !== id));
    deleteRows([id]).then(() => notify(
                      NotificationStatus.OK,
                      '',
                    ))
                    .catch((e) => notify(
                      NotificationStatus.ERR,
                      e.message,
                    ));
  };

  const handleCancelClick = (id) => () => {
    setRowModesModel({
      ...rowModesModel,
      [id]: { mode: GridRowModes.View, ignoreModifications: true },
    });
  };

  const augmentedColumns = !showActions ? columns : [
    ...columns,
    {
      field: 'actions',
      type: 'actions',
      headerName: '',
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
          <GridActionsCellItem
            icon={<ViewIcon />}
            label="View"
            color="inherit"
            component={Link}
            to={`./${id}`}
            target="_blank" 
          />
        ];
      },
    },
  ];

  const handleRowModesModelChange = (newRowModesModel) => {
    setRowModesModel(newRowModesModel);
  };

  const processRowUpdate = (updatedRow, originalRow) => {
    updateRows([updatedRow])
      .then(() => notify(
        NotificationStatus.OK,
        '',
      ))
      .then(() =>
        setRows((oldRows) => {
          const newRows = [...oldRows];
          const updatedRowId = newRows.findIndex((row) => row.id === updatedRow.id);
          if (updatedRowId >= 0) {
            newRows[updatedRowId] = updatedRow;
          }
          return newRows;
      }))
      .catch((e) => notify(
        NotificationStatus.ERR,
        e.message,
      ))
    return originalRow;
  };

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
        loading={loading}
        rows={rows}
        columns={augmentedColumns}
        editMode="row"
        checkboxSelection
        rowModesModel={rowModesModel}
        onRowModesModelChange={handleRowModesModelChange}
        processRowUpdate={processRowUpdate}
        onRowSelectionModelChange={setCheckedIds}
        slots={{
          toolbar: !showToolBar ? undefined : EditToolbar,
        }}
        slotProps={{
          toolbar: !showToolBar ? undefined : {
            setRows,
            setRowModesModel,
            checkedIds,
            createNewRow,
            deleteRows,
            columns: augmentedColumns,
            showToolBar,
          },
        }}
      />
    </Box>
  );
}
