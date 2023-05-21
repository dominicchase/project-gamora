import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Buffer } from "buffer";

import { setGames } from "../reducers/games";

export const Games = () => {
  const dispatch = useDispatch();
  const { games } = useSelector((state) => state.gamesState);

  useEffect(() => {
    fetch("http://localhost:3001/api/games").then(
      (res) => res.ok && res.json().then((data) => dispatch(setGames(data)))
    );
  }, []);

  const formatImageData = (imageData) =>
    imageData &&
    `data:image/jpeg;base64,${Buffer.from(imageData).toString("base64")}`;

  return !games ? (
    <span>Loading...</span>
  ) : (
    <>
      {games.map((game) => (
        <article className="mb-5">
          <span>{game.name}</span>
          <span>{game.price}</span>
          <img src={formatImageData(game.image?.data)} alt="" />
        </article>
      ))}
    </>
  );
};
