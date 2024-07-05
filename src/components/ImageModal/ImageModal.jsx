import ReactModal from "react-modal";
import css from './ImageModal.module.css'
import { useEffect } from "react";

export default function ImageModal({ isOpen, onRequestClose, image }) {
  useEffect(() => {
    const handleEsc = (event) => {
      if (event.key === "Escape") {
        onRequestClose();
      }
    };
    window.addEventListener("keydown", handleEsc);
    return () => {
      window.removeEventListener("keydown", handleEsc);
    };
  }, [onRequestClose]);

  const handleOverlayClick = (event) => {
    if (event.target === event.currentTarget) {
      onRequestClose();
    }
  };

  return (
    <ReactModal
      isOpen={isOpen}
      onRequestClose={onRequestClose}
      className={css.modal}
      overlayClassName={css.overlay}
      shouldCloseOnOverlayClick={true}
    >
      <div className={css.content} onClick={handleOverlayClick}>
        <img src={image.url} alt={image.description} className={css.image} />
        <div>
          <p>{image.description}</p>
          <p>{image.author}</p>
          <p>{image.likes} likes</p>
        </div>
      </div>
    </ReactModal>
  );
}
