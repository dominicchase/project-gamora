import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setGames } from "../../reducers/games";

export const Games = () => {
  const dispatch = useDispatch();
  const { games } = useSelector((state) => state.gamesState);

  useEffect(() => {
    fetch("http://localhost:3001/api/games").then(
      (res) => res.ok && res.json().then((data) => dispatch(setGames(data)))
    );
  }, []);

  if (!games || !games.length) {
    return <span>Game over!</span>;
  }

  return (
    <>
      {games.map((game) => (
        <article className="mb-5">
          <span>{game.name}</span>
          <span>{game.price}</span>
          <img src={game.image} alt="" width={200} heigh={300} />
        </article>
      ))}
    </>
  );
};
