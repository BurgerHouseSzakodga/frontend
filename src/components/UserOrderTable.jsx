import { useContext } from "react";

import { OrderContext } from "../context/contexts";
import Loader from "./Loader";
import "../sass/components/user-order-table.css";

function UserOrderTable() {
  const { userOrders, ordersLoading } = useContext(OrderContext);

  if (ordersLoading) {
    return <Loader />;
  }

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
        {userOrders.length > 0 ? (
          userOrders.map((order) => (
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
                      <>
                        <p>
                          {item.menu_item.name} - {item.buying_price} Ft <br />
                        </p>
                        {item.extras.length > 0 && (
                          <div className="order-details">
                            {item.extras.map((extra) => (
                              <>
                                {extra.quantity > 1 ? (
                                  <small>
                                    + {extra.ingredients.name} (+{" "}
                                    {extra.ingredients.extra_price} ft)
                                  </small>
                                ) : (
                                  <small>- {extra.ingredients.name}</small>
                                )}
                              </>
                            ))}
                          </div>
                        )}
                      </>
                    ))
                  ) : (
                    <p>Nincs termék a rendelésben</p>
                  )}
                </div>
              </details>
              <div>{order.status}</div>
              <div>{order.total} Ft</div>
            </div>
          ))
        ) : (
          <p>Nincsenek rendeléseid.</p>
        )}
      </div>
    </div>
  );
}

export default UserOrderTable;
