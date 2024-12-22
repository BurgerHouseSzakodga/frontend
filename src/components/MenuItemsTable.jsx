import { useContext } from "react";

import Box from "@mui/material/Box";
import { DataGrid } from "@mui/x-data-grid";
import { Button, MenuItem, Select } from "@mui/material";

import { AdminContext, GuestContext } from "../context/contexts";
import { localeText } from "../utils/locale-text";
import usersIcon from "../assets/users.svg";

export default function MenuItemsTable() {
  const { menuItems, categories } = useContext(GuestContext);
  const { updateMenuItemName, updateMenuItemPrice, updateMenuItemCategory } =
    useContext(AdminContext);

  const handleDelete = (p) => {
    console.log("Delete" + p);
  };

  const handleProcessRowUpdate = async (newRow, oldRow) => {
    if (newRow.name !== oldRow.name) {
      await updateMenuItemName(newRow.id, newRow.name);
    }
    if (newRow.price !== oldRow.price) {
      await updateMenuItemPrice(newRow.id, newRow.price);
    }
    if (newRow.category_name !== oldRow.category_name) {
      await updateMenuItemCategory(
        newRow.id,
        categories.find((c) => c.name === newRow.category_name).id
      );
    }
    return newRow;
  };

  const columns = [
    {
      field: "avatar",
      headerName: "Avatar",
      width: 100,
      renderCell: () => (
        <img
          src={usersIcon}
          alt="avatar"
          style={{ width: "36px", height: "36px", verticalAlign: "middle" }}
        />
      ),
    },
    { field: "id", headerName: "ID", width: 90, editable: false },
    {
      field: "name",
      headerName: "Név",
      width: 150,
      editable: true,
    },
    {
      field: "price",
      headerName: "Ár",
      width: 200,
      editable: true,
    },
    {
      field: "category_name",
      headerName: "Kategória",
      width: 110,
      editable: true,
      renderEditCell: (params) => (
        <Select
          value={params.value}
          onChange={(event) => {
            params.api.setEditCellValue({
              id: params.id,
              field: params.field,
              value: event.target.value,
            });
          }}
          fullWidth
        >
          {categories.map((category) => (
            <MenuItem key={category.id} value={category.name}>
              {category.name}
            </MenuItem>
          ))}
        </Select>
      ),
    },
    {
      field: "actions",
      headerName: "Műveletek",
      width: 150,
      renderCell: (params) => (
        <Button
          variant="contained"
          color="primary"
          onClick={() => handleDelete(params.id)}
        >
          Módosítás
        </Button>
      ),
    },
  ];

  return (
    <Box sx={{ height: 371, width: 848 }}>
      <DataGrid
        rows={[...menuItems]}
        columns={[...columns]}
        initialState={{
          pagination: {
            paginationModel: {
              pageSize: 5,
            },
          },
        }}
        pageSizeOptions={[5]}
        disableRowSelectionOnClick
        processRowUpdate={handleProcessRowUpdate}
        experimentalFeatures={{ newEditingApi: true }}
        localeText={localeText}
        sx={{ backgroundColor: "white" }}
      />
    </Box>
  );
}
