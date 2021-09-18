import { ncOpts } from "@/api-lib/nc";
import nc from "next-connect";
import auth from "./auth";
import database from "./database";

const all = nc(ncOpts);

all.use(database).use(auth);

export default all;
