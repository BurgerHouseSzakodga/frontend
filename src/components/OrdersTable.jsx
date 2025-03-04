import { useContext, useState } from "react";

import { Button, Chip } from "@mui/material";
import Box from "@mui/material/Box";
import { DataGrid } from "@mui/x-data-grid";

import { OrderContext } from "../context/contexts";

import Modal from "./Modal";
import Loader from "./Loader";

const OrdersTable = () => {
  const { ordersLoading, orders, handleUpdateStatus } =
    useContext(OrderContext);
  const [open, setOpen] = useState(false);
  const [selectedItems, setSelectedItems] = useState([]);
  const [selectedOrder, setSelectedOrder] = useState({});

  const handleOpenModal = (id, items) => {
    setSelectedItems(items);
    setSelectedOrder(orders.find((order) => order.id === id));
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
    { field: "id", headerName: "ID", type: "number", width: 90 },
    {
      field: "user_name",
      headerName: "Felhasználó",
      width: 150,
    },
    {
      field: "delivery_address",
      headerName: "Szállítási cím",
      width: 200,
      renderCell: (params) =>
        params.value ? (
          "📍 " + params.value
        ) : (
          <Chip label="Átvétel az étteremben" />
        ),
    },
    {
      field: "status",
      headerName: "Státusz",
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
      renderCell: (params) => (
        <Button
          variant="outlined"
          onClick={() => handleOpenModal(params.id, params.value)}
        >
          Megtekintés
        </Button>
      ),
    },
  ];

  if (ordersLoading) {
    return <Loader />;
  }

  return (
    <>
      <Box
        sx={{
          height: "100%",
          width: "100%",
          bgcolor: "background.paper",
        }}
      >
        <DataGrid
          rows={rows}
          columns={columns}
          initialState={{
            pagination: {
              paginationModel: {
                pageSize: 25,
              },
            },
            sorting: { sortModel: [{ field: "status", sort: "asc" }] },
          }}
          pageSizeOptions={[25]}
          disableRowSelectionOnClick
        />
      </Box>
      <Modal className="modal" open={open} onCloseModal={handleCloseModal}>
        {selectedItems.map((item, i) => (
          <div key={i}>
            {item.name} x {item.quantity}
          </div>
        ))}
        <hr />
        {selectedOrder.total} Ft
        <form method="dialog">
          <input type="submit" value="ok" />
        </form>
      </Modal>
    </>
  );
};

export default OrdersTable;
