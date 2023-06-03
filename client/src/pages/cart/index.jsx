import { useDispatch, useSelector } from "react-redux";
import useAuth from "../../hooks/useAuth";
import { useAxiosPrivate } from "../../hooks/useAxiosPrivate";
import { setCart } from "../../store/reducers/CartReducer";
import { toast } from "react-hot-toast";

export const Cart = () => {
  const dispatch = useDispatch();
  const { id } = useAuth();
  const axiosPrivate = useAxiosPrivate();

  const { cart } = useSelector((state) => state.cartState);

  const subtotal = cart.reduce(
    (accumulator, cartGame) =>
      accumulator + cartGame.game.price * cartGame.quantity,
    0
  );

  const numberOfGames = cart.reduce(
    (accumulator, cartGame) => accumulator + cartGame.quantity,
    0
  );

  const removeFromCart = async (cartGameId) => {
    console.log("here");

    if (id) {
      const response = await axiosPrivate.get(
        `/cart/remove-from-cart/?id=${cartGameId}`
      );

      toast.success("Removed from cart");

      dispatch(setCart(response.data.games));
    } else {
      const cartComplement = cart.filter(
        (cartGame) => cartGame._id !== cartGameId
      );

      console.log("here");

      console.log(cartComplement);
    }
  };

  const handlePayment = async () => {
    const cartGameIds = cart.map((cartGame) => cartGame._id);
    const response = await axiosPrivate.post(`/pay/?userId=${id}`, cartGameIds);

    dispatch(setCart([]));

    window.location.href = response.data.url;
  };

  return (
    <div>
      {cart.length ? (
        cart.map((cartGame) => (
          <div
            className="d-flex px-5 pb-5 mb-5 border-bottom"
            key={`cart-game-${cartGame.game._id}`}
          >
            <div className="col-3 me-4">
              <img src={cartGame.game.image} width={"100%"} alt="" />
            </div>

            <div>
              <span className="d-block mb-3">{cartGame.game.name}</span>

              <span className="d-block mb-3">${cartGame.game.price}</span>

              <span className="d-block mb-3">Qty: {cartGame.quantity}</span>

              <button
                className="px-4"
                onClick={() => dispatch(removeFromCart(cartGame._id))}
              >
                X
              </button>
            </div>
          </div>
        ))
      ) : (
        <span>No cart items</span>
      )}

      <div className="d-flex flex-column align-items-end">
        <strong className="d-block mb-3">
          Subtotal ({numberOfGames} games): ${subtotal}
        </strong>

        <button onClick={handlePayment}>Proceed to Payment</button>
      </div>
    </div>
  );
};
