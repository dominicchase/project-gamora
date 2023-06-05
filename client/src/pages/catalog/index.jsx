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
    dispatch(setGame(game));
    toggleShowGame((prevState) => !prevState);
  };

  return (
    <div className="d-flex justify-content-between">
      <div className="games-category col-3">
        <strong className="d-block mb-3">Category</strong>

        {allCategories.map(({ categoryName, categoryEnum }) => (
          <div className="mb-2" key={`category-${categoryEnum}`}>
            <input
              className="checkbox me-3"
              type="checkbox"
              checked={categories.includes(categoryEnum)}
              value={categoryEnum}
              onChange={handleChangeCategory}
            />

            <span>{categoryName}</span>
          </div>
        ))}
      </div>

      <div className="p-0 catalog-games col">
        {games.length ? (
          <div className="row ps-4 justify-content-start">
            {games.map((game, index) => (
              <GameCard
                game={game}
                handleClick={handleClick}
                lastGameRef={index === games.length - 1 ? lastGameRef : null}
                key={`game-${game._id}`}
              ></GameCard>
            ))}
          </div>
        ) : (
          <span>No Games</span>
        )}
      </div>
    </div>
  );
};
