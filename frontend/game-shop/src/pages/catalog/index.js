import React, { useState } from "react";
import { Link } from "react-router-dom";

import { useGetGames } from "./useGetGames";
import "./games.css";
import { GameModal } from "../../core/GameModal";

export const Catalog = () => {
  const { lastGameRef, games } = useGetGames();

  if (!games || !games.length) {
    return <span>Game over!</span>;
  }

  return (
    <div className="row">
      <div className="col-1">Filter</div>

      <div className="col">
        <div className="row justify-content-end">
          {games.map((game, index) => (
            <article
              className="col-sm flex-grow-0 mb-4"
              ref={index === games.length - 1 ? lastGameRef : null}
            >
              <Link to={`/${game._id}`} state={{ game }}>
                <img
                  className="game-card"
                  src={game.image}
                  alt=""
                  width={300}
                  height={400}
                />
              </Link>
            </article>
          ))}
        </div>
      </div>
    </div>
  );
};
