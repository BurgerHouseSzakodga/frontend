import { useContext, useState } from "react";

import Box from "@mui/material/Box";
import { DataGrid } from "@mui/x-data-grid";
import { Button } from "@mui/material";

import { UserContext } from "../context/contexts";
import { localeText } from "../utils/locale-text";
import usersIcon from "/assets/users.svg";
import Modal from "./Modal";

export default function UsersTable() {
  const [confirmDeleteModalOpen, setConfirmDeleteModalOpen] = useState(false);
  const [confirmChangeModalOpen, setConfirmChangeModalOpen] = useState(false);
  const [selectedUserId, setSelectedUserId] = useState(null);
  const [confirmAction, setConfirmAction] = useState(() => () => {});

  const { users, updateIsAdmin, deleteUser } = useContext(UserContext);

  const handleProcessRowUpdate = async (newRow, oldRow) => {
    if (newRow.is_admin !== oldRow.is_admin) {
      setSelectedUserId(newRow.id);
      setConfirmAction(
        () => () => confirmAdminChange(newRow.id, newRow.is_admin)
      );
      setConfirmChangeModalOpen(true);
    }
    return oldRow;
  };

  const confirmAdminChange = async (id, isAdmin) => {
    try {
      await updateIsAdmin(id, isAdmin);
    } catch (error) {
      console.error("Error updating admin status:", error);
    } finally {
      setConfirmChangeModalOpen(false);
      setSelectedUserId(null);
    }
  };

  const handleDelete = async (id) => {
    setConfirmDeleteModalOpen(true);
    setSelectedUserId(id);
  };

  const onConfirmDelete = async () => {
    try {
      await deleteUser(selectedUserId);
    } catch (error) {
      console.error("Error deleting user:", error);
    } finally {
      setConfirmDeleteModalOpen(false);
      setSelectedUserId(null);
    }
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
          Törlés
        </Button>
      ),
    },
  ];

  return (
    <>
      <Box sx={{ height: 371, width: 848 }}>
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
          sx={{ backgroundColor: "white" }}
        />
      </Box>
      <Modal
        className="modal confirm-modal"
        open={confirmDeleteModalOpen}
        onCloseModal={() => {
          setConfirmDeleteModalOpen(false);
        }}
      >
        <h2>Biztos törlöd ezt a felhasználót?</h2>
        <p>Ha törlöd nem fogod tudni visszavonni többé.</p>
        <form method="dialog">
          <input type="submit" value="mégsem" />
        </form>
        <button onClick={onConfirmDelete}>felhasználó törlése</button>
      </Modal>
      <Modal
        className="modal confirm-modal"
        open={confirmChangeModalOpen}
        onCloseModal={() => {
          setConfirmChangeModalOpen(false);
        }}
      >
        <p>Biztos változtatsz a felhasználó jogosultságán?</p>
        <form method="dialog">
          <input type="submit" value="mégsem" />
        </form>
        <button onClick={confirmAction}>jogosultság megváltoztatása</button>
      </Modal>
    </>
  );
}
