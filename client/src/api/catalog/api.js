import { baseGamesUrl, getWrapper } from "../../utils/fetch";
import axios from "../axios";

export const getGameImage = (id) =>
  getWrapper(`${baseGamesUrl}/game/image/?id=${id}`);

export const getGames = (page, size) =>
  axios.get(`games/?page=${page}&size=${size}`);
