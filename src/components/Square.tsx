import React from "react";
import { Piece } from "../utilities/types/pieces";

interface Props {
  k: number;
  i: number;
  piece: Piece | null;
  handleClick: (i: number, k: number) => void;
  clickNothing: () => void;
  active: boolean;
}

const Square: React.FC<Props> = (props) => {
  const handleClick = () => {
    if (props.piece == null && !props.active) props.clickNothing();
    else props.handleClick(props.i, props.k);
  };

  // Dynamically construct the image path based on the piece's type and color
  const pieceImage =
    props.piece &&
    `/assets/pieces/${props.piece.type[0].toLowerCase()}${props.piece.color[0].toLowerCase()}.png`;

  return (
    <div
      onClick={handleClick}
      className="box"
      style={{
        boxShadow: `0 0 40px 1px ${
          props.active ? (props.piece ? "white" : "black") : "transparent"
        } inset`,
      }}
    >
      {props.piece && (
        <img
          src={pieceImage}
          alt={`${props.piece.color} ${props.piece.type}`}
          style={{ margin: "auto", height: "80%" }}
        />
      )}
    </div>
  );
};

export default Square;
