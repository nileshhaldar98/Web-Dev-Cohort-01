import express from "express";
import dotenv from "dotenv";
import helmet from "helmet";
import authRouter from "./routes/auth.routes";
import { connect } from "http2";
import { connectDB } from "./services/dbConnect";
import { otpGenrator } from "./services/utils/otpGenrator.utils";

dotenv.config();

connectDB();
const app = express(); 

app.use(helmet());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));


app.get("/", (req, res) => {
  res.json({ message: "Hello World!" });
});

app.use("/api/v1/users", authRouter);

const port = Number(process.env.PORT) || 3000;

  app.listen(port, () => {
    console.log(`🚀 Server running on http://localhost:${port}`);
  });

