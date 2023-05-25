import {
  baseCartUrl,
  baseGamesUrl,
  getWrapper,
  postWrapper,
} from "../../utils/fetch";

export const getGames = (page, size) =>
  getWrapper(`${baseGamesUrl}/?page=${page}&size=${size}`);

export const addToCart = (body) => postWrapper(`${baseCartUrl}/add-to-cart/`);
