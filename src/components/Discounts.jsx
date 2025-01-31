import { useContext, useState } from "react";
import { DndContext } from "@dnd-kit/core";

import Draggable from "./Draggable";
import Droppable from "./Droppable";
import { MenuItemContext } from "../context/contexts";

const Discounts = () => {
  const { menuItems } = useContext(MenuItemContext);
  const [leftDroppableItems, setLeftDroppableItems] = useState(menuItems);
  const [rightDroppableItems, setRightDroppableItems] = useState([]);

  const handleDragEnd = ({ active, over }) => {
    if (over && over.id === "left-droppable") {
      setLeftDroppableItems((prevItems) => {
        if (!prevItems.some((item) => item.id === active.id)) {
          const itemToAdd = rightDroppableItems.find(
            (item) => item.id === active.id
          );
          return [...prevItems, itemToAdd];
        }
        return prevItems;
      });

      setRightDroppableItems((prevItems) =>
        prevItems.filter((item) => item.id !== active.id)
      );
    } else if (over && over.id === "right-droppable") {
      setRightDroppableItems((prevItems) => {
        if (!prevItems.some((item) => item.id === active.id)) {
          const itemToAdd = leftDroppableItems.find(
            (item) => item.id === active.id
          );
          return [...prevItems, itemToAdd];
        }
        return prevItems;
      });

      setLeftDroppableItems((prevItems) =>
        prevItems.filter((item) => item.id !== active.id)
      );
    }
  };

  return (
    <div className="discounts">
      <DndContext onDragEnd={handleDragEnd}>
        <div className="discounts__left" id="left-droppable">
          <Droppable id="left-droppable">
            {leftDroppableItems.length > 0
              ? leftDroppableItems.map((item) => (
                  <Draggable key={item.id} id={item.id}>
                    {item.name}
                  </Draggable>
                ))
              : "Drop here"}
          </Droppable>
        </div>
        <div className="discounts__right" id="right-droppable">
          <Droppable id="right-droppable">
            {rightDroppableItems.length > 0
              ? rightDroppableItems.map((item) => (
                  <Draggable key={item.id} id={item.id}>
                    {item.name}
                  </Draggable>
                ))
              : "Original Position"}
          </Droppable>
        </div>
      </DndContext>
    </div>
  );
};

export default Discounts;
