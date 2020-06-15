import nextConnect from "next-connect";
import middleware from "../../../../middlewares/middleware";
import passport from "../../../../lib/passport";
import { extractUser } from "../../../../lib/extractUser";

const handler = nextConnect();

handler.use(middleware);

handler.get(passport.authenticate("facebook"), (req, res) => {
  console.log("isAuthenticated facebook callback", req.isAuthenticated());
  if (req.isAuthenticated()) {
    req.logIn(req.user, (err) => {
      console.log("run req.logIn Facebook");
      if (err) console.log(err);
    });
    res.writeHead(301, {
      Location: process.env.WEB_URI + "/",
    });
    res.end();
  } else {
    res.writeHead(301, {
      Location: process.env.WEB_URI + "/login",
    });
    res.end();
  }
});

export default handler;
