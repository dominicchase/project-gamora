import axios from "axios";

const BASE_URL = "http://localhost:3001/api";

export default axios.create({
  baseURL: BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

export const axiosPrivate = axios.create({
  baseURL: BASE_URL,
  withCredentials: true,
});

export const getGames = (body) => {
  const { page, size, categories, search } = body;
  console.log(categories);
  console.log(body.categories);

  let url = `${BASE_URL}/games/?page=${page}&size=${size}`;

  if (categories?.length) {
    url += `&categories=${categories.join(",")}`;
  }

  if (search?.length) {
    url += `&search=${search}`;
  }

  return axios.get(url);
};
