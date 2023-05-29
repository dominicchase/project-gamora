const jwt = require("jsonwebtoken");
require("dotenv/config");

const verifyJwt = (req, res, next) => {
  const authHeader = req.headers.authorization || req.headers.Authorization;

  if (!authHeader) {
    return res.sendStatus(401);
  }

  const token = authHeader.split(" ")[1];

  jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (error, decoded) => {
    if (error) {
      return res.sendStatus(403); // invalid token
    }

    req.email = decoded.email;
    next();
  });
};

module.exports = verifyJwt;
