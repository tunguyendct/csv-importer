import express, { Router } from "express";
import path from "path";
import cors from "cors";
import uploadFile from "./middleware/upload.js";
import csvController from "./controllers/csv.controller.js";
import searchAuthors from "./controllers/author.controller.js";

const router = Router();

global.__basedir = path.resolve() + "/..";

const app = express();

const corsOptions = {
  origin: "http://localhost:3000",
};

app.use(cors(corsOptions));
app.use(express.json());
app.use(express.urlencoded({ extended: true, limit: "10mb" }));

// API routes
app.use("/api", router);

router.post("/upload", uploadFile.single("file"), csvController.upload);
router.get("/search", searchAuthors);

app.get("/", function (req, res) {
  res.send("Hello");
});

const port = 5000;
app.listen(port, () => {
  console.log(`Server is running on port ${port}.`);
});
