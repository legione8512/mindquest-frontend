// Import React so we can create a functional component and use JSX
import React from "react";
// Import the CSS file that defines the .primary-btn styles
import "./PrimaryButton.css";

// Define a reusable button component called PrimaryButton
export default function PrimaryButton({
  type = "button", // prop: the HTML button type (default "button", can be "submit" or "reset")
  className = "", // prop: extra CSS class names passed in by the parent
  children, // prop: inner content of the button (text, icons, etc.) between <PrimaryButton>...</PrimaryButton>
  ...rest // rest: any other props (e.g. onClick, disabled) are collected here
}) {
  // Combine the base "primary-btn" class with any extra classes passed via className
  // .trim() removes any extra space if className is an empty string
  const combinedClassName = `primary-btn ${className}`.trim();

  // Render a normal HTML <button> element
  return (
    <button
      type={type} // Apply the button type (button/submit/reset)
      className={combinedClassName} // Apply the combined CSS classes
      {...rest} // Spread remaining props (onClick, disabled, aria-* etc.)
    >
      {children}{" "}
      {/* Render whatever is inside the component as the button's content */}
    </button>
  );
}
