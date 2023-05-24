import { baseGamesUrl, getWrapper } from "../../utils/fetch";

export const getGames = (page, size) =>
  getWrapper(`${baseGamesUrl}/?page=${page}&size=${size}`);
