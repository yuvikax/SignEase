import React from "react";
import "./Modal.css"; // Import the CSS file for styling

const Modal = ({ show, onClose, children }) => {
  if (!show) {
    return null; // Do not render the modal if 'show' is false
  }

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <button className="modal-close" onClick={onClose}>
          &times; {/* Close button */}
        </button>
        {children} {/* Render the content passed as children */}
      </div>
    </div>
  );
};

export default Modal;
