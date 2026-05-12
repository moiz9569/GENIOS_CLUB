import { config } from "dotenv";
import mongoose from "mongoose";
import express from "express";
import { Request, Response } from "express";
import { USER } from "./models/user";
import { MATRIX } from "./models/matrix";
import matrixRoutes from "./routes/matrix";

config();
const app = express();
app.use(express.json());

// (async () => {
//   const newUSER = new USER({
//     address: "0x3AcF8B9d90916E06F8382ce07c9fd2F16F31Ab20",
//     referrer: "root",
//     activeLevels: [true, true, true, true, true, true, true, true],
//   });
//   await newUSER.save();
//   for (let index = 0; index < 8; index++) {
//     const newUserMatrix = new MATRIX({
//       code: `${index}-0x3AcF8B9d90916E06F8382ce07c9fd2F16F31Ab20`,
//       level: index,
//       address: "0x3AcF8B9d90916E06F8382ce07c9fd2F16F31Ab20",
//       referrer: "root",
//       currentReferrer: "root",
//     });
//     await newUserMatrix.save();
//   }
// })();

app.use("/matrix", matrixRoutes);

app.get("/", async (req: Request, res: Response) => {
  res.status(200).json({
    massege: "⚡️[server]: Server is running",
  });
});

const PORT = process.env.PORT || 8000;
const MONGO_URL = String(process.env.MONGO_URL);
mongoose.set("strictQuery", true);
mongoose
  .connect(MONGO_URL)
  .then(() => {
    app.listen(PORT, () =>
      console.log(`⚡️[server]: Server is running at http://localhost:${PORT}`)
    );
  })
  .catch((error) => console.log(`${error} did not connect`));
