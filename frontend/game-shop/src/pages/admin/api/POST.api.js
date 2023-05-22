const token =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI2NDY0MTFhMGM5MzEyYTYxMjdkYjA3NjkiLCJpc0FkbWluIjp0cnVlLCJpYXQiOjE2ODQ2NDg0NTMsImV4cCI6MTY4NDczNDg1M30.XHSm4lU6IM-gml3gHv67vtpj50ZZHhUuySlKXr1gN1w";

const host = "http://localhost:3001/api";

export const postWrapper = (url, body) =>
  fetch(url, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${token}`,
    },
    body,
  });

export const createGame = (body) => postWrapper(`${host}/games/`, body);
