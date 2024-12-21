import { useContext } from "react";

import Box from "@mui/material/Box";
import { DataGrid } from "@mui/x-data-grid";

import { AdminContext } from "../context/contexts";
import { localeText } from "../utils/locale-text";

const columns = [
  { field: "id", headerName: "ID", width: 90, editable: false },
  {
    field: "name",
    headerName: "Név",
    width: 150,
    editable: false,
  },
  {
    field: "email",
    headerName: "Email",
    width: 200,
    editable: false,
  },
  {
    field: "is_admin",
    headerName: "Admin",
    type: "boolean",
    width: 110,
    editable: true,
  },
];

export default function UsersTable() {
  const { users, updateIsAdmin } = useContext(AdminContext);

  const handleProcessRowUpdate = async (newRow, oldRow) => {
    if (newRow.is_admin !== oldRow.is_admin) {
      await updateIsAdmin(newRow.id, newRow.is_admin);
    }
    return newRow;
  };

  return (
    <Box sx={{ height: 400, width: 600 }}>
      <DataGrid
        rows={[...users]}
        columns={columns}
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
      />
    </Box>
  );
}
