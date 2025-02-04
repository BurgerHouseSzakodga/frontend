import { useDraggable } from "@dnd-kit/core";
import { CSS } from "@dnd-kit/utilities";

import Modal from "./Modal";
import { useState } from "react";
import { useContext } from "react";
import { MenuItemContext } from "../context/contexts";

const Draggable = ({ id, children, isClickable }) => {
  const [open, setOpen] = useState(false);
  const [discountAmount, setDiscounAmount] = useState(15);

  const { handleUpdateDiscount } = useContext(MenuItemContext);
  const { attributes, listeners, setNodeRef, transform } = useDraggable({
    id,
  });
  const style = {
    transform: CSS.Translate.toString(transform),
    transition: "transform 0.1s ease",
  };

  const handleClick = (e) => {
    if (isClickable && e.detail === 2) {
      setOpen(true);
    }
  };

  const handleSubmitForm = () => {
    handleUpdateDiscount(id, discountAmount);
  };

  return (
    <>
      <button
        onPointerDown={(e) => e.preventDefault()}
        onMouseDown={handleClick}
        ref={setNodeRef}
        style={style}
        {...listeners}
        {...attributes}
      >
        {children}
      </button>
      <Modal className="modal" open={open} onCloseModal={() => setOpen(false)}>
        <form method="dialog" onSubmit={handleSubmitForm}>
          <label>Hány százalékos legyen a leárazás?</label>
          <input
            type="number"
            value={discountAmount}
            onChange={(e) => setDiscounAmount(e.target.value)}
            min="1"
            max="100"
          />
          <input type="submit" value="Rendben" />
        </form>
      </Modal>
    </>
  );
};

export default Draggable;
