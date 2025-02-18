import { useContext, useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { MenuItemContext, IngredientContext } from '../context/contexts';
import '../sass/pages/item.css';

function Item() {
    const { id } = useParams();
    const navigate = useNavigate();
    const { menuItems } = useContext(MenuItemContext);
    const { ingredients } = useContext(IngredientContext);
    const [loading, setLoading] = useState(true);
    const [quantities, setQuantities] = useState({});
    const [totalPrice, setTotalPrice] = useState(0);

    const item = menuItems.find(item => item.id === parseInt(id));

    const itemIngredients = item?.compositions?.map(compositionId =>
        ingredients?.find(ing => ing.id === compositionId)
    ).filter(Boolean);

    const handleQuantityChange = (ingredientId, value) => {
        const newValue = Math.max(0, Math.min(3, parseInt(value) || 0));
        setQuantities(prev => ({
            ...prev,
            [ingredientId]: newValue
        }));
    };

    const calculateTotalPrice = () => {
        if (!item || !itemIngredients) return 0;
        
        const ingredientsPrice = itemIngredients.reduce((sum, ingredient) => {
            const quantity = quantities[ingredient.id] || 0;
            return sum + (ingredient.extra_price * quantity);
        }, 0);

        return item.price + ingredientsPrice;
    };

    
    const capitalizeFirstLetter = (string) => {
        return string.charAt(0).toUpperCase() + string.slice(1);
    };

    useEffect(() => {
        if (item && ingredients) {
            const initialQuantities = {};
            itemIngredients?.forEach(ingredient => {
                initialQuantities[ingredient.id] = 1;
            });
            setQuantities(initialQuantities);
            setLoading(false);
        }
    }, [item, ingredients]);

    useEffect(() => {
        setTotalPrice(calculateTotalPrice());
    }, [quantities, item]);

    if (loading) return <div className="loading">Betöltés...</div>;

    return (
        <div className="item-details">
            <div className="item-header">
                <img src={item.image_path} alt={item.name} />
                <div className="item-info">
                    <h1>{capitalizeFirstLetter(item.name)}</h1>
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
                                    <input 
                                        type="number"
                                        value={quantities[ingredient.id] || 0}
                                        onChange={(e) => handleQuantityChange(ingredient.id, e.target.value)}
                                        name={`ingredient-${ingredient.id}`}
                                        min="0"
                                        max="3"
                                    />
                                    {capitalizeFirstLetter(ingredient.name)} 
                                    {ingredient.extra_price > 0 && ` (+${ingredient.extra_price} Ft)`}
                                </span>
                            ))}
                        </div>
                    ) : (
                        <p>Nincsenek elérhető összetevők</p>
                    )}

                    <div className="total-price">
                        <h3>Teljes ár: {totalPrice} Ft</h3>
                    </div>

                    <button type="submit">Kosárba</button>
                </form>
            </div>
        </div>
    );
}

export default Item;