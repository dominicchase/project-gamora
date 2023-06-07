import { useMemo } from "react";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-hot-toast";
import useAuth from "../../hooks/useAuth";
import { setCart } from "../../store/reducers/CartReducer";
import { axiosPrivate } from "../../api/axios";

import { ReactComponent as CloseIcon } from "../../assets/svg/x-thin.svg";
import { ReactComponent as CartIcon } from "../../assets/svg/cart.svg";
import "../../assets/css/Game.css";

export const GameOverlay = ({ toggleShowGame }) => {
  const dispatch = useDispatch();
  const { id } = useAuth();

  const { game } = useSelector((state) => state.gameState);
  const { cart } = useSelector((state) => state.cartState);

  const cartGame = cart?.length
    ? cart.find((cartGame) => cartGame.game._id === game._id)
    : null;

  const currQuantity = cartGame ? cartGame.quantity : 0;

  const maxQuantity = useMemo(
    () => game.numInStock - currQuantity,
    [game.numInStock, currQuantity]
  );

  const cartComplement = cart
    ? cart.filter((cartGame) => cartGame.game._id !== game._id)
    : null;

  const handleAddToCart = async () => {
    const newCartGame = { game, quantity: 1 };

    if (id) {
      try {
        const response = await axiosPrivate.post(
          `/cart/add-to-cart/?id=${id}`,
          [newCartGame]
        );

        toast.success("Added to cart");

        dispatch(setCart(response.data.games));
      } catch (error) {
        toast.error(error);
      }
    } else {
      if (cartGame) {
        dispatch(
          setCart([
            ...cartComplement,
            { ...cartGame, quantity: cartGame.quantity + newCartGame.quantity },
          ])
        );
      } else {
        dispatch(setCart([...cartComplement, newCartGame]));
      }

      toast.success("Added to cart");
    }
  };

  const MobileGameInfo = () => {
    return (
      <div className="game-info d-block d-lg-none col-1">
        <button
          className="mobile-close-btn"
          onClick={() => {
            document.body.style.overflow = "unset";
            toggleShowGame(false);
          }}
        >
          <CloseIcon />
        </button>

        <button
          className="mobile-add-to-cart-btn"
          onClick={handleAddToCart}
          disabled={!maxQuantity}
        >
          <CartIcon width={20} height={20} />
        </button>
      </div>
    );
  };

  return (
    <div className="game-overlay">
      <div className="d-flex justify-content-center py-5">
        <img className="game col-8 col-md-7 col-lg-5" src={game.image} />

        <MobileGameInfo />

        <div className="game-info d-none d-lg-block col-4 p-4">
          <div className="d-flex justify-content-between">
            <h3>{game.name}</h3>

            <button
              className="bg-transparent border-0 mb-2 p-0"
              onClick={() => {
                // document.body.style.overflow = "unset";
                toggleShowGame(false);
              }}
            >
              <CloseIcon />
            </button>
          </div>

          <span className="d-block mb-4">${game.price}</span>

          <p className="mb-4">{game.description}</p>

          <div className="mb-3">
            <button
              className="btn-secondary"
              onClick={handleAddToCart}
              disabled={!maxQuantity}
            >
              <CartIcon width={20} height={20} />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
