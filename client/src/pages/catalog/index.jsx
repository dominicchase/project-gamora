import { useEffect, useState } from "react";

import { useGetGames } from "./useGetGames";
import "../../assets/css/games.css";
import { useDispatch } from "react-redux";
import { setGame } from "../../store/reducers/GameReducer";
import axios from "../../api/axios";

export const Catalog = ({ toggleShowGame }) => {
  const dispatch = useDispatch();
  const [category, setCategory] = useState(undefined);
  const { lastGameRef, games } = useGetGames(category);

  const handleClick = (game) => {
    dispatch(setGame(game));
    toggleShowGame((prevState) => !prevState);
  };

  const [categories, setCategories] = useState([]);

  const getCategories = async () => {
    const response = await axios.get("/games/categories");
    setCategories(response.data);
  };

  useEffect(() => {
    getCategories();
  }, []);

  return (
    <div className="row">
      <div className="col-1">
        <span className="d-block mb-3">Filter</span>

        {categories.map(({ categoryName, categoryEnum }) => (
          <div className="d-flex gap-3" key={`category-${categoryEnum}`}>
            <input
              type="radio"
              value={categoryEnum}
              checked={category === categoryEnum}
              onChange={(event) => setCategory(event.target.value)}
            />
            <label>{categoryName}</label>
          </div>
        ))}
      </div>

      <div className="col">
        {games.length ? (
          <div className="row justify-content-end">
            {games.map((game, index) => (
              <article
                className="col-sm flex-grow-0 mb-4"
                ref={index === games.length - 1 ? lastGameRef : null}
                key={`game-${game._id}`}
              >
                <img
                  onClick={() => handleClick(game)}
                  className="game-card"
                  src={game.image}
                  alt=""
                  width={300}
                  height={400}
                />
              </article>
            ))}
          </div>
        ) : (
          <span>No Games</span>
        )}
      </div>
    </div>
  );
};
