import { baseGamesUrl, getWrapper } from "../../utils/fetch";

export const getGameImage = (id) =>
  getWrapper(`${baseGamesUrl}/game/image/?id=${id}`);

export const getGames = (page, size) =>
  getWrapper(`${baseGamesUrl}/?page=${page}&size=${size}`);
