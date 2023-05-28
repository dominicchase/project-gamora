import { baseUserUrl, postWrapper } from "../../utils/fetch";

export const login = (body) => postWrapper(`${baseUserUrl}/login`, body);

export const logout = () => postWrapper(`${baseUserUrl}/logout`);
