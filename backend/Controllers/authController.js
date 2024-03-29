import User from "../models/UserSchema.js";
import Doctor from "../models/DoctorSchema.js";
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";

export const register = async (req, res) => {
  const { email, password, name, role, photo, gender } = req.body;

  try {
    let user = null;

    if (role === "patient") {
      User.findOne({ email });
    } else if (role === "doctor") {
      user = Doctor.findOne({ email });
    }

    // check if user exist
    if (user) {
      return res.status(400).json({ message: "User already exist" });
    }

    // hash password
    const salt = await bcrypt.genSalt(10);
    const hashpassword = await bcrypt.hash(password, salt);

    if (role === "patient") {
      user = new User({
        name,
        email,
        password: hashpassword,
        photo,
        gender,
        role,
      });
    }
    if (role === "doctor") {
      user = new Doctor({
        name,
        email,
        password: hashpassword,
        photo,
        gender,
        role,
      });
    }

    await user.save();

    res
      .status(200)
      .json({ success: true, message: "User successfully created" });
  } catch (err) {
    res
      .status(500)
      .json({ success: false, message: "Internal Server error, Try again" });
  }
};
export const login = async (req, res) => {
  try {
  } catch (err) {}
};
