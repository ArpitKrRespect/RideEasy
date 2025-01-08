import express from "express";
import { body } from "express-validator";
import captainController from "../controllers/captain.controller.js";
import authMiddleware from "../middlewares/auth.middleware.js";


const router = express.Router();

router.post("/register", [
    body('email').isEmail().withMessage('Invalid email address'),
    body('fullName.firstName').isLength({ min: 3 }).withMessage('First name should be at least 3 characters long'),
    body('fullName.lastName').isLength({ min: 3 }).withMessage('Last name should be at least 3 characters long'),
    body('password').isLength({ min: 6 }).withMessage('Password must be at least 6 characters long'),
    body('vehicle.color').notEmpty().withMessage('Vehicle color is required'),
    body('vehicle.plate').notEmpty().withMessage('Vehicle plate is required'),
    body('vehicle.type').notEmpty().withMessage('Vehicle type is required'),
    body('vehicle.capacity').isNumeric().withMessage('Vehicle capacity must be a valid number').isInt({ min: 1 }).withMessage('Vehicle capacity must be at least 1'),
    body('location.latitude').notEmpty().withMessage('Latitude is required'),
    body('location.longitude').notEmpty().withMessage('Longitude is required'),
], captainController.registerCaptain
);


router.post("/login", [
    body('email').isEmail().withMessage('Invalid email address'),
    body('password').isLength({ min: 6 }).withMessage('Password must be at least 6 characters long'),
], captainController.loginCaptain
);

router.get("/profile", authMiddleware.authCaptain, captainController.getCaptainProfile);

router.get("/logout", authMiddleware.authCaptain, captainController.logoutCaptain);

export default router;
