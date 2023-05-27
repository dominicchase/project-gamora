import React from "react";
import { useDispatch, useSelector } from "react-redux";
import "../../assets/css/cart.css";
import { ReactComponent as CloseIcon } from "../../assets/svg/x-thin.svg";
import { useNavigate } from "react-router-dom";
import { getToken } from "../../utils/token";
import { removeGameFromCart } from "../../store/reducers/CartReducer";

export const CartOverlay = ({ toggleShowCart }) => {
  const navigate = useNavigate();

  const dispatch = useDispatch();
  const { cart } = useSelector((state) => state.cartState);

  const sortedCart = [...cart].sort((curr, next) =>
    curr.game.name < next.game.name ? -1 : 1
  );

  const total = cart
    .reduce(
      (accumulator, cartGame) =>
        accumulator + cartGame.game.price * cartGame.quantity,
      0
    )
    .toFixed(2);

  const removeFromCart = (cartGame) => {
    // if guest, use redux/session
    dispatch(removeGameFromCart(cartGame.game._id));

    // otherwise use mongo db and backend
  };

  const handleCheckout = () => {
    if (!!getToken()) {
      toggleShowCart(false);
      navigate("/cart");
    } else {
      toggleShowCart(false);
      navigate("/auth", { state: { checkout: true } });
    }
  };

  return (
    <div className="cart-overlay d-flex justify-content-end">
      <div className="col-3 cart-overlay-content">
        {sortedCart.map((cartGame) => (
          <article className="mb-2" key={`cart-game-${cartGame.game._id}`}>
            <button onClick={() => removeFromCart(cartGame)}>X</button>
            <img className="w-100" src={cartGame.game.image} alt="" />
          </article>
        ))}
      </div>

      <div className="px-5 py-3 col-4 cart-overlay-content">
        <div id="header" className="d-flex justify-content-between">
          <h3 className="span">Cart ({cart.length})</h3>

          <button onClick={() => toggleShowCart(false)}>
            <CloseIcon />
          </button>
        </div>

        <span className="span">Total: ${total}</span>

        <div id="footer" className="d-flex flex-column">
          <button onClick={handleCheckout}>Checkout</button>
        </div>
      </div>
    </div>
  );
};
