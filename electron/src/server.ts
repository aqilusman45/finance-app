import express from "express";
import morgan from "morgan";
import { json } from "body-parser";
import cors from "cors";

const router = express();

router.use(cors());
router.use(morgan("tiny"));
router.use(json());

router.get("/", (req, res) => {
  res.send("Hello World");
});

export { router };
