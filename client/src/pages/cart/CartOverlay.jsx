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

  const { id } = useAuth();
  const axiosPrivate = useAxiosPrivate();

  const total = cart
    ?.reduce(
      (accumulator, cartGame) =>
        accumulator + cartGame.game.price * cartGame.quantity,
      0
    )
    ?.toFixed(2);

  console.log({ cart });

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

  const handleCheckout = () => {
    if (id) {
      toggleShowCart(false);
      navigate("/cart");
    } else {
      toggleShowCart(false);
      navigate("/auth", { state: { from: "/cart" } });
    }
  };

  return (
    <div className="cart-overlay d-flex justify-content-end">
      <div className="col-3 cart-overlay-content">
        {cart?.map((cartGame) => (
          <article className="mb-2" key={`cart-game-${cartGame.game._id}`}>
            <button onClick={() => removeFromCart(cartGame)}>X</button>
            <img className="w-100" src={cartGame.game.image} alt="" />
          </article>
        ))}
      </div>

      <div className="px-5 py-3 col-4 cart-overlay-content">
        <div id="header" className="d-flex justify-content-between">
          <h3 className="span">Cart ({cart?.length ?? 0})</h3>

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
