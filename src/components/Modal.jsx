import { useEffect, useRef } from "react";
import { createPortal } from "react-dom";

const Modal = ({ open, children, className, onCloseModal }) => {
  const modalRef = useRef();

  useEffect(() => {
    open ? modalRef.current.showModal() : modalRef.current.close();
  }, [open]);

  return createPortal(
    <dialog ref={modalRef} className={className} onClose={onCloseModal}>
      {children}
    </dialog>,
    document.getElementById("modal-root")
  );
};

export default Modal;
