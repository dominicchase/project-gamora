import { useState } from "react";
import { useGetGames } from "../catalog/useGetGames";
import { useDispatch } from "react-redux";
import { setGame } from "../../store/reducers/GameReducer";

export const Search = ({ toggleShowGame }) => {
  const dispatch = useDispatch();
  const [search, setSearch] = useState();
  const [pagination, setPagination] = useState({
    page: 0,
    size: 10,
    totalPages: undefined,
  });

  const { lastGameRef, games } = useGetGames(
    pagination,
    setPagination,
    null,
    search
  );

  const handleClick = (game) => {
    dispatch(setGame(game));
    toggleShowGame((prevState) => !prevState);
  };

  return (
    <>
      <input
        className="mb-5"
        type="text"
        value={search}
        onChange={(event) => setSearch(event.target.value)}
        placeholder="search"
      />

      {!!search?.length &&
        games.map((game, index) => (
          <article
            className="col-sm flex-grow-0 mb-4"
            ref={index === games?.length - 1 ? lastGameRef : null}
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
    </>
  );
};
