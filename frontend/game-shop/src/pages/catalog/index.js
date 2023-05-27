import React from "react";

import { useGetGames } from "./useGetGames";
import "./games.css";
import { useDispatch } from "react-redux";
import { setGame } from "../../store/reducers/GameReducer";

export const Catalog = ({ toggleShowGame }) => {
  const dispatch = useDispatch();
  const { lastGameRef, games } = useGetGames();

  if (!games || !games.length) {
    return <span>Game over!</span>;
  }

  const handleClick = (game) => {
    dispatch(setGame(game));
    toggleShowGame((prevState) => !prevState);
  };

  return (
    <div className="row">
      <div className="col-1">Filter</div>

      <div className="col">
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
      </div>
    </div>
  );
};
