import "../sass/components/menu-item-card.css";

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
        <div className="item-body">
          <p className="item-name">{props.name}</p>
          {props.discount_amount > 0 ? (
            <div className="price-container">
              <span className="original-price">{props.price} Ft</span>
              <span className="discounted-price">{Math.round(discountedPrice)} Ft</span>
            </div>
          ) : (
            <>
            <br/>
             <span className="price">{props.price} Ft</span>
            </>
           
          )}
        </div>
      </div>
    </div>
  );
}

export default MenuItemCard;