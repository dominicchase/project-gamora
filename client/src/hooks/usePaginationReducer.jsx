import { useReducer } from "react";

export const usePaginationReducer = () => {
  const [paginationState, paginationDispatch] = useReducer(
    (prevState, newState) => ({ ...prevState, ...newState }),
    {
      page: 0,
      pages: undefined,
      size: 10,
    }
  );

  return { paginationState, paginationDispatch };
};
