import { useState } from "react";

import { useGetGames } from "./useGetGames";
import "../../assets/css/games.css";
import { useDispatch } from "react-redux";
import { setGame } from "../../store/reducers/GameReducer";
import { GameCard } from "../../core/GameCard";
import { useGetCategories } from "../../hooks/useGetCategories";
import { ReactComponent as CartIcon } from "../../assets/svg/cart.svg";
import { ReactComponent as ViewIcon } from "../../assets/svg/eye.svg";

export const Catalog = ({ toggleShowGame }) => {
  const dispatch = useDispatch();
  const { categories } = useGetCategories();
  const [pagination, setPagination] = useState({
    page: 0,
    size: 10,
    totalPages: undefined,
  });
  const [selectedCategories, setSelectedCategories] = useState([]);
  const { games, lastGameRef } = useGetGames(
    pagination,
    setPagination,
    selectedCategories
  );

  const handleCheckbox = (event) => {
    const { value, checked } = event.target;

    if (checked) {
      setSelectedCategories((prevState) => [...prevState, value]);
    } else {
      setSelectedCategories(
        selectedCategories.filter((category) => category !== value)
      );
    }

    setPagination({
      page: 0,
      size: 10,
      totalPages: undefined,
    });
  };

  const handleClick = (game) => {
    dispatch(setGame(game));
    toggleShowGame((prevState) => !prevState);
  };

  return (
    <div className="d-flex justify-content-between">
      <div className="col-2">
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

      <div className="catalog-games col">
        {games.length ? (
          <div className="row justify-content-start">
            {games.map((game, index) => (
              <GameCard
                game={game}
                handleClick={handleClick}
                lastGameRef={index === games.length - 1 ? lastGameRef : null}
                key={`game-${game._id}`}
              >
                {/* <button className="view-btn">
                  <ViewIcon width={25} height={25} />
                </button>
                <button className="buy-btn">
                  <CartIcon width={25} height={25} />
                </button> */}
              </GameCard>
            ))}
          </div>
        ) : (
          <span>No Games</span>
        )}
      </div>
    </div>
  );
};
