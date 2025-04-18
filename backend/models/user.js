import mongoose from "mongoose";
import mongooseUniqueValidator from "mongoose-unique-validator";

const userSchema = mongoose.Schema({
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
});

userSchema.plugin(mongooseUniqueValidator, { message: "Email already in use." });

const User = mongoose.model("User", userSchema);
export default User;
