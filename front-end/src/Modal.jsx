// Import React so we can create a functional component and use JSX
import React from "react";
// Import the CSS file that styles the modal and its backdrop
import "./Modal.css";

// Reusable modal component
// Props:
// - isOpen: boolean, whether the modal is visible
// - title: string or node, text shown in the header
// - onClose: function, called when the user closes the modal
// - children: content of the modal body
// - footer: optional content rendered in the footer area (e.g. buttons)
export default function Modal({ isOpen, title, onClose, children, footer }) {
  // If isOpen is false, do not render anything at all
  // Returning null means "render nothing" in React
  if (!isOpen) return null;

  // If isOpen is true, render the backdrop and the modal content
  return (
    <div
      className="quest-modal-backdrop" // Full-screen semi-transparent background
      onClick={(e) => {
        // Close the modal only when the user clicks directly on the backdrop,
        // not when clicking inside the modal content
        if (e.target.classList.contains("quest-modal-backdrop")) {
          onClose(); // Call the onClose function passed from parent
        }
      }}
    >
      {/* The actual white modal window in the centre */}
      <div className="quest-modal">
        {/* Modal header: title on the left, close button on the right */}
        <header className="quest-modal-header">
          {/* Render the title prop inside an h2 */}
          <h2>{title}</h2>
          {/* Close (X) button in the top-right corner */}
          <button
            type="button" // Normal button, not a form submit
            className="quest-modal-close"
            onClick={onClose} // When clicked, call onClose
            aria-label="Close" // Accessible label for screen readers
          >
            × {/* The visible "X" symbol */}
          </button>
        </header>

        {/* Main scrollable content area of the modal */}
        <div className="quest-modal-body">
          {children} {/* Render whatever content the parent passes in */}
        </div>

        {/* Optional footer area (e.g. actions/buttons).
            Only render this <footer> if a footer prop was provided. */}
        {footer && (
          <footer className="quest-modal-footer">
            {footer} {/* Render the footer content passed from parent */}
          </footer>
        )}
      </div>
    </div>
  );
}
