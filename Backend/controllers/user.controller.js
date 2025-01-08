import userModel from "../models/user.model.js";
import userService from "../services/user.service.js";
import { validationResult } from "express-validator";

export const registerUser = async (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    const { fullname, email, password } = req.body;

    console.log("Request body:", req.body);

    if (!fullname || !fullname.firstname || !fullname.lastname || !email || !password) {
        return res.status(400).json({ message: "All fields (fullname, email, password) are required" });
    }

    try {
        const hashedPassword = await userModel.hashPassword(password);
        const user = await userService.createUser({
            fullname,
            email,
            password: hashedPassword
        });

        const token = await user.generateAuthToken();

        res.status(201).json({ message: "User created successfully", user, token });
    } catch (error) {
        next(error);
    }
};

export default {
    registerUser
};
