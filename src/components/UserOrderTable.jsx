import { useContext, useState, useEffect } from 'react';
import { OrderContext } from '../context/contexts';
import '../sass/components/user-order-table.css';

function UserOrderTable() {
  const { userOrders } = useContext(OrderContext); 
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    if (userOrders) {
      setOrders(userOrders);
    }
  }, [userOrders]);

  return (
    <div className="orders-container">
      <div className="orders-header">
        <div>Rendelés azonosító</div>
        <div>Szállítási cím</div>
        <div>Termékek</div>
        <div>Státusz</div>
        <div>Fizetendő</div>
      </div>

      <div className="orders-body">
        {orders.map((order) => (
          <div key={order.id} className="orders-row">
            <div>{order.id}</div>
            {<div className="delivery-address">order.delivery_address </div>? <div className="delivery-address">{order.delivery_address}</div> : <div >Átvétel az étteremben</div>}
            <details>
              <summary>Rendelés megtekintés</summary>
              <div>
                {order.order_items && order.order_items.length > 0 ? (
                  order.order_items.map((item) => (
                    <p key={item.id}>
                      {item.menu_item.name} - {item.menu_item_quantity} db
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