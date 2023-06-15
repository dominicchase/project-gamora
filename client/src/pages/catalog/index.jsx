import { useDispatch } from "react-redux";
import { useGetGames } from "./useGetGames";
import { useGetCategories } from "../../hooks/useGetCategories";
import { setGame } from "../../store/reducers/GameReducer";
import "../../assets/css/games.css";
import { useAxiosPrivate } from "../../hooks/useAxiosPrivate";
import { useEffect } from "react";
import useAuth from "../../hooks/useAuth";
import { setCart } from "../../store/reducers/CartReducer";
import { toast } from "react-hot-toast";

export const Catalog = ({ toggleShowGame }) => {
  const dispatch = useDispatch();
  const { id } = useAuth();
  const axiosPrivate = useAxiosPrivate();
  const { games, categories, handleChangeCategory, lastGameRef } =
    useGetGames();

  useEffect(() => {
    const getCart = async () => {
      const response = await axiosPrivate.get(`/cart/?id=${id}`);

      if (response.status === 204) {
        dispatch(setCart([]));
      } else {
        dispatch(setCart(response.data.games));
      }
    };

    if (id) {
      getCart();
    }
  }, [id]);

  const { allCategories } = useGetCategories();

  const handleClick = (game) => {
    dispatch(setGame(game));
    toggleShowGame((prevState) => !prevState);
  };

  return games.length ? (
    <div className="d-block d-md-flex justify-content-between">
      <div className="games-category col-3 d-none d-md-block ps-4">
        <strong className="d-block mb-3 mt-4 h5">Category</strong>

        {allCategories.map(({ categoryName, categoryEnum }) => (
          <div className="mb-2" key={`category-${categoryEnum}`}>
            <input
              className="checkbox me-3"
              type="checkbox"
              checked={categories.includes(categoryEnum)}
              value={categoryEnum}
              onChange={handleChangeCategory}
            />

            <label>{categoryName}</label>
          </div>
        ))}
      </div>

      <div className="row px-4 pt-4 w-100 h-50 m-0">
        {games.map((game, index) => (
          <article
            className="col-6 col-sm-4 col-xl-3 mb-4 bg-transparent border-0"
            onClick={() => handleClick(game)}
            ref={index === games.length - 1 ? lastGameRef : null}
            key={game._id}
          >
            <img className="game-img" src={game.image} />
          </article>
        ))}
      </div>
    </div>
  ) : (
    <span className="d-block col ms-4 mt-4">No Games</span>
  );
};
