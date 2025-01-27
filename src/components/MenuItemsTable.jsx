import { useContext } from "react";

import Box from "@mui/material/Box";
import { DataGrid } from "@mui/x-data-grid";

import { CategoryContext, MenuItemContext } from "../context/contexts";
import { localeText } from "../utils/locale-text";
import { createMenuItemColumns } from "../utils/table-columns";

const MenuItemsTable = ({ modifiable, onSelectModify }) => {
  const { categories } = useContext(CategoryContext);
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
    onSelectModify(true, id);
    window.scrollTo({ top: 100, behavior: "smooth" });
  };

  const data = createMenuItemColumns(modifiable, categories, handleModify);

  if (menuItemLoading) {
    return <div className="loader"></div>;
  }

  return (
    <Box sx={{ height: 371, width: 848 }}>
      <DataGrid
        rows={[...menuItems]}
        columns={[...data]}
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
