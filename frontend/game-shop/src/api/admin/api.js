import {
  baseGamesUrl,
  deleteWrapper,
  getWrapper,
  postWrapper,
  putWrapper,
} from "../../utils/fetch";

export const createGame = (body) => postWrapper(`${baseGamesUrl}`, body);

export const deleteGame = (id) =>
  deleteWrapper(`${baseGamesUrl}/delete/?id=${id}`);

export const getGame = (id) => getWrapper(`${baseGamesUrl}/game/?id=${id}`);

export const getGames = () => getWrapper(`${baseGamesUrl}`);

export const getGameImage = (id) =>
  getWrapper(`${baseGamesUrl}/game/image/?id=${id}`);

export const updateGame = (id, body) =>
  putWrapper(`${baseGamesUrl}/update/?id=${id}`, body);
