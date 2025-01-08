import userModel from "../models/user.model.js";
import jwt from "jsonwebtoken";
import BlacklistTokenModel from "../models/blacklistToken.model.js";

export const authUser = async (req, res, next) => {
    const token = req.headers.authorization?.split(' ')[1];
    if (!token) {
        return res.status(401).json({ message: "Unauthorized" });
    }


    const isBlacklisted = await BlacklistTokenModel.findOne({ token });
    if (isBlacklisted) {
        return res.status(401).json({ message: "Unauthorized" });
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        const user = await userModel.findById(decoded._id);
        req.user = user;
        return next();

    } catch (error) {
        return res.status(401).json({ message: "Unauthorized" });
    }
    
};

export default {
    authUser
};