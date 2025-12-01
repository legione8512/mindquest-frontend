import React from "react";
import "./PrimaryButton.css";

export default function PrimaryButton({
  type = "button",
  className = "",
  children,
  ...rest
}) {
  const combinedClassName = `primary-btn ${className}`.trim();

  return (
    <button type={type} className={combinedClassName} {...rest}>
      {children}
    </button>
  );
}
