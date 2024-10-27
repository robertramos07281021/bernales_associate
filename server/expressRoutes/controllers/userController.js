import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import "dotenv/config.js";
import User from "../../model/user.js";
import asyncHandler from "../../middleware/asyncHandler.js";

const createToken = (req, userId) => {
  const token = jwt.sign({ userId }, process.env.SECRET, {
    expiresIn: "2d",
  });
  req.cookie("jwt", token, {
    httpOnly: true,
    secure: process.env.NODE_ENV != "development",
    sameSite: "strict",
    maxAge: 2 * 24 * 60 * 60 * 1000,
  });
  return token;
};

export const register = asyncHandler(async (req, res) => {
  const { username, password, name } = req.body;
  if (!username || !password || !name)
    return res.status(400).json({ message: "All field are required!" });

  const existingUser = await User.findOne({ username });
  if (existingUser) {
    return res.status(400).json({ message: "Username is already in used." });
  } else {
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    try {
      await User.create({
        username,
        password: hashedPassword,
        name: name.toUpperCase(),
      });
      return res.status(200).json({ message: "Account has been created" });
    } catch (error) {
      return res.status(500).json({ error: error.message });
    }
  }
});

export const login = asyncHandler(async (req, res) => {
  const { username, password } = req.body;
  if (!username || !password) {
    throw new Error("All fields are required.");
  }

  const user = await User.findOne({ username });
  if (user) {
    const match = await bcrypt.compare(password, user.password);
    if (match) {
      createToken(res, user.id);
      return res
        .status(200)
        .json({ id: user._id, username: user.username, name: user.name });
    } else {
      return res.status(400).json({ error: "Incorrect username or password" });
    }
  } else {
    return res.status(400).json({ error: "incorrect username or password" });
  }
});

export const logout = (req, res) => {
  res.cookie("jwt", "", {
    httpOnly: true,
    expires: new Date(0),
  });
  return res.status(200).json({ message: "Logged out successfully" });
};
