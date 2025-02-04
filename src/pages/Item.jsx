import { useContext, useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { MenuItemContext, IngredientContext } from '../context/contexts';

function Item() {
    const { id } = useParams();
    const navigate = useNavigate();
    const { menuItems } = useContext(MenuItemContext);
    const { ingredients } = useContext(IngredientContext);
    const [loading, setLoading] = useState(true);
    //const [itemIngredients, setItemIngredients] = useState([{name: ingredients.name},{id: ingredients.id}, {quantiny: ingredients.quantiny}]);

    const item = menuItems.find(item => item.id === parseInt(id));

    // Using compositions instead of ingredient_ids
    const itemIngredients = item?.compositions?.map(compositionId =>
        ingredients?.find(ing => ing.id === compositionId)
    ).filter(Boolean);

    console.log('Item:', item);
    console.log('Compositions:', item?.compositions);
    console.log('All Ingredients:', ingredients);
    console.log('Filtered ItemIngredients:', itemIngredients);

    useEffect(() => {
        if (item && ingredients) {
            setLoading(false);
        }
    }, [item, ingredients]);

    if (loading) return <div className="loading">Betöltés...</div>;

    return (
        <div className="item-details">
            <div className="item-header">
                <img src={item.image_path} alt={item.name} />
                <div className="item-info">
                    <h1>{item.name}</h1>
                    <p className="description">{item.description}</p>
                    <p className="price">{item.price} Ft</p>
                </div>
            </div>

            <div className="ingredients-section">
                <h2>Összetevők:</h2>

                <form>

                    {itemIngredients && itemIngredients.length > 0 ? (
                        <div className="ingredients-list">
                            {itemIngredients.map(ingredient => (
                                <span key={ingredient.id} className="ingredient">
                                       <input type="number" value="1" name="INGREDIENT" min="0" max="3"/> {ingredient.name} {ingredient.extra_price} Ft
                                </span>
                            ))}
                        </div>
                    ) : (
                        <p>Nincsenek elérhető összetevők</p>
                    )}


                    <button type="submit">Rendelés</button>
                </form>

            </div>
        </div>
    );
}

export default Item;