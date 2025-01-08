import mongoose from "mongoose";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";

const captainSchema = new mongoose.Schema({
    fullName: {
        firstName: {
            type: String,
            required: true
        },
        lastName: {
            type: String,
            required: true
        }
    },
    email: {
        type: String,
        required: true,
        unique: true,
        lowercase: true,
        match: [/^[^\s@]+@[^\s@]+\.[^\s@]+$/, 'Please enter a valid email address']
    },
    password: {
        type: String,
        required: true,
        select: false,
    },
    socketId: {
        type: String,
        default: null
    },
    status: {
        type: String,
        enum: ['active', 'inactive'],
        default: 'inactive'
    },
    vehicle: {
        color: {
            type: String,
            required: true,
            minLength: [3, 'Vehicle name must be at least 3 characters long'],
        },
        plate: {
            type: String,
            required: true,
            minLength: [5, 'Vehicle plate must be at least 5 characters long'],
        },
        capacity: {
            type: Number,
            required: true,
            min: [1, 'Vehicle capacity must be at least 1'],
        },
        type: {
            type: String,
            required: true,
            enum: ['car', 'bike', 'auto'],
        }
    },
    location: {
        latitude: {
            type: Number,
        },
        longitude: {
            type: Number,
        }
    }
});

captainSchema.methods.generateAuthToken = async function () {
    const token = jwt.sign({ _id: this._id }, 
      process.env.JWT_SECRET, {
      expiresIn: "24h"
    });
    return token;
  }
  
captainSchema.methods.comparePassword = async function (password) {
    return await bcrypt.compare(password, this.password);
  }
  
captainSchema.statics.hashPassword = async function (password) {
    return await bcrypt.hash(password, 10);
  }

export default mongoose.model("Captain", captainSchema);
