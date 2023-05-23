import { useCallback, useEffect, useReducer, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";

import { getGames } from "../../api/catalog/api";
import { setGames } from "../../store/reducers/games";

export const useGetGames = () => {
  const dispatch = useDispatch();
  const { games } = useSelector((state) => state.gamesState);

  const [paginationState, paginationDispatch] = useReducer(
    (prevState, newState) => ({ ...prevState, ...newState }),
    {
      loading: false,
      page: 0,
      totalPages: 0,
    }
  );

  const { loading, page, totalPages } = paginationState;

  const observer = useRef();

  const lastGameRef = useCallback(
    (node) => {
      if (loading) {
        return;
      }

      if (observer.current) {
        observer.current.disconnect();
      }

      observer.current = new IntersectionObserver((entries) => {
        if (entries[0].isIntersecting && page !== totalPages) {
          paginationDispatch({ ...paginationState, page: page + 1 });
        }
      });

      if (node) {
        observer.current.observe(node);
      }
    },
    [loading, page]
  );

  useEffect(() => {
    paginationDispatch({ ...paginationState, loading: true });

    getGames(page)
      .then((res) => res.json())
      .then((data) => {
        dispatch(setGames([...games, ...data.games]));

        paginationDispatch({
          ...paginationState,
          loading: false,
          totalPages: data.totalPages,
        });
      });
  }, [page]);

  // const resetGames = () => { dispatch(setGames([]))};

  return {
    lastGameRef,
    loading,
    games,
    paginationDispatch,
    paginationState,
    // resetGames,
  };
};
