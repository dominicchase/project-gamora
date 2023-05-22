import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setGames } from "../../reducers/games";
import "./games.css";
import { getGames } from "./api/GET.api";

export const Catalog = () => {
  const dispatch = useDispatch();
  const { games } = useSelector((state) => state.gamesState);

  useEffect(() => {
    getGames()
      .then((res) => res.json())
      .then((data) => dispatch(setGames(data)));
  }, []);

  if (!games || !games.length) {
    return <span>Game over!</span>;
  }

  return (
    <div className="row">
      <div className="col-1">Filter</div>

      <div className="col">
        <div className="row justify-content-end">
          {games.map((game) => (
            <article className="col-sm flex-grow-0 mb-4">
              <img
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
