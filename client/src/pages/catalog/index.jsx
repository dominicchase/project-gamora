import { useDispatch } from "react-redux";
import { useGetGames } from "./useGetGames";
import { useGetCategories } from "../../hooks/useGetCategories";
import { GameCard } from "../../core/GameCard";
import { setGame } from "../../store/reducers/GameReducer";
import "../../assets/css/games.css";

export const Catalog = ({ toggleShowGame }) => {
  const dispatch = useDispatch();
  const { games, categories, handleChangeCategory, lastGameRef } =
    useGetGames();

  const { allCategories } = useGetCategories();

  const handleClick = (game) => {
    document.body.style.overflow = "hidden";
    console.log(document.body.style);
    dispatch(setGame(game));
    toggleShowGame((prevState) => !prevState);
  };

  return (
    <div className="d-flex justify-content-between">
      <div className="games-category col-3 d-none d-md-block ps-4">
        <strong className="d-block mb-3 h5">Category</strong>

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

      {games.length ? (
        <div className="row px-4 ">
          {games.map((game, index) => (
            <GameCard
              game={game}
              handleClick={handleClick}
              lastGameRef={index === games.length - 1 ? lastGameRef : null}
              key={`game-${game._id}`}
            />
          ))}
        </div>
      ) : (
        <span>No Games</span>
      )}
    </div>
  );
};
