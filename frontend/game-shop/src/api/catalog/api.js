import { baseGamesUrl, getWrapper } from "../../utils/fetch";

export const getGames = (page) => getWrapper(`${baseGamesUrl}/?page=${page}`);
