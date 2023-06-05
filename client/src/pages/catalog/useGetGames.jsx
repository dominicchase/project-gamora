import { useCallback, useEffect, useRef, useState } from "react";
import { useSelector } from "react-redux";
import { getGames } from "../../api/axios";

export const useGetGames = () => {
  const observer = useRef();
  const { search } = useSelector((state) => state.gameState);

  const [games, setGames] = useState([]);
  const [categories, setCategories] = useState([]);

  const [page, setPage] = useState(0);
  const size = 10;

  const [isLoading, toggleIsLoading] = useState(false);
  const [hasMore, toggleHasMore] = useState(false);

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
          setPage((prevState) => prevState + 1);
        }
      });

      if (node) {
        observer.current.observe(node);
      }
    },
    [isLoading, hasMore]
  );

  useEffect(() => {
    toggleIsLoading(true);

    const handleGetGames = async () => {
      const { data } = await getGames({ page, size, categories, search });
      if (page === 0) {
        setGames(data.games);
      } else {
        setGames([...games, ...data.games]);
      }

      toggleHasMore(data.page < data.totalPages - 1);
    };

    handleGetGames();

    toggleIsLoading(false);
  }, [categories, page, search]);

  const handleChangeCategory = async (event) => {
    const { value, checked } = event.target;

    if (checked) {
      setCategories((prevState) => [...prevState, value]);
    } else {
      setCategories(categories.filter((category) => category !== value));
    }

    setPage(0);
  };

  return {
    games,
    categories,
    handleChangeCategory,
    lastGameRef,
  };
};
