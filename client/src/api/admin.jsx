// import { useAxiosPrivate } from "../hooks/useAxiosPrivate";

import axios from "./axios";

// export const createGame = (body) => {
//   const axiosPrivate = useAxiosPrivate();

//   return axiosPrivate.post("/games", body);
// };

export const deleteGame = (id) => {
  //   const axiosPrivate = useAxiosPrivate();

  return axios.delete(`/admin/delete/?id=${id}`);
};

export const updateGame = (id, body) => {
  //   const axiosPrivate = useAxiosPrivate();

  return axios.put(`/admin/update/?id=${id}`, body);
};
