import { app } from "./app.js";
import { connectDb } from "./data/connectDB.js";
import {
  updateEverything,
  updateEverythingYoutube,
  updateFacebookEverything,
} from "./utils/cronJob.js";

connectDb();

app.listen(process.env.PORT, () => {
  console.log(`Server running on port: ${process.env.PORT}`);
});

updateEverything();
updateFacebookEverything();
updateEverythingYoutube();
