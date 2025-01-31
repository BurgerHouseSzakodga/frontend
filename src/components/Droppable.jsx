import { useDroppable } from "@dnd-kit/core";

const Droppable = ({ id, children }) => {
  const { isOver, setNodeRef } = useDroppable({
    id,
  });
  const style = {
    border: isOver ? "2px solid green" : "2px dashed #757575",
    transition: "150ms ease-in-out",
  };

  return (
    <div className="droppable" ref={setNodeRef} style={style}>
      {children}
    </div>
  );
};

export default Droppable;
