import { useContext, useState } from "react";

import { Button, Chip } from "@mui/material";
import Box from "@mui/material/Box";
import { DataGrid } from "@mui/x-data-grid";

import { OrderContext } from "../context/contexts";

import Modal from "./Modal";
import Loader from "./Loader";
import { localeText } from "../utils/locale-text";
import waringIcon from "/assets/warning.svg";

const OrdersTable = () => {
  const { ordersLoading, orders, handleUpdateStatus, handleDeleteOrder } =
    useContext(OrderContext);
  const [open, setOpen] = useState(false);
  const [selectedItems, setSelectedItems] = useState([]);
  const [selectedOrder, setSelectedOrder] = useState({});
  const [confirmDeleteModalOpen, setConfirmDeleteModalOpen] = useState(false);
  const [orderToDeleteId, setOrderToDeleteId] = useState(undefined);

  const handleDelete = async (id) => {
    setOrderToDeleteId(id);
    setConfirmDeleteModalOpen(true);
  };

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

  const rows = (orders || []).map((order) => ({
    ...order,
    user_name: order.user?.name || "N/A",
  }));

  const columns = [
    { field: "id", headerName: "ID", type: "number", width: 90 },
    {
      field: "user_name",
      headerName: "Felhasználó",
      width: 125,
    },
    {
      field: "delivery_address",
      headerName: "Szállítási cím",
      width: 250,
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
      width: 132,
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
      field: "order_items",
      headerName: "Részletek",
      width: 147,
      renderCell: (params) => (
        <Button
          variant="contained"
          onClick={() => handleOpenModal(params.id, params.value)}
        >
          Megtekintés
        </Button>
      ),
    },
    {
      field: "delete",
      headerName: "Törlés",
      width: 115,
      renderCell: (params) => (
        <Button
          variant="outlined"
          color="error"
          onClick={() => handleDelete(params.id)}
        >
          Törlés
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
          localeText={localeText}
        />
      </Box>
      <Modal className="modal" open={open} onCloseModal={handleCloseModal}>
        {selectedItems.map((item, i) => (
          <div key={i}>
            {item.menu_item.name} x {item.buying_price} Ft
          </div>
        ))}
        <hr />
        {selectedOrder.total} Ft
        <form method="dialog">
          <input type="submit" value="ok" />
        </form>
      </Modal>
      <Modal
        className="modal confirm-modal"
        open={confirmDeleteModalOpen}
        onCloseModal={() => {
          setConfirmDeleteModalOpen(false);
        }}
      >
        <img src={waringIcon} />
        <h2>Biztos törlöd ezt a rendelést?</h2>
        <p>Ha törlöd nem fogod tudni visszavonni többé.</p>
        <div>
          <form method="dialog">
            <input type="submit" value="Mégsem" />
          </form>
          <button
            onClick={() => {
              handleDeleteOrder(orderToDeleteId);
              setConfirmDeleteModalOpen(false);
            }}
          >
            Rendelés törlése
          </button>
        </div>
      </Modal>
    </>
  );
};

export default OrdersTable;
