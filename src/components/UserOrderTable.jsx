import { useContext } from "react";
import { OrderContext } from "../context/contexts";
import "../sass/components/user-order-table.css";

function UserOrderTable() {
  const { userOrders } = useContext(OrderContext);

  return (
    <div className="orders-container">
      <h3>Rendeléseim</h3>
      <div className="orders-header">
        <div>Azonosító</div>
        <div>Szállítási cím</div>
        <div>Termékek</div>
        <div>Státusz</div>
        <div>Fizetendő</div>
      </div>

      <div className="orders-body">
        {userOrders.map((order) => (
          <div key={order.id} className="orders-row">
            <div>{order.id}</div>
            {order.delivery_address ? (
              <div className="delivery-address">{order.delivery_address}</div>
            ) : (
              <div>Átvétel az étteremben📍</div>
            )}
            <details>
              <summary>Rendelés megtekintés</summary>
              <div>
                {order.order_items && order.order_items.length > 0 ? (
                  order.order_items.map((item) => (
                    <p key={item.id}>
                      {item.menu_item.name} - {item.buying_price} Ft <br/>
                    </p>
                  ))
                ) : (
                  <p>Nincs termék a rendelésben</p>
                )}
              </div>
            </details>
            <div>{order.status}</div>
            <div>{order.total} Ft</div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default UserOrderTable;
