// import bcyrpt from "bcrypt"; #パスワードハッシュ化するライブラリ.

export const registerUser = (req: any, res: any) => {
    // register logic
    try {
        const User = {
            email: req.body.email,
            password: req.body.password,
        }
        // SQLへの挿入
        const user = await User.save();
        return res.status(200).json(user);
    } catch (error) {
        return res.status(500).json
    }
    
    
    res.send("registerUser");
};

export const loginUser = (req: any, res: any) => {
    //login logic
    res.send("loginUser");
};