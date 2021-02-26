import React from "react";
import { InlineBox } from "../Styled";

export const CharComponent = ({ character, onDelete, id }) => {
  return (
    <InlineBox
      onClick={() => {
        onDelete(id);
      }}
    >
      <p>{character}</p>
    </InlineBox>
  );
};
