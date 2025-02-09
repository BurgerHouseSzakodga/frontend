import { useContext, useState } from "react";

import {
  CategoryContext,
  IngredientContext,
  MenuItemContext,
} from "../context/contexts";
import Modal from "./Modal";
import exitIcon from "/assets/exit.svg";
import { Alert, Snackbar } from "@mui/material";
import ImageDropzone from "./ImageDropZone";
import waringIcon from "/assets/warning.svg";

const ModifyPanel = ({ onCloseModifyPanel, selectedItemId }) => {
  const {
    menuItems,
    handleDeleteMenuItem,
    handleUpdateMenuItemCategory,
    handleUpdateMenuItemName,
    handleUpdateMenuItemPrice,
    handleUpdateMenuItemDescription,
    handleUpdateMenuItemComposition,
    handleUpdateMenuItemImage,
  } = useContext(MenuItemContext);
  const { categories } = useContext(CategoryContext);
  const { ingredients } = useContext(IngredientContext);

  const selectedItem = menuItems.find((item) => item.id === selectedItemId);

  const [open, setOpen] = useState(false);

  const [name, setName] = useState(selectedItem.name);
  const [description, setDescription] = useState(selectedItem.description);
  const [price, setPrice] = useState(selectedItem.price);
  const [category, setCategory] = useState(selectedItem.category_id);
  const [composition, setComposition] = useState(selectedItem.compositions);
  const [confirmDeleteModalOpen, setConfirmDeleteModalOpen] = useState(false);
  const [image, setImage] = useState(null);

  const handleSetIngredient = (event) => {
    const ingredientId = parseInt(event.target.id);
    const isChecked = event.target.checked;

    if (isChecked) {
      setComposition((prevComposition) => [...prevComposition, ingredientId]);
    } else {
      setComposition((prevComposition) =>
        prevComposition.filter((id) => id !== ingredientId)
      );
    }
  };

  const onDeleteMenuItem = () => {
    setConfirmDeleteModalOpen(true);
  };

  const onConfirmDelete = async () => {
    onCloseModifyPanel(false, null);
    if (await handleDeleteMenuItem(selectedItem.id)) {
      setOpen(true);
    }
  };

  const handleClose = (reason) => {
    if (reason === "clickaway") {
      return;
    }
    setOpen(false);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (
      (await handleUpdateMenuItemName(selectedItem.id, name)) &&
      (await handleUpdateMenuItemPrice(selectedItem.id, price)) &&
      (await handleUpdateMenuItemCategory(selectedItem.id, category)) &&
      (await handleUpdateMenuItemDescription(selectedItem.id, description)) &&
      (await handleUpdateMenuItemComposition(selectedItem.id, composition))
    ) {
      if (image) {
        if (await handleUpdateMenuItemImage(selectedItem.id, image)) {
          setOpen(true);
        }
      } else {
        setOpen(true);
      }
    }
  };

  return (
    <>
      <div className="modify-panel">
        <div className="modify-panel__header">
          <img onClick={() => onCloseModifyPanel(false, null)} src={exitIcon} />
          <label htmlFor="image">Kép</label>
          <ImageDropzone
            name="image"
            onDropImage={setImage}
            imageSource={selectedItem.image_path}
          />
        </div>
        <form onSubmit={handleSubmit}>
          <div className="modify-panel__input-group">
            <label htmlFor="name">Név</label>
            <input
              name="name"
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </div>
          <div className="modify-panel__input-group">
            <label htmlFor="description">Leírás</label>
            <textarea
              name="description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />
          </div>
          <div className="modify-panel__input-group">
            <label htmlFor="price">Ár</label>
            <input
              name="price"
              type="number"
              value={price}
              onChange={(e) => setPrice(e.target.value)}
            />
          </div>
          <div className="modify-panel__input-group">
            <label htmlFor="category">Kategória</label>
            <select
              name="category"
              value={category}
              onChange={(e) => setCategory(e.target.value)}
            >
              {categories.map((category) => (
                <option key={category.id} value={category.id}>
                  {category.name}
                </option>
              ))}
            </select>
          </div>
          <p>Összetevők</p>
          <div className="ingredients">
            {ingredients.map((ingredient) => (
              <div key={ingredient.id}>
                <input
                  type="checkbox"
                  id={ingredient.id}
                  name={ingredient.id}
                  checked={composition.includes(ingredient.id)}
                  onChange={handleSetIngredient}
                />
                <label htmlFor={ingredient.id}>{ingredient.name}</label>
              </div>
            ))}
          </div>
          <div>
            <div className="modify-panel__button-group">
              <input type="button" value="törlésm" onClick={onDeleteMenuItem} />
              <input type="submit" value="mentés" />
            </div>
          </div>
        </form>
      </div>
      <Modal
        className="modal confirm-modal"
        open={confirmDeleteModalOpen}
        onCloseModal={() => {
          setConfirmDeleteModalOpen(false);
        }}
      >
        <img src={waringIcon} />
        <h2>Biztos törlöd ezt a ételt?</h2>
        <p>Ha törlöd nem fogod tudni visszavonni többé.</p>
        <div>
          <form method="dialog">
            <input type="submit" value="Mégsem" />
          </form>
          <button onClick={onConfirmDelete}>Étel törlése</button>
        </div>
      </Modal>
      <Snackbar open={open} autoHideDuration={6000} onClose={handleClose}>
        <Alert
          onClose={handleClose}
          severity="success"
          variant="filled"
          sx={{ width: "100%" }}
        >
          Étel sikeresen módosítva.
        </Alert>
      </Snackbar>
    </>
  );
};

export default ModifyPanel;
