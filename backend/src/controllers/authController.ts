import { RequestHandler } from "express";
import bcrypt from "bcryptjs";
import pool from "../config/database"
import { RegisterUserRequest, AuthUserResponse, AuthError } from "../types/authTypes";

//新規登録API
export const registerUser: RequestHandler<
    {},
    AuthUserResponse | AuthError,
    RegisterUserRequest
> = async (req, res) => {
    try {
        const { email, password } = req.body; 
        
        //　email or パスワードがない時, 登録できない.
        if(!email || !password){ res.status(400).json({message: "メールとパスワードを入力してください。" });}
        
        // パスワードのハッシュ化.硬度は10.
        const hashedPassword = await bcrypt.hash(req.body.password, 10);
        const newUser = await pool.query(
            "INSERT INTO users (email, password) VALUES ($1, $2) RETURNING *",
            [email, hashedPassword]
        );

        // JWT token（仮）
        const token = "sample-jwt-token";
        
        res.status(201).json({
            id: newUser.rows[0].id,
            email: newUser.rows[0].email,
            createdAt: newUser.rows[0].created_at,
            token
    });
    } catch (error) {
        console.error("登録エラー:", error);
        res.status(500).json({message: "サーバーエラー"});
    }
};

export const loginUser = (req: any, res: any) => {
    //login logic
    res.send("loginUser");
};