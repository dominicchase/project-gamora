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

async function isRevoked(req, payload, done) {
  if (!payload.isAdmin) {
    done(null, true);
  }

  done();
}

module.exports = authJwt;

// token for 5/7

// eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI2NDU4MzhmMTMzODlhN2IwNTc2N2VlZmIiLCJpc0FkbWluIjpmYWxzZSwiaWF0IjoxNjgzNTEwNDEyLCJleHAiOjE2ODM1OTY4MTJ9.2v01o2LURO7dec2hc2D3DNBNHoeWOrCPPlVoQ03a9R4
