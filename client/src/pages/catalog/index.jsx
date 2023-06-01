import { useState } from "react";

import { useGetGames } from "./useGetGames";
import "../../assets/css/games.css";
import { useDispatch } from "react-redux";
import { setGame } from "../../store/reducers/GameReducer";
import { GameCard } from "../../core/GameCard";
import { useGetCategories } from "../../hooks/useGetCategories";

export const Catalog = ({ toggleShowGame }) => {
  const dispatch = useDispatch();
  const { categories } = useGetCategories();
  const [selectedCategories, setSelectedCategories] = useState([]);
  const { games, lastGameRef } = useGetGames(selectedCategories);

  const handleCheckbox = (event) => {
    const { value, checked } = event.target;

    if (checked) {
      setSelectedCategories((prevState) => [...prevState, value]);
    } else {
      setSelectedCategories(
        selectedCategories.filter((category) => category !== value)
      );
    }
  };

  const handleClick = (game) => {
    dispatch(setGame(game));
    toggleShowGame((prevState) => !prevState);
  };

  return (
    <div className="row">
      <div className="col-1">
        <span className="d-block mb-3">Filter</span>

        {categories.map(({ categoryName, categoryEnum }) => (
          <div className="d-flex gap-3" key={`category-${categoryEnum}`}>
            <input
              type="checkbox"
              value={categoryEnum}
              checked={selectedCategories.includes(categoryEnum)}
              onChange={handleCheckbox}
            />
            <label>{categoryName}</label>
          </div>
        ))}
      </div>

      <div className="col-10">
        {games.length ? (
          <div className="row justify-content-end">
            {games.map((game) => (
              <GameCard
                game={game}
                handleClick={handleClick}
                lastGameRef={lastGameRef}
                key={`game-${game._id}`}
              />
            ))}
          </div>
        ) : (
          <span>No Games</span>
        )}
      </div>
    </div>
  );
};
