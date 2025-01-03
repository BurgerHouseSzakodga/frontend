import { useContext, useEffect, useState } from "react";

import MenuItemsTable from "../components/MenuItemsTable";
import { AdminContext, GuestContext } from "../context/contexts";
import ModifyPanel from "../components/ModifyPanel";
import nameIcon from "/assets/name.svg";
import descriptionIcon from "/assets/description.svg";
import priceIcon from "/assets/price.svg";
import categoryIcon from "/assets/category.svg";

const ManageMenuItems = () => {
  const { categories, menuItems } = useContext(GuestContext);
  const { handleCreateMenuItem, ingredients } = useContext(AdminContext);

  const [isEditing, setIsEditing] = useState(false);
  const [selectedMenuItem, setSelectedMenuItem] = useState(
    menuItems[0] || null
  );

  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [category, setCategory] = useState("");
  const [composition, setComposition] = useState([]);
  const [image, setImage] = useState(null);

  useEffect(() => {
    if (categories.length) {
      setCategory(categories[0].id);
    }
  }, [categories]);

  const handleSetIngredient = (event) => {
    const ingredientId = event.target.id;
    const isChecked = event.target.checked;

    if (isChecked) {
      setComposition([...composition, ingredientId]);
    } else {
      setComposition(composition.filter((id) => id !== ingredientId));
    }
  };

  const handleClickEdit = (isEditing, id) => {
    setIsEditing(isEditing);

    if (!id) return;

    setSelectedMenuItem(menuItems.find((item) => item.id === id));
  };

  const onCreateMenuItem = (event) => {
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

    handleCreateMenuItem(formData);
  };

  return (
    <div className="manage-menu-items">
      <div className="menu-item-form">
        {isEditing ? (
          <ModifyPanel
            onCloseModifyPanel={handleClickEdit}
            selectedItem={selectedMenuItem}
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
                required
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
                required
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
                  required
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
                  required
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
              <label htmlFor="menu-item-image">Kép</label>
              <input
                onChange={(e) => setImage(e.target.files[0])}
                type="file"
                accept="image/*"
                name="menu-item-image"
                id="menu-item-image"
                multiple={false}
              />
            </div>
            <div className="ingredients">
              {ingredients.map((ingredient) => (
                <div key={ingredient.id}>
                  <input
                    onClick={handleSetIngredient}
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
    </div>
  );
};
export default ManageMenuItems;
