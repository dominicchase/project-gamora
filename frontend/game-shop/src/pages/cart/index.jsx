import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { removeGameFromCart } from "../../store/reducers/cart";

export const Cart = () => {
  const dispatch = useDispatch();
  const { cart } = useSelector((state) => state.cartState);

  const sortedCart = [...cart].sort((curr, next) =>
    curr.game.name < next.game.name ? -1 : 1
  );

  const subtotal = cart.reduce(
    (accumulator, cartGame) =>
      accumulator + cartGame.game.price * cartGame.quantity,
    0
  );

  const numberOfGames = cart.reduce(
    (accumulator, cartGame) => accumulator + cartGame.quantity,
    0
  );

  return (
    <div>
      {sortedCart.map((cartGame) => (
        <div className="d-flex px-5 pb-5 mb-5 border-bottom">
          <div className="col-3 me-4">
            <img src={cartGame.game.image} width={"100%"} alt="" />
          </div>

          <div>
            <span className="d-block mb-3">{cartGame.game.name}</span>

            <span className="d-block mb-3">${cartGame.game.price}</span>

            <span className="d-block mb-3">Qty: {cartGame.quantity}</span>

            <button
              className="px-4"
              onClick={() => dispatch(removeGameFromCart(cartGame.game._id))}
            >
              X
            </button>
          </div>
        </div>
      ))}

      <strong className="d-block text-end">
        Subtotal ({numberOfGames} games): ${subtotal}
      </strong>
    </div>
  );
};
