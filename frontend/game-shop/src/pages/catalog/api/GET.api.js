import { getWrapper, host } from "../../../utils/fetch";

export const getGames = () => getWrapper(`${host}/games`);
