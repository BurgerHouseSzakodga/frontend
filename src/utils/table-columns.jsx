import { Button, MenuItem, Select } from "@mui/material";

export const createMenuItemColumns = (modifiable, categories, handleModify) => {
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
    { field: "id", headerName: "ID", width: width / 3, editable: false },
    {
      field: "name",
      headerName: "Név",
      width,
      editable: true,
    },
    {
      field: "price",
      headerName: "Ár",
      width,
      editable: true,
      renderCell: (params) => params.value + " Ft",
    },
    {
      field: "category_name",
      headerName: "Kategória",
      width,
      editable: true,
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

  return columns;
};
