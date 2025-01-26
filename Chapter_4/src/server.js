import express from "express";
import path, {dirname} from "path";
import { fileURLToPath } from "url";
import authRoutes from "./routes/authRoutes.js";
import todoRoutes from "./routes/todoRoutes.js";
import authMiddleware from "./middleware/authMiddleware.js";

const app = express();
const PORT = process.env.PORT || 5000;

// get the file path from the URL ofd the current module
const __filename =  fileURLToPath(import.meta.url);
//get the directory name from the file path
const __dirname = dirname(__filename);

// Middleware
app.use(express.json());
//serves the html file from the /public dir. tells express to serve all files from the public folder as static assets / file. Any req for the css files will be resolved to the public dir.
app.use(express.static(path.join(__dirname, "../public")));

// serving up the HTMl file from the /public dir
app.get("/", (req, res) => {
    res.sendFile(path.join(__dirname, "public", "index.html"))
});

// Routes
app.use("/auth", authRoutes);
app.use("/todos", authMiddleware, todoRoutes);

app.listen(PORT, () => {
    console.log(`The server has started on http://localhost:${PORT}`);
})

