import dotenv from "dotenv";
dotenv.config();
import app from "./config/express.config";

app.listen(process.env.PORT, () => {
  console.log(`Listening on port ${process.env.PORT}`);
});
