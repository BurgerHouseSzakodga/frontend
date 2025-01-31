import { useContext, useEffect, useState } from "react";
import { DndContext } from "@dnd-kit/core";

import Draggable from "./Draggable";
import Droppable from "./Droppable";
import { MenuItemContext } from "../context/contexts";

const Discounts = () => {
  const { menuItems, discounts, handleCreateDiscount } =
    useContext(MenuItemContext);

  const [regularItems, setRegularItems] = useState([]);
  const [discountedItems, setDiscountedItems] = useState([]);

  useEffect(() => {
    setRegularItems(
      menuItems.filter(
        (item) =>
          !discounts.some((discount) => discount.menu_item_id === item.id)
      )
    );
    setDiscountedItems(
      menuItems.filter((item) =>
        discounts.some((discount) => discount.menu_item_id === item.id)
      )
    );
  }, [discounts, menuItems]);

  const handleDragEnd = async ({ active, over }) => {
    if (over && over.id === "left-droppable") {
      setRegularItems((prevItems) => {
        if (!prevItems.some((item) => item.id === active.id)) {
          const itemToAdd = discountedItems.find(
            (item) => item.id === active.id
          );
          return [...prevItems, itemToAdd];
        }
        return prevItems;
      });

      setDiscountedItems((prevItems) =>
        prevItems.filter((item) => item.id !== active.id)
      );
    } else if (over && over.id === "right-droppable") {
      setDiscountedItems((prevItems) => {
        if (!prevItems.some((item) => item.id === active.id)) {
          const itemToAdd = regularItems.find((item) => item.id === active.id);
          return [...prevItems, itemToAdd];
        }
        return prevItems;
      });

      setRegularItems((prevItems) =>
        prevItems.filter((item) => item.id !== active.id)
      );

      const itemToAdd = regularItems.find((item) => item.id === active.id);
      if (itemToAdd) {
        await handleCreateDiscount(itemToAdd.id, 15);
      }
    }
  };

  return (
    <div className="discounts">
      <DndContext onDragEnd={handleDragEnd}>
        <div className="discounts__left" id="left-droppable">
          <h4>Termékek</h4>
          <Droppable id="left-droppable">
            {regularItems.map((item) => (
              <Draggable key={item.id} id={item.id}>
                <div className="image-container">
                  <img src={item.image_path} alt={item.name} loading="lazy" />
                </div>
                {item.name}
              </Draggable>
            ))}
          </Droppable>
        </div>
        <div className="discounts__right" id="right-droppable">
          <h4>Leárazás</h4>
          <Droppable id="right-droppable">
            {discountedItems.map((item) => (
              <Draggable key={item.id} id={item.id}>
                <div className="image-container">
                  <img src={item.image_path} alt={item.name} loading="lazy" />
                </div>
                {item.name}
              </Draggable>
            ))}
          </Droppable>
        </div>
      </DndContext>
    </div>
  );
};

export default Discounts;
