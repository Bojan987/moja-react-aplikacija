import React from "react";

export const ValidationComponent = ({ stringLength }) => {
  const validate = (min, max) => {
    if (stringLength < min) return "Text is too short";
    if (stringLength > max) return "Text is too long";
  };
  return <div>{<p>{validate(5, 20)}</p>}</div>;
};
