export const postWrapper = (url, body, json = true) =>
  fetch(url, {
    method: "POST",
    headers: {
      //   Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify(body),
  });

const host = "http://localhost:3001/api";

export const login = (body) => postWrapper(`${host}/users/login`, body);
