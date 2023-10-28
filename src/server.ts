import express, { Request, Response } from "express";
import cors from "cors";
import router from "./routes/index";

const app = express();
const port = 3000;

app.use(
  cors({
    credentials: true,
    origin: "*",
  })
);

app.use(express.json());

app.get("/", (req: Request, res: Response) => {
  res.send("that's my backend");
});

app.use(router());

app.listen(port, () => {
  console.log(`server is running on port ${port}`);
});
