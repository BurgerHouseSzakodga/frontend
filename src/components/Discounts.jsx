import { useContext } from "react";
import { DndContext } from "@dnd-kit/core";

import Draggable from "./Draggable";
import Droppable from "./Droppable";
import { MenuItemContext } from "../context/contexts";
import doubleTapIcon from "/assets/double-tap.gif";

const Discounts = () => {
  const {
    discountedItems,
    regularItems,
    setDiscountedItems,
    setRegularItems,
    handleCreateDiscount,
    handleDeleteDiscount,
  } = useContext(MenuItemContext);

  const handleDragEnd = async ({ active, over }) => {
    if (over && over.id === "left-droppable") {
      const itemToAdd = discountedItems.find((item) => item.id === active.id);
      if (itemToAdd) {
        setRegularItems((prevItems) => [...prevItems, itemToAdd]);
        setDiscountedItems((prevItems) =>
          prevItems.filter((item) => item.id !== active.id)
        );
        await handleDeleteDiscount(active.id);
      }
    } else if (over && over.id === "right-droppable") {
      const baseDiscount = 15;
      const itemToAdd = regularItems.find((item) => item.id === active.id);
      if (itemToAdd) {
        setDiscountedItems((prevItems) => [
          ...prevItems,
          { ...itemToAdd, discount_amount: baseDiscount },
        ]);
        setRegularItems((prevItems) =>
          prevItems.filter((item) => item.id !== active.id)
        );
        await handleCreateDiscount(itemToAdd.id, baseDiscount);
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
              <Draggable key={item.id} id={item.id} itemDiscount={0}>
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
              <Draggable
                key={item.id}
                id={item.id}
                isClickable={true}
                itemDiscount={item.discount_amount}
              >
                <div className="image-container">
                  <img src={item.image_path} alt={item.name} loading="lazy" />
                </div>
                {item.name}
                <div className="image-container">
                  <img src={doubleTapIcon} loading="lazy" />
                </div>
              </Draggable>
            ))}
          </Droppable>
        </div>
      </DndContext>
    </div>
  );
};

export default Discounts;
