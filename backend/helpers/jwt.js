const { expressjwt: jwt } = require("express-jwt");

function authJwt() {
  const { API_URL } = process.env;

  return jwt({
    secret: process.env.SECRET,
    algorithms: ["HS256"],
    isRevoked: isRevoked,
  }).unless({
    path: [
      { url: /\/api\/games(.*)/, methods: ["GET", "OPTIONS"] },
      `${API_URL}/users/login`,
      `${API_URL}/users/register`,
    ],
  });
}

async function isRevoked(req, token) {
  if (!token.payload.isAdmin) {
    return true;
  }

  return false;
}

module.exports = authJwt;
