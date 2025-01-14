import { Chip } from "@mui/material";
import Box from "@mui/material/Box";
import { DataGrid } from "@mui/x-data-grid";
import { useContext } from "react";
import { OrderContext } from "../context/contexts";

const columns = [
  { field: "id", headerName: "ID", width: 90 },
  {
    field: "user_name",
    headerName: "Felhasználó",
    width: 150,
  },
  {
    field: "total",
    headerName: "Totál",
    type: "number",
    width: 150,
    renderCell: (params) => params.value + " Ft",
  },
  {
    field: "status",
    headerName: "Status",
    width: 150,
    editable: true,
    renderCell: (params) => {
      let color;
      switch (params.value) {
        case "átvéve":
          color = "success";
          break;
        case "készül":
          color = "warning";
          break;
        default:
          color = "default";
      }
      return <Chip label={params.value.toUpperCase()} color={color} />;
    },
  },
];

const OrdersTable = () => {
  const { orders } = useContext(OrderContext);

  const rows = [...orders];

  return (
    <Box sx={{ height: 400, width: "100%" }}>
      <DataGrid
        rows={rows}
        columns={columns}
        initialState={{
          pagination: {
            paginationModel: {
              pageSize: 5,
            },
          },
        }}
        pageSizeOptions={[5]}
        checkboxSelection
        disableRowSelectionOnClick
      />
    </Box>
  );
};

export default OrdersTable;
