import React from "react";
import "./quickcalm.css";

export default function QuickCalmModal({ isOpen, onClose, exercise,children }) { //isOpen {boolean to check if modal is open, onClose {function to close modal}, exercise {object with exercise details}//
  if (!isOpen || !exercise) return null; //if isOpen is false or exercise is null, do not render anything//
    return (
  <section 
    className="qc-modal-backdrop"
    onClick={(e) => {
      if (e.target.className === "qc-modal-backdrop") onClose();
    }}
  >
    <section className="qc-modal">
      <header className="qc-modal-header">
        <h2>{exercise.title}</h2>
        <button
          className="qc-modal-close-btn"
          onClick={onClose}
          aria-label="Close"
        >
          x
        </button>
      </header>

      <section className="qc-modal-body">
        {children} {/* THIS is where your QuickCalm content will appear */}
      </section>

    </section>
  </section>
)};
