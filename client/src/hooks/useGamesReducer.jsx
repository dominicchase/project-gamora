import { useReducer } from "react";

export const useGamesReducer = () => {
  const [gamesState, gamesDispatch] = useReducer(
    (prevState, newState) => ({ ...prevState, ...newState }),
    {
      games: [],
      hasMore: false,
      isLoading: false,
    }
  );

  const setGames = (games) => gamesDispatch({ ...gamesState, games });

  const toggleIsLoading = (isLoading) =>
    gamesDispatch({ ...gamesState, isLoading });

  console.log({ gamesState });

  return { gamesState, gamesDispatch, setGames, toggleIsLoading };
};
