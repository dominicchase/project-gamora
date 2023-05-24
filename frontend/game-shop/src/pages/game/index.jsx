import React from "react";
import { useLocation } from "react-router-dom";
import { Modal } from "../../core/Modal";
import "../../public/css/admin.css";

export const Game = () => {
  const { game } = useLocation().state;

  if (!game) {
    return null;
  }

  console.log(Array.from({ length: game.numInStock }));
  console.log(game.numInStock);

  return (
    <div className="d-flex gap-4">
      {/* <button></button> */}
      <img src={game.image} alt="" />

      <div>
        <span className="span">{game.name}</span>
        <span className="d-block span">${game.price}</span>
        <span className="d-block span">Quantity</span>
        {/* <select>
          {new Array(game.numInStock).map((num, index) => (
            <option value={num}>{index + 1}</option>
          ))}
        </select> */}
        <button>Add to Cart</button>
      </div>
    </div>
  );
};
