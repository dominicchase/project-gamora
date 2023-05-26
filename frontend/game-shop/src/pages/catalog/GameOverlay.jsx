import React from "react";
import { useDispatch, useSelector } from "react-redux";
import "../../public/css/admin.css";
import { setCart } from "../../store/reducers/cart";
import "../../public/css/Game.css";
import { ReactComponent as CloseIcon } from "../../public/svg/x-thin.svg";

export const GameOverlay = ({ toggleShowGame, toggleShowCart }) => {
  const dispatch = useDispatch();
  const { game } = useSelector((state) => state.gameState);
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

    // toggleShowGame((prevState) => !prevState);
    toggleShowCart((prevState) => !prevState);
  };

  if (!game) {
    return null;
  }

  return (
    <div className="game-overlay d-flex p-5 gap-4">
      {/* <button></button> */}
      <div className="w-50">
        <img src={game.image} width={"100%"} alt="" />
      </div>

      <div className="w-50">
        <span>{game.name}</span>

        <span className="d-block">${game.price}</span>

        <span className="d-block">Quantity</span>

        <p>
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

        <button onClick={() => toggleShowGame(false)}>
          <CloseIcon />
        </button>
      </div>
    </div>
  );
};
