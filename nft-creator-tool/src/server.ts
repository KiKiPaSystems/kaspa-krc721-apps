import express from "express";
import path from "path";
import { PORT, OUTPUT_DIR, log } from "./config";  // ✅ Import OUTPUT_DIR
import uploadRoutes from "./routes/upload";
import generateRoutes from "./routes/generate";
import progressRoutes from "./routes/progress";
import outputRoutes from "./routes/output";


const app = express();
app.use(express.json());

// ✅ Serve static files (index.html & assets)
app.use(express.static(path.join(__dirname, "../public")));
app.use("/output", express.static(OUTPUT_DIR));  // ✅ Now OUTPUT_DIR is available


// ✅ Serve `index.html` for root (`/`)
app.get("/", (req, res) => {
    res.sendFile(path.join(__dirname, "../public/index.html"));
});

// ✅ API Routes
app.use(uploadRoutes);
app.use(generateRoutes);
app.use(progressRoutes);
app.use(outputRoutes);

// ✅ Start Server
app.listen(PORT, () => log("INFO", `🚀 Server running at http://localhost:${PORT}`));
