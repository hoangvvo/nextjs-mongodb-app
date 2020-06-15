import nextConnect from "next-connect";
import middleware from "../../../../middlewares/middleware";
import { extractUser } from "../../../../lib/extractUser";
import passport from "passport";

const handler = nextConnect();

handler.use(middleware);
handler.get(
  passport.authenticate("facebook", {
    authType: "reauthenticate",
    scope: ["email", "public_profile"],
  })
);

export default handler;
