export const host = import.meta.env.VITE_SERVER_URL;

export const baseUserUrl = `${host}/users`;
export const baseGamesUrl = `${host}/games`;
export const baseCartUrl = `${host}/cart`;

export const deleteWrapper = (url) =>
  fetch(url, {
    method: "DELETE",
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

export const getWrapper = (url) =>
  fetch(url, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  });

export const postWrapper = (url, body) =>
  fetch(url, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify(body),
  });

export const putWrapper = (url, body) =>
  fetch(url, {
    method: "PUT",
    headers: {
      Authorization: `Bearer ${token}`,
      // "Content-Type": "application/json",
    },
    body,
  });
