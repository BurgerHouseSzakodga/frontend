import { useContext, useState } from "react";

import Box from "@mui/material/Box";
import { DataGrid } from "@mui/x-data-grid";

import { OrderContext } from "../context/contexts";

import Modal from "./Modal";
import Loader from "./Loader";
import { localeText } from "../utils/locale-text";
import waringIcon from "/assets/warning.svg";
import { createOrdersColumns } from "../utils/table-columns";

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

  const columns = createOrdersColumns(
    handleUpdateOrder,
    handleOpenModal,
    handleDelete
  );

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
      <Modal
        className="modal orders-table__modall"
        open={open}
        onCloseModal={handleCloseModal}
      >
        {selectedItems.map((item, i) => (
          <div key={i}>
            {item.menu_item.name} x {item.buying_price} Ft
            <div>
              {item.extras.map((extra) => (
                <small key={extra.id}>
                  {extra.quantity > 1 ? (
                    <>
                      + {extra.ingredients.name}
                      (+ {extra.ingredients.extra_price} Ft)
                    </>
                  ) : (
                    <> - {extra.ingredients.name}</>
                  )}
                </small>
              ))}
            </div>
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
