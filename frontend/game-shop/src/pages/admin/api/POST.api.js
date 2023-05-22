const token =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI2NDY0MTFhMGM5MzEyYTYxMjdkYjA3NjkiLCJpc0FkbWluIjp0cnVlLCJpYXQiOjE2ODQ3MzU1NDIsImV4cCI6MTY4NDgyMTk0Mn0.jFjjIyR07M3cGT9GLo4veF-AAnd6-OR81_0Aiu2LGgM";

const host = "http://localhost:3001/api";

export const postWrapper = (url, body = false) =>
  fetch(url, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${token}`,
    },
    ...(body && { body }),
  });

export const deleteWrapper = (url, body = false) =>
  fetch(url, {
    method: "DELETE",
    headers: {
      Authorization: `Bearer ${token}`,
    },
    ...(body && { body }),
  });

export const createGame = (body) => postWrapper(`${host}/games/`, body);

export const deleteGame = (id) =>
  deleteWrapper(`${host}/games/delete/?id=${id}`);
