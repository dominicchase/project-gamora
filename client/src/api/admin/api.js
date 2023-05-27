import {
  baseGamesUrl,
  deleteWrapper,
  postWrapper,
  putWrapper,
} from "../../utils/fetch";

export const createGame = (body) => postWrapper(`${baseGamesUrl}`, body);

export const deleteGame = (id) =>
  deleteWrapper(`${baseGamesUrl}/delete/?id=${id}`);

export const updateGame = (id, body) =>
  putWrapper(`${baseGamesUrl}/update/?id=${id}`, body);
