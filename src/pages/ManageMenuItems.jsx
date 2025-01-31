import { useContext, useEffect, useState } from "react";

import { Alert, Snackbar } from "@mui/material";

import {
  CategoryContext,
  IngredientContext,
  MenuItemContext,
} from "../context/contexts";
import MenuItemsTable from "../components/MenuItemsTable";
import ModifyPanel from "../components/ModifyPanel";
import Discounts from "../components/Discounts";
import ImageDropzone from "../components/ImageDropZone";
import nameIcon from "/assets/name.svg";
import descriptionIcon from "/assets/description.svg";
import priceIcon from "/assets/price.svg";
import categoryIcon from "/assets/category.svg";

const ManageMenuItems = () => {
  const { categories, categoriesLoading } = useContext(CategoryContext);
  const { ingredients, ingredientLoading } = useContext(IngredientContext);
  const { handleCreateMenuItem } = useContext(MenuItemContext);

  const [isEditing, setIsEditing] = useState(false);
  const [selectedMenuItemId, setSelectedMenuItemId] = useState(null);

  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [category, setCategory] = useState("");
  const [composition, setComposition] = useState([]);
  const [image, setImage] = useState(null);

  const [open, setOpen] = useState(false);
  const [resetImage, setResetImage] = useState(false);

  useEffect(() => {
    if (categories.length) {
      setCategory(categories[0].id);
    }
  }, [categories]);

  const handleSetIngredient = (event) => {
    const ingredientId = parseInt(event.target.id);
    const isChecked = event.target.checked;

    if (isChecked) {
      setComposition([...composition, ingredientId]);
    } else {
      setComposition(composition.filter((id) => id !== ingredientId));
    }
  };

  const onCreateMenuItem = async (event) => {
    event.preventDefault();

    const formData = new FormData();

    formData.append("name", name);
    formData.append("description", description);
    formData.append("price", price);
    formData.append("category_id", category);
    composition.forEach((ingredientId, index) => {
      formData.append(`composition[${index}]`, ingredientId);
    });

    if (image) {
      formData.append("image", image);
    }

    const success = await handleCreateMenuItem(formData);

    if (success) {
      setOpen(true);
      setName("");
      setDescription("");
      setPrice("");
      setComposition([]);
      setImage(null);
      setResetImage(true);
    }
  };

  useEffect(() => {
    if (resetImage) {
      setResetImage(false);
    }
  }, [resetImage]);

  const handleClickEdit = (isEditing, id) => {
    setIsEditing(isEditing);

    if (!id) return;

    setSelectedMenuItemId(id);
  };

  const handleClose = (reason) => {
    if (reason === "clickaway") {
      return;
    }
    setOpen(false);
  };

  if (categoriesLoading || ingredientLoading) {
    return <div className="loader"></div>;
  }

  return (
    <div className="manage-menu-items">
      <div className="menu-item-form">
        {isEditing ? (
          <ModifyPanel
            key={selectedMenuItemId}
            onCloseModifyPanel={handleClickEdit}
            selectedItemId={selectedMenuItemId}
          />
        ) : (
          <form onSubmit={onCreateMenuItem}>
            <div>
              <label htmlFor="menu-item-name">Név</label>
              <img className="icon" src={nameIcon} />
              <input
                onChange={(e) => setName(e.target.value)}
                value={name}
                maxLength={25}
                type="text"
                placeholder="Név"
                name="menu-item-name"
                id="menu-item-name"
              />
            </div>
            <div>
              <label htmlFor="menu-item-description">Leírás</label>
              <img className="icon" src={descriptionIcon} />
              <textarea
                onChange={(e) => setDescription(e.target.value)}
                value={description}
                maxLength={100}
                name="menu-item-description"
                id="menu-item-description"
                placeholder="Leírás"
              ></textarea>
            </div>
            <div className="input-group">
              <div>
                <label htmlFor="menu-item-price">Ár</label>
                <img className="icon" src={priceIcon} />
                <input
                  onChange={(e) => setPrice(e.target.value)}
                  value={price}
                  max={100000}
                  min={1}
                  type="number"
                  name="menu-item-price"
                  id="menu-item-price"
                  placeholder="Ár"
                />
              </div>
              <div>
                <label htmlFor="menu-item-category">Kategória</label>
                <img className="icon" src={categoryIcon} />
                <select
                  onChange={(e) => setCategory(e.target.value)}
                  value={category}
                  name="menu-item-category"
                  id="menu-item-category"
                >
                  {categories.map((category) => (
                    <option key={category.id} value={category.id}>
                      {category.name}
                    </option>
                  ))}
                </select>
              </div>
            </div>
            <div>
              <label>Kép</label>
              <ImageDropzone onDropImage={setImage} reset={resetImage} />
            </div>
            <label>Összetevők</label>
            <div className="ingredients">
              {ingredients.map((ingredient) => (
                <div key={ingredient.id}>
                  <input
                    checked={composition.includes(ingredient.id)}
                    onChange={handleSetIngredient}
                    type="checkbox"
                    id={ingredient.id}
                    name={ingredient.id}
                  />
                  <label htmlFor={ingredient.id}>{ingredient.name}</label>
                </div>
              ))}
            </div>
            <input type="submit" value="Étel létrehozása" />
          </form>
        )}
      </div>
      <MenuItemsTable modifiable={true} onSelectModify={handleClickEdit} />
      <Discounts />
      <Snackbar open={open} autoHideDuration={6000} onClose={handleClose}>
        <Alert
          onClose={handleClose}
          severity="success"
          variant="filled"
          sx={{ width: "100%" }}
        >
          Étel sikeresen létrehozva.
        </Alert>
      </Snackbar>
    </div>
  );
};
export default ManageMenuItems;
