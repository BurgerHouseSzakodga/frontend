import { Button } from "@mui/material";
import Box from "@mui/material/Box";
import { DataGrid } from "@mui/x-data-grid";
import { useContext, useState } from "react";
import { OrderContext } from "../context/contexts";

import Modal from "./Modal";
import Loader from "./Loader";

const OrdersTable = () => {
  const { ordersLoading, orders, handleUpdateStatus } =
    useContext(OrderContext);
  const [open, setOpen] = useState(false);
  const [selectedItems, setSelectedItems] = useState([]);

  const handleOpenModal = (items) => {
    setSelectedItems(items);
    setOpen(true);
  };

  const handleCloseModal = () => {
    setOpen(false);
    setSelectedItems([]);
  };

  const handleUpdateOrder = (id, value) => {
    const status = value === "kiszállítva" ? "készül" : "kiszállítva";

    handleUpdateStatus(id, status);
  };

  const rows = [...orders];

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
      renderCell: (params) => {
        const color = params.value === "kiszállítva" ? "success" : "warning";
        return (
          <Button
            onClick={() => handleUpdateOrder(params.id, params.value)}
            color={color}
            variant={color === "success" ? "contained" : "outlined"}
          >
            {params.value.toUpperCase()}
          </Button>
        );
      },
    },
    {
      field: "items",
      headerName: "Részletek",
      width: 200,
    },
  ];

  if (ordersLoading) {
    return <Loader />;
  }

  return (
    <>
      <Box sx={{ height: 400, width: "100%" }}>
        <DataGrid
          rows={rows}
          columns={columns.map((col) => {
            if (col.field === "items") {
              return {
                ...col,
                renderCell: (params) => (
                  <Button
                    variant="outlined"
                    onClick={() => handleOpenModal(params.value)}
                  >
                    Megtekintés
                  </Button>
                ),
              };
            }
            return col;
          })}
          initialState={{
            pagination: {
              paginationModel: {
                pageSize: 5,
              },
            },
            sorting: { sortModel: [{ field: "status", sort: "asc" }] },
          }}
          pageSizeOptions={[5]}
          disableRowSelectionOnClick
        />
      </Box>
      <Modal className="modal" open={open} onCloseModal={handleCloseModal}>
        {selectedItems.map((item, i) => (
          <div key={i}>
            {item.name} x {item.quantity}
          </div>
        ))}
        <form method="dialog">
          <input type="submit" value="ok" />
        </form>
      </Modal>
    </>
  );
};

export default OrdersTable;
