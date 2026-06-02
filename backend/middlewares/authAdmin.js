import dotenv from "dotenv";
dotenv.config();
import jwt from "jsonwebtoken";

const authAdmin = (req, res, next) => {
    try {
        const authHeader = req.headers.authorization;

        if (!authHeader || !authHeader.startsWith("Bearer ")) {
            return res.json({ success: false, message: "Unauthorized" });
        }

        const atoken = authHeader.split(" ")[1];

        const decoded = jwt.verify(atoken, process.env.JWT_SECRET);
        req.adminId = decoded.adminId;
        next();
    } catch (error) {
        console.error(error);
        res.json({ success: false, message: "Unauthorized" });
    }
}

export default authAdmin;