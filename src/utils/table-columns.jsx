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
