import { Button, Chip, MenuItem, Select } from "@mui/material";

export const createMenuItemColumns = (
  modifiable,
  categories,
  handleModify,
  isEditing
) => {
  const width = modifiable ? 180 : 225;

  const columns = [
    {
      field: "avatar",
      headerName: "Kép",
      width: width / 3,
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
    {
      field: "id",
      headerName: "ID",
      type: "number",
      width: width / 3,
      editable: false,
    },
    {
      field: "name",
      headerName: "Név",
      width,
      editable: !isEditing,
    },
    {
      field: "category_name",
      headerName: "Kategória",
      width,
      editable: !isEditing,
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
      field: "price",
      headerName: "Alapár",
      width: width / 2,
      type: "number",
      editable: !isEditing,
      renderCell: (params) => params.value + " Ft",
    },

    {
      field: "actual_price",
      headerName: "Akciós ár",
      width: width / 2,
      type: "number",
      renderCell: (params) =>
        params.value === params.row.price ? (
          <Chip label={params.value + " Ft"} />
        ) : (
          <Chip label={params.value + " Ft"} color="warning" />
        ),
    },
  ];

  const data = modifiable
    ? [
        ...columns,
        {
          field: "actions",
          headerName: "Műveletek",
          width,
          renderCell: (params) => (
            <Button
              onClick={() => handleModify(params.id)}
              variant="contained"
              color="primary"
            >
              {modifiable ? "Módosítás" : "Ételek kezelése"}
            </Button>
          ),
        },
      ]
    : [...columns];

  return data;
};

export const createUsersColumns = (usersIcon, handleDelete) => {
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
    {
      field: "id",
      headerName: "ID",
      type: "number",
      width: 90,
      editable: false,
    },
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

  return columns;
};

export const createOrdersColumns = (
  handleUpdateOrder,
  handleOpenModal,
  handleDelete
) => {
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

  return columns;
};
