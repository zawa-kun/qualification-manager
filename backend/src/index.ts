import express from "express";
import pool from "./config/database";
import authRoutes from "./routes/authRoutes";

const app = express();
const PORT = 12000; //ポート番号.

//ミドルウェアの設定.
app.use(express.json());

//ルーティング設定.
app.use("/api/auth", authRoutes);

app.get("/", async (req: any, res: any) => {
    const result = await pool.query("SELECT NOW()");
    res.send(result.rows);
});

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});