import React from "react";

export default function Input({ placeholder, type, children }) {
  return (
    <label>
      {children}
      <input placeholder={placeholder} type={type} name={type} />
    </label>
  );
}
