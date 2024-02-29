import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: [true, "Please provide a username."],
        unique: [true, "Username already taken."],
    },
    email: {
        type: String,
        required: [true, "Please provide an email."],
        unique: [true, "Email already registered."],
    },
    password: {
        type: String,
        required: [true, "Please provide a password."]
    },
    isVerified: {
        type: Boolean,
        default: false
    },
    role: {
        type: String,
        default: "normal_user"
    },
    
    verifyToken: String,
    verifyTokenExpiry: Date,

    forgotPasswordToken: String,
    forgotPasswordTokenExpiry: Date,
});

const User = mongoose.models.users || mongoose.model("users", userSchema);
export default User;