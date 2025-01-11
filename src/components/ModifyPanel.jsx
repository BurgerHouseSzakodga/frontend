import { useContext, useEffect, useState } from "react";

import {
  CategoryContext,
  IngredientContext,
  MenuItemContext,
} from "../context/contexts";
import Modal from "./Modal";
import exitIcon from "/assets/exit.svg";

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

  useEffect(() => {
    if (selectedItem) {
      setName(selectedItem.name);
      setDescription(selectedItem.description);
      setPrice(selectedItem.price);
      setCategory(selectedItem.category_id);
      setComposition(selectedItem.compositions);
    }
  }, [selectedItem]);

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
      <div className="modify-panel">
        <div className="modify-panel__header">
          <div className="img-container">
            <img src={selectedItem.image_path} />
          </div>
          <img onClick={() => onCloseModifyPanel(false, null)} src={exitIcon} />
        </div>
        <form onSubmit={handleSubmit}>
          <div className="input-group">
            <input
              type="text"
              value={selectedItem.name}
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
    </>
  );
};

export default ModifyPanel;
