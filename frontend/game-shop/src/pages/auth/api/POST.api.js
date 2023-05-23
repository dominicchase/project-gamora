import { postWrapper } from "../../../utils/fetch";

const host = "http://localhost:3001/api";

export const login = (body) => postWrapper(`${host}/users/login`, body);
