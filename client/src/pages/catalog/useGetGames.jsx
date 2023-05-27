import { useCallback, useEffect, useRef, useState } from "react";

import { getGames } from "../../api/catalog/api";
import { deleteGame } from "../../api/admin/api";

export const useGetGames = () => {
  const [games, setGames] = useState([]);
  const [isLoading, toggleIsLoading] = useState(false);
  const [hasMore, toggleHasMore] = useState(false);

  const [pagination, setPagination] = useState({
    page: 0,
    size: 10,
    totalPages: undefined,
  });

  const { page, size } = pagination;

  const observer = useRef();

  const lastGameRef = useCallback(
    (node) => {
      if (isLoading) {
        return;
      }

      if (observer.current) {
        observer.current.disconnect();
      }

      observer.current = new IntersectionObserver((entries) => {
        if (entries[0].isIntersecting && hasMore) {
          setPagination({ ...pagination, page: page + 1 });
        }
      });

      if (node) {
        observer.current.observe(node);
      }
    },
    [isLoading, hasMore]
  );

  const handleGetGames = async (action, deletedGamePage) => {
    const response = await getGames(deletedGamePage ?? page, size);
    const data = await response.json();

    switch (action) {
      case "append":
        setGames([...games, ...data.games]);
        break;

      case "delete":
        setGames([...games.slice(0, deletedGamePage * size), ...data.games]);
        break;

      default:
        setGames(data.games);
    }

    toggleHasMore(data.games.length > 0);

    setPagination({ ...pagination, totalPages: data.totalPages });
  };

  useEffect(() => {
    toggleIsLoading(true);

    handleGetGames("append");

    toggleIsLoading(false);
  }, [page]);

  const handleDeleteGame = async (game) => {
    const deletedGameIndex = games.indexOf(game);
    const deletedGamePage = Math.floor(deletedGameIndex / size);

    await deleteGame(game._id);

    handleGetGames("delete", deletedGameIndex, deletedGamePage);
  };

  const resetGamesData = () => handleGetGames();

  return {
    games,
    isLoading,
    lastGameRef,
    resetGamesData,
    handleDeleteGame,
  };
};
