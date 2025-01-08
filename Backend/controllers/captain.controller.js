import captainModel from "../models/captain.model.js";
import captainService from "../services/captain.service.js";
import { validationResult } from "express-validator";
import BlacklistTokenModel from "../models/blacklistToken.model.js";

const registerCaptain = async (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    const { fullName, email, password, vehicle, location } = req.body;
    console.log("Request body:", req.body);
    if(!fullName || !email || !password || !vehicle || !location) {
        return res.status(400).json({ message: "All fields (fullName, email, password, vehicle, location) are required" });
    }

    const isCaptainAlreadyRegistered = await captainModel.findOne({ email });

    if (isCaptainAlreadyRegistered) {
        return res.status(400).json({ message: "Captain already registered" });
    }

    try {
        const hashedPassword = await captainModel.hashPassword(password);

        const captain = await captainService.createCaptain({
        fullName: { 
            firstName: fullName.firstName,
            lastName: fullName.lastName
        },
        email,
        password: hashedPassword,
        color: vehicle.color,
        plate: vehicle.plate,
        vehicleType: vehicle.type,
        capacity: vehicle.capacity,
        latitude: location.latitude,
        longitude: location.longitude
    });

    const token = await captain.generateAuthToken();
    res.status(201).json({ message: "Captain registered successfully", captain, token });
    } catch (error) {
        next(error);
    }
};

const loginCaptain = async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    const { email, password } = req.body;
    console.log("Request body:", req.body);

    const captain = await captainModel.findOne({ email }).select("+password");

    if (!captain) {
        return res.status(401).json({ message: "Invalid email or password" });
    }

    console.log("Captain found:", captain);
    const isMatch = await captain.comparePassword(password);

    if (!isMatch) {
        return res.status(401).json({ message: "Invalid email or password" });
    }

    
    const token = await captain.generateAuthToken();

    res.cookie("token", token, {
        httpOnly: true, 
        secure: true, 
        maxAge: 30 * 24 * 60 * 60 * 1000 
    });
    res.status(200).json({ message: "Captain logged in successfully", captain, token });
};


const getCaptainProfile = async (req, res) => {
    res.status(200).json({ captain: req.captain });
};

const logoutCaptain = async (req, res) => {
    const token = req.cookies.token || req.headers.authorization.split(' ')[1];
    await BlacklistTokenModel.create({ token });
    res.clearCookie("token");
    res.status(200).json({ message: "Captain logged out successfully" });
};

export default { registerCaptain, loginCaptain, getCaptainProfile, logoutCaptain };
