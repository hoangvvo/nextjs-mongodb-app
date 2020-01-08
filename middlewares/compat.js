export default function (req, res, next) {
  res.redirect = (code, path) => {
    let location = path;
    let status = code;
    if (typeof code === 'string') {
      status = 302;
      location = code;
    }
    res.writeHead(status, { Location: location }).end();
  };
  next();
}
