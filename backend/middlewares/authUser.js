import dotenv from "dotenv";
dotenv.config();
import jwt from "jsonwebtoken";

const authUser = (req, res, next) => {
    try {
        const authHeader = req.headers.authorization;

        if (!authHeader || !authHeader.startsWith("Bearer ")) {
            return res.json({ success: false, message: "Unauthorized" });
        }

        const token = authHeader.split(" ")[1];

        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.userId = decoded.userId;
        next();
    } catch (error) {
        console.error(error);
        res.json({ success: false, message: "Unauthorized" });
    }
}

export default authUser;