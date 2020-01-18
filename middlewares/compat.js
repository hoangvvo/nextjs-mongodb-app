export default function (req, res, next) {
  res.redirect = (code, path) => {
    let location = path;
    let status = code;
    if (typeof code === 'string') {
      status = 302;
      location = code;
    }
    res.statusCode = status;
    res.setHeader('Location', location);
    res.end();
  };
  next();
}
