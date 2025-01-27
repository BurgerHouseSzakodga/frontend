import { useContext, useState } from "react";

import Box from "@mui/material/Box";
import { DataGrid } from "@mui/x-data-grid";

import Modal from "./Modal";
import { UserContext } from "../context/contexts";
import { localeText } from "../utils/locale-text";
import { createUsersColumns } from "../utils/table-columns";
import usersIcon from "/assets/users.svg";
import waringIcon from "/assets/warning.svg";

export default function UsersTable() {
  const [confirmDeleteModalOpen, setConfirmDeleteModalOpen] = useState(false);
  const [confirmChangeModalOpen, setConfirmChangeModalOpen] = useState(false);
  const [selectedUserId, setSelectedUserId] = useState(null);
  const [confirmAction, setConfirmAction] = useState(() => () => {});

  const { users, userLoading, updateIsAdmin, deleteUser } =
    useContext(UserContext);

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

  const columns = createUsersColumns(usersIcon, handleDelete);

  if (userLoading) {
    return <div className="loader"></div>;
  }

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
        <img src={waringIcon} />
        <h2>Biztos törlöd ezt a felhasználót?</h2>
        <p>Ha törlöd nem fogod tudni visszavonni többé.</p>
        <div>
          <form method="dialog">
            <input type="submit" value="Mégsem" />
          </form>
          <button onClick={onConfirmDelete}>Felhasználó törlése</button>
        </div>
      </Modal>
      <Modal
        className="modal confirm-modal"
        open={confirmChangeModalOpen}
        onCloseModal={() => {
          setConfirmChangeModalOpen(false);
        }}
      >
        <img src={waringIcon} />
        <p>Biztos változtatsz a felhasználó jogosultságán?</p>
        <div>
          <form method="dialog">
            <input type="submit" value="Mégsem" />
          </form>
          <button onClick={confirmAction}>Jogosultság megváltoztatása</button>
        </div>
      </Modal>
    </>
  );
}
