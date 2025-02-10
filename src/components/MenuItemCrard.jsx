import "../sass/components/menu-item-card.css";
import { Link } from "react-router-dom";

function MenuItemCard(props) {

  return (
    <div>
      <div>
        <div className="image-container">
          <img
            className="item-image"
            src={props.image}
            alt={props.image_path}
          />
        </div>
        <div className="card-body">
          <p className="card-name">{props.name}</p>
          <p className="card-price"></p>
          <p> {props.price} Ft</p>
         
        </div>
      </div>
    </div>
  );
}

export default MenuItemCard;
