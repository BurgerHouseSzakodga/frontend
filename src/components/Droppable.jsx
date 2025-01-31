import { useDroppable } from "@dnd-kit/core";

const Droppable = ({ id, children }) => {
  const { isOver, setNodeRef } = useDroppable({
    id,
  });
  const style = {
    opacity: isOver ? 0.5 : 1,
    transition: "opacity 0.2s ease",
  };

  return (
    <div className="droppable" ref={setNodeRef} style={style}>
      {children}
    </div>
  );
};

export default Droppable;
