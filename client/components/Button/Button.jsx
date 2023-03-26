import React from "react";

export default function Button({ handleClick, handleSubmit, children, type }) {
  return (
    <button
      onClick={handleClick}
      onSubmit={handleSubmit}
      className="btn"
      typr={type}
    >
      {children}
    </button>
  );
}
