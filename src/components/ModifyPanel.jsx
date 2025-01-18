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

  const onConfirmDelete = () => {
    onCloseModifyPanel(false, null);
    handleDeleteMenuItem(selectedItem.id);
  };

  const handleClose = (reason) => {
    if (reason === "clickaway") {
      return;
    }
    setOpen(false);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    await handleUpdateMenuItemName(selectedItem.id, name);
    await handleUpdateMenuItemPrice(selectedItem.id, price);
    await handleUpdateMenuItemCategory(selectedItem.id, category);
    await handleUpdateMenuItemDescription(selectedItem.id, description);
    await handleUpdateMenuItemComposition(selectedItem.id, composition);

    if (image) {
      await handleUpdateMenuItemImage(selectedItem.id, image);
    }

    setOpen(true);
  };

  return (
    <>
      <div className="modify-panel">
        <div className="modify-panel__header">
          <ImageDropzone
            onDropImage={setImage}
            imageSource={selectedItem.image_path}
          />
          <img onClick={() => onCloseModifyPanel(false, null)} src={exitIcon} />
        </div>
        <form onSubmit={handleSubmit}>
          <div className="input-group">
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </div>
          <div className="input-group">
            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />
          </div>
          <div className="input-group">
            <input
              type="number"
              value={price}
              onChange={(e) => setPrice(e.target.value)}
            />
          </div>
          <div className="input-group">
            <select
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
              <button onClick={onDeleteMenuItem}>törlés</button>
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
        <h2>Biztos törlöd ezt a ételt?</h2>
        <p>Ha törlöd nem fogod tudni visszavonni többé.</p>
        <form method="dialog">
          <input type="submit" value="mégsem" />
        </form>
        <button onClick={onConfirmDelete}>étel törlése</button>
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
