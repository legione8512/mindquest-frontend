import React from "react";
import "./Modal.css";

export default function Modal({ isOpen, title, onClose, children, footer }) {
  if (!isOpen) return null;

  return (
    <div
      className="quest-modal-backdrop"
      onClick={(e) => {
        if (e.target.classList.contains("quest-modal-backdrop")) {
          onClose();
        }
      }}
    >
      <div className="quest-modal">
        <header className="quest-modal-header">
          <h2>{title}</h2>
          <button
            type="button"
            className="quest-modal-close"
            onClick={onClose}
            aria-label="Close"
          >
            ×
          </button>
        </header>

        <div className="quest-modal-body">{children}</div>

        {footer && <footer className="quest-modal-footer">{footer}</footer>}
      </div>
    </div>
  );
}
