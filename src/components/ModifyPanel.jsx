import { useContext, useState } from "react";
import {
  CategoryContext,
  IngredientContext,
  MenuItemContext,
} from "../context/contexts";

import Modal from "./Modal";

const ModifyPanel = ({ onCloseModifyPanel, selectedItemId }) => {
  const {
    menuItems,
    handleDeleteMenuItem,
    handleUpdateMenuItemCategory,
    handleUpdateMenuItemName,
    handleUpdateMenuItemPrice,
    handleUpdateMenuItemDescription,
    handleUpdateMenuItemComposition,
  } = useContext(MenuItemContext);
  const { categories } = useContext(CategoryContext);
  const { ingredients } = useContext(IngredientContext);

  const selectedItem = menuItems.find((item) => item.id === selectedItemId);

  const [name, setName] = useState(selectedItem.name);
  const [description, setDescription] = useState(selectedItem.description);
  const [price, setPrice] = useState(selectedItem.price);
  const [category, setCategory] = useState(selectedItem.category_id);
  const [composition, setComposition] = useState(selectedItem.compositions);
  const [confirmDeleteModalOpen, setConfirmDeleteModalOpen] = useState(false);

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

  const handleSubmit = async (event) => {
    event.preventDefault();

    await handleUpdateMenuItemName(selectedItem.id, name);
    await handleUpdateMenuItemPrice(selectedItem.id, price);
    await handleUpdateMenuItemCategory(selectedItem.id, category);
    await handleUpdateMenuItemDescription(selectedItem.id, description);
    await handleUpdateMenuItemComposition(selectedItem.id, composition);
  };

  return (
    <>
      <div>
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
          <input
            type="number"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
          />
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
          <input type="submit" value="mentés" />
          <button onClick={() => onCloseModifyPanel(false, null)}>mégse</button>
          <button onClick={onDeleteMenuItem}>étel törlése</button>
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
    </>
  );
};

export default ModifyPanel;
