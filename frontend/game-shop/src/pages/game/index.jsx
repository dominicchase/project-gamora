import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useLocation } from "react-router-dom";
import "../../public/css/admin.css";
import { setCart } from "../../store/reducers/cart";

export const Game = () => {
  const dispatch = useDispatch();
  const { game } = useLocation().state;

  const { cart } = useSelector((state) => state.cartState);

  const cartGame = cart
    ? cart.find((cartGame) => cartGame.game._id === game._id)
    : null;

  const cartComplement = cart
    ? cart.filter((cartGame) => cartGame.game._id !== game._id)
    : null;

  const handleAddToCart = () => {
    const newCartGame = { game, quantity: 1 };

    if (!cart) {
      dispatch(setCart([newCartGame]));
    } else {
      if (cartGame) {
        dispatch(
          setCart([
            ...cartComplement,
            { ...cartGame, quantity: cartGame.quantity + 1 },
          ])
        );
      } else {
        dispatch(setCart([...cart, newCartGame]));
      }
    }
  };

  // const cartGame = cart?.find((cartGame) => cartGame?.game._id === game._id);

  if (!game) {
    return null;
  }

  return (
    <div className="d-flex gap-4">
      {/* <button></button> */}
      <img src={game.image} alt="" />

      <div>
        <span className="span">{game.name}</span>

        <span className="d-block span">${game.price}</span>

        <span className="d-block span">Quantity</span>

        <p className="span">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
          eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad
          minim veniam, quis nostrud exercitation ullamco laboris nisi ut
          aliquip ex ea commodo consequat. Duis aute irure dolor in
          reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla
          pariatur. Excepteur sint occaecat cupidatat non proident, sunt in
          culpa qui officia deserunt mollit anim id est laborum.
        </p>

        <button
          onClick={handleAddToCart}
          disabled={cartGame ? cartGame.quantity === game.numInStock : false}
        >
          Add to Cart
        </button>
      </div>
    </div>
  );
};
