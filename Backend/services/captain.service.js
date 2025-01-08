import captainModel from "../models/captain.model.js";

export const createCaptain = async ({ fullName, email, password, color, plate, vehicleType, capacity, latitude, longitude }) => {
    console.log("Received data:", { fullName, email, password, color, plate, vehicleType, capacity, latitude, longitude });

    if (!fullName || !fullName.firstName || !fullName.lastName) {
        throw new Error("Full name must include both first and last name.");
    }

    if (!email) {
        throw new Error("Email is required.");
    }

    if (!password) {
        throw new Error("Password is required.");
    }

    if (!color || !plate || !vehicleType || !capacity) {
        throw new Error("Vehicle must include color, plate, type, and capacity.");
    }

    if (capacity < 1) {
        throw new Error("Vehicle capacity must be at least 1.");
    }

    if (latitude === undefined || longitude === undefined) {
        throw new Error("Location must include latitude and longitude.");
    }

    const captain = await captainModel.create({
        fullName: {
            firstName: fullName.firstName,
            lastName: fullName.lastName
        },
        email,
        password, 
        vehicle: {
            color,
            plate,
            type: vehicleType,
            capacity
        },
        location: {
            latitude,
            longitude
        }
    });

    return captain;
};


export default { createCaptain };
