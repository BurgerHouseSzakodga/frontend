import { useContext, useState } from "react";
import { AdminContext, GuestContext } from "../context/contexts";

const ModifyPanel = ({ onCloseModifyPanel, selectedItem }) => {
  const { categories } = useContext(GuestContext);
  const { ingredients } = useContext(AdminContext);

  const [name, setName] = useState(selectedItem.name);
  const [description, setDescription] = useState(selectedItem.description);
  const [price, setPrice] = useState(selectedItem.price);
  const [category, setCategory] = useState(selectedItem.category_id);
  const [composition, setComposition] = useState(selectedItem.compositions);

  const handleSetIngredient = (event) => {
    const ingredientId = parseInt(event.target.id);
    const isChecked = event.target.checked;

    if (isChecked) {
      setComposition([...composition, ingredientId]);
    } else {
      setComposition(composition.filter((id) => id !== ingredientId));
    }
  };

  const handleSubmit = (event) => {
    event.preventDefault();
  };

  return (
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
        <select value={category} onChange={(e) => setCategory(e.target.value)}>
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
      </form>
    </div>
  );
};

export default ModifyPanel;
