function errorHandler(err, req, res, next) {
  if (Object.keys(err).length) {
    return res
      .status(err.status)
      .json({ status: err.status, message: err.inner.message });
  }

  return res
    .status(err.status)
    .json({ status: err.status, message: err.inner.message });
}

module.exports = errorHandler;
