import { useCallback, useEffect, useRef, useState } from "react";

import { useAxiosPrivate } from "../../hooks/useAxiosPrivate";
import axios from "../../api/axios";

export const useGetGames = (category) => {
  const [games, setGames] = useState([]);
  const [isLoading, toggleIsLoading] = useState(false);
  const [hasMore, toggleHasMore] = useState(false);
  const axiosPrivate = useAxiosPrivate();

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
    const response = await axios.get(
      `/games/?page=${deletedGamePage ?? page}&size=${size}${
        category ? `&category=${category}` : ""
      }`
    );

    switch (action) {
      case "append":
        setGames([...games, ...response.data.games]);
        break;

      case "delete":
        setGames([
          ...games.slice(0, deletedGamePage * size),
          ...response.data.games,
        ]);
        break;

      default:
        setGames(response.data.games);
    }

    toggleHasMore(response.data.page < response.data.totalPages - 1);

    setPagination({ ...pagination, totalPages: response.data.totalPages });
  };

  useEffect(() => {
    toggleIsLoading(true);

    handleGetGames();

    toggleIsLoading(false);
  }, [page, category]);

  const handleDeleteGame = async (game) => {
    const deletedGameIndex = games.indexOf(game);
    const deletedGamePage = Math.floor(deletedGameIndex / size);

    await axiosPrivate.delete(`/admin/delete/?id=${game._id}`);

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
