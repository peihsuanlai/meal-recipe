import React from "react";
import { useGlobalContext } from "../context";
import { RxCross2 } from "react-icons/rx";
import { FiExternalLink } from "react-icons/fi";

const Modal = () => {
  const { selectedMeal, closeModal } = useGlobalContext();

  const {
    strMealThumb: image,
    strMeal: title,
    strInstructions: text,
    strSource: source,
  } = selectedMeal;

  return (
    <aside className="modal-overlay">
      <div className="modal-container">
        <RxCross2 className="cross-icon" onClick={closeModal} />
        <img src={image} alt={title} className="img modal-img" />
        <div className="modal-content">
          <h3>{title}</h3>
          <h5>▎ Cooking Instructions</h5>
          <p>{text}</p>
          <a href={source} target="_blank">
            Original Source <FiExternalLink className="link-icon" />
          </a>
        </div>
      </div>
    </aside>
  );
};

export default Modal;
