async function errorHandler(err, req, res, next) {
  if (Object.keys(err).length) {
    return res.status(400).json({ error: err });
  }

  return res.status(500).json(err);
}

module.exports = errorHandler;
