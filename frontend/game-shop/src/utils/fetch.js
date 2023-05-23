const token =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI2NDY0MTFhMGM5MzEyYTYxMjdkYjA3NjkiLCJpc0FkbWluIjp0cnVlLCJpYXQiOjE2ODQ4MDMxNDYsImV4cCI6MTY4NDg4OTU0Nn0.Njv0QtO-Jo-hHf588zDyC2uvbXdk8m5t7-BWkYlHZ_8";

export const host = process.env.REACT_APP_SERVER_URL;

export const baseGamesUrl = `${host}/games`;

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
      // "Content-Type": "application/json",
    },
    body,
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
