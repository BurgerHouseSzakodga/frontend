import "../sass/components/menu-item-card.css";
import { Link, useNavigate } from "react-router-dom";

function MenuItemCard(props) {
  const discountedPrice = props.price - (props.price * props.discount_amount / 100);

  return (
    <div>
      <div>
        <div className="image-container">
          <img
            className="item-image"
            src={props.image}
            alt={props.image_path}
          />
          {props.discount_amount > 0 && (
            <div className="discount-badge">-{props.discount_amount}%</div>
          )}
        </div>
        <div className="card-body">
          <p className="card-name">{props.name}</p>
          {props.discount_amount > 0 ? (
            <div className="price">
              <span className="original-price">{props.price} Ft</span>
              <span className="discounted-price">{Math.round(discountedPrice)} Ft</span>
            </div>
          ) : (
            <p className="card-price">{props.price} Ft</p>
          )}
        </div>
      </div>
    </div>
  );
}

export default MenuItemCard;