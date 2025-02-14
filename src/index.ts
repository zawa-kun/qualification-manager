import express from "express";
import pool from "./config/database"

const app = express();
const PORT = 12000;

app.get("/", async (req, res) => {
    const result = await pool.query("SELECT NOW()");
    res.send(result.rows);
});

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});