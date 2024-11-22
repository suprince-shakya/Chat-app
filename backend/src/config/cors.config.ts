import { CorsOptions } from "cors";

const allowedOrigins = process.env.ORIGIN.split(",");
const originRegex = new RegExp(process.env.ORIGIN_REGEX);

export const corsOption: CorsOptions = {
  credentials: true,
  methods: ["GET", "PUT", "POST", "DELETE"],
  origin: function (origin, callback) {
    if (!origin) {
      callback(null, true);
      return;
    }
    if (allowedOrigins.indexOf(origin) !== -1 || originRegex.test(origin)) {
      callback(null, true);
    } else {
      callback(new Error("Not allowed by CORS"));
    }
  },
};
