export const ncOpts = {
  onError(err, req, res, next) {
    console.error(err);
    res.statusCode =
      err.status && err.status >= 100 && err.status < 600 ? err.status : 500;
    res.end(err.message);
  },
};
