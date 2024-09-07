import User from "../Models/Usermodel.js";
import bcrypt from "bcrypt";

export const Signup = async (req, res) => {
  try {
    const { name, email, password } = req.body;
    const newuser = await User.createUser(name, email, password);
    console.log("New User Created:", newuser);
    res.status(201).json({
      message: "User registered successfully",
      userdata: {
        id: newuser._id,
        name: newuser.username,
        email: newuser.email,
        role: newuser.role,
      },
    });
  } catch (error) {
    console.error("Signup Error:", error); // Debugging line
    res.status(400).json({ error: "Username or email already taken" });
  }
};

export const Login = async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return res
        .status(400)
        .json({ message: "Email and password are required" });
    }

    const user = await User.findOne({ email: email });
    if (!user) {
      return res.status(400).json({ message: "Invalid credentials" });
    }

    console.log("Password provided:", password);
    console.log("Stored user password:", user.password);

    const isMatch = await bcrypt.compare(password, user.password);
    console.log(isMatch);
    if (!isMatch) {
      return res.status(400).json({ message: "Invalid credentials" });
    }

    res.status(200).json({
      userdata: {
        id: user._id,
        name: user.username,
        email: user.email,
        role: user.role,
        phonenumber: user.phonenumber,
      },
    });
  } catch (err) {
    console.error("Login Error:", err.message);
    res.status(500).send("Server error");
  }
};

export default { Signup, Login };
