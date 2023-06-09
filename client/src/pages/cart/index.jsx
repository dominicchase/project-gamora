import { useDispatch, useSelector } from "react-redux";
import useAuth from "../../hooks/useAuth";
import { useAxiosPrivate } from "../../hooks/useAxiosPrivate";
import { setCart } from "../../store/reducers/CartReducer";
import { toast } from "react-hot-toast";
import { useEffect } from "react";

export const Cart = () => {
  const dispatch = useDispatch();
  const { id } = useAuth();
  const axiosPrivate = useAxiosPrivate();

  useEffect(() => {
    const getCart = async () => {
      if (id) {
        const response = await axiosPrivate.get(`/cart/?id=${id}`);
        dispatch(setCart(response.data.games));
      }
    };
    getCart();
  }, []);

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
    }
  };

  const handlePayment = async () => {
    const cartGameIds = cart.map((cartGame) => cartGame._id);
    const response = await axiosPrivate.post(`/pay/?userId=${id}`, cartGameIds);

    dispatch(setCart([]));

    window.location.href = response.data.url;
  };

  const description =
    "Persona 5 is a fantasy based on reality which follows a group of troubled high school students: the protagonist and a collection of compatriots he meets along the way. ";

  return (
    <>
      {cart.length ? (
        cart.map((cartGame) => (
          <div
            className="d-flex gap-4 bottom-border px-4 py-4"
            key={`cart-game-${cartGame.game._id}`}
          >
            <img
              className="col-5 col-md-3 col-lg-2 game-img"
              src={cartGame.game.image}
            />

            <div className="col">
              <div className="d-flex justify-content-between mb-3">
                <span className="h5">{cartGame.game.name}</span>

                <span className="h5 d-none d-md-block">
                  {cartGame.game.price}
                </span>
              </div>

              <span className="h6 d-block d-md-none mb-3">
                {cartGame.game.price}
              </span>

              <span className="w-75 d-none d-md-block fw-light mb-4">
                {description}
              </span>

              <span className="d-block mb-3">Qty: {cartGame.quantity}</span>

              <button
                className="h6 btn-no-bg p-0"
                onClick={() => removeFromCart(cartGame._id)}
              >
                Remove
              </button>
            </div>
          </div>
        ))
      ) : (
        <span className="d-block ms-4 mt-4">No cart items</span>
      )}

      {cart.length && (
        <div className="d-flex flex-column align-items-end pt-4 pb-5">
          <strong className="d-block mb-3">
            Subtotal ({numberOfGames}): ${subtotal.toFixed(2)}
          </strong>

          <button className="btn-secondary" onClick={handlePayment}>
            Proceed to Payment
          </button>
        </div>
      )}
    </>
  );
};
