import userModel from "../models/user.model.js";

export const createUser = async ({ fullname, email, password }) => {
    console.log("Received data:", { fullname, email, password });

    if (!fullname || !email || !password) {
        throw new Error("All fields are required");
    }

    if (!fullname.firstname || !fullname.lastname) {
        throw new Error("Full name must include both first and last name.");
    }

    const user = await userModel.create({ 
        fullname,
        email,
        password
    });

    return user;
};

export default { createUser };
