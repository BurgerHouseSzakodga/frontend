import { useContext } from "react";

import Box from "@mui/material/Box";
import { DataGrid } from "@mui/x-data-grid";
import { Button, MenuItem, Select } from "@mui/material";

import {
  AuthContext,
  CategoryContext,
  MenuItemContext,
} from "../context/contexts";
import { localeText } from "../utils/locale-text";

const MenuItemsTable = ({ modifiable, onSelectModify }) => {
  const { categories } = useContext(CategoryContext);
  const { navigate } = useContext(AuthContext);
  const {
    menuItems,
    menuItemLoading,
    handleUpdateMenuItemName,
    handleUpdateMenuItemPrice,
    handleUpdateMenuItemCategory,
  } = useContext(MenuItemContext);

  const handleProcessRowUpdate = async (newRow, oldRow) => {
    if (newRow.name !== oldRow.name) {
      await handleUpdateMenuItemName(newRow.id, newRow.name);
    }
    if (newRow.price !== oldRow.price) {
      await handleUpdateMenuItemPrice(newRow.id, newRow.price);
    }
    if (newRow.category_name !== oldRow.category_name) {
      await handleUpdateMenuItemCategory(
        newRow.id,
        categories.find((c) => c.name === newRow.category_name).id
      );
    }
    return newRow;
  };

  const handleModify = (id) => {
    if (!modifiable) {
      navigate("/admin/etelek-kezelese");
    } else {
      onSelectModify(true, id);
    }
  };

  const columns = [
    {
      field: "avatar",
      headerName: "Kép",
      width: 100,
      renderCell: (params) => (
        <div
          style={{
            width: "36px",
            height: "36px",
            borderRadius: "33%",
            backgroundImage: `url(${params.row.image_path})`,
            backgroundSize: "cover",
            backgroundPosition: "center",
            margin: "8px 0",
          }}
        ></div>
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
      renderCell: (params) => params.value + " Ft",
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
          onClick={() => handleModify(params.id)}
          variant="contained"
          color="primary"
        >
          Módosítás
        </Button>
      ),
    },
  ];

  if (menuItemLoading) {
    return <div className="loader"></div>;
  }

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
        onProcessRowUpdateError={(error) => console.log(error)}
        localeText={localeText}
        sx={{ backgroundColor: "white" }}
      />
    </Box>
  );
};

export default MenuItemsTable;
