import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { setCart } from "../../store/reducers/CartReducer";
import useAuth from "../../hooks/useAuth";
import { useAxiosPrivate } from "../../hooks/useAxiosPrivate";
import { ReactComponent as CloseIcon } from "../../assets/svg/x-thin.svg";
import "../../assets/css/cart.css";
import { toast } from "react-hot-toast";

export const CartOverlay = ({ toggleShowCart }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { cart } = useSelector((state) => state.cartState);
  console.log(cart);

  const { id } = useAuth();
  const axiosPrivate = useAxiosPrivate();

  const total = cart?.length
    ? cart
        .reduce(
          (accumulator, cartGame) =>
            accumulator + cartGame.game.price * cartGame.quantity,
          0
        )
        .toFixed(2)
    : 0;

  const removeFromCart = async (cartGame) => {
    if (id) {
      try {
        const response = await axiosPrivate.get(
          `/cart/remove-from-cart/?id=${cartGame._id}`
        );

        toast.success("Removed from cart");

        dispatch(setCart(response.data.games));
      } catch (error) {
        toast.error(error);
      }
    } else {
      const cartComplement = cart.filter(
        ({ game }) => game._id !== cartGame.game._id
      );

      toast.success("Removed from cart");

      dispatch(setCart(cartComplement));
    }
  };

  const handleOpenCart = () => {
    if (id) {
      toggleShowCart(false);
      navigate("/cart");
    } else {
      toggleShowCart(false);
      navigate("/auth", { state: { from: "/cart" } });
    }
  };

  const handlePayment = async () => {
    const cartGameIds = cart.map((cartGame) => cartGame._id);
    const response = await axiosPrivate.post(`/pay/?userId=${id}`, cartGameIds);

    window.location.href = response.data.url;
  };

  const centerGameInfo = !cart?.length ? "justify-content-center" : "";

  return (
    <div className={`d-flex ${centerGameInfo}`}>
      {cart?.length && (
        <div className="cart-games col-5">
          {cart?.map((cartGame) => (
            <article
              className="position-relative"
              key={`cart-game-${cartGame.game._id}`}
            >
              <img
                className="game-img"
                src={cartGame.game.image}
                width="100%"
              />

              <button
                className="remove-btn"
                onClick={() => removeFromCart(cartGame)}
              >
                <CloseIcon fill="red" />
              </button>
            </article>
          ))}
        </div>
      )}

      <div className="cart-info px-4 py-3 col-7">
        <div className="d-flex justify-content-between">
          <h3 className="span">Cart ({cart?.length ?? 0})</h3>

          <button className="btn-no-bg" onClick={() => toggleShowCart(false)}>
            <CloseIcon />
          </button>
        </div>

        <span className="d-block mb-4">Total: ${total}</span>

        <button
          className="d-block btn-tertiary mb-3 w-100"
          onClick={handleOpenCart}
        >
          Open Cart
        </button>

        <button
          className="d-block btn-secondary mb-3 w-100"
          onClick={handlePayment}
          disabled={!cart?.length}
        >
          Checkout
        </button>
      </div>
    </div>
  );
};
