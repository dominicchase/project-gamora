export const getWrapper = (url, token = "") =>
  fetch(url, {
    method: "GET",
    headers: {
      //   Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
  });

export const host = "http://localhost:3001/api";
