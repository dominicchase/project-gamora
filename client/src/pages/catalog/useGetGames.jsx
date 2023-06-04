import { useCallback, useEffect, useRef, useState } from "react";

import { useAxiosPrivate } from "../../hooks/useAxiosPrivate";
import axios from "../../api/axios";

export const useGetGames = (pagination, setPagination, categories, search) => {
  const [games, setGames] = useState([]);
  const [isLoading, toggleIsLoading] = useState(false);
  const [hasMore, toggleHasMore] = useState(false);
  const axiosPrivate = useAxiosPrivate();

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
        categories?.length ? `&categories=${categories?.join(",")}` : ""
      }${search?.length ? `&search=${search}` : ""}`
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

    if (search?.length || categories?.length) {
      handleGetGames();
    } else {
      handleGetGames("append");
    }

    toggleIsLoading(false);
  }, [page, categories, search]);

  const handleDeleteGame = async (game) => {
    const deletedGameIndex = games.indexOf(game);
    const deletedGamePage = Math.floor(deletedGameIndex / size);

    await axiosPrivate.delete(`/admin/delete/?id=${game._id}`);

    handleGetGames("delete", deletedGamePage);
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
