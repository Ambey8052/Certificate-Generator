import bcrypt from "bcryptjs";
import Admin from "../models/Admin.js";
import generateToken from "../utils/generateToken.js";

const registerAdmin = async (req, res, next) => {
  try {
    const { name, email, password } = req.body;

    if (!name || !email || !password) {
      res.status(400);
      throw new Error("Name, email, and password are required");
    }

    const existingAdmin = await Admin.findOne({ email: email.toLowerCase() });
    if (existingAdmin) {
      res.status(409);
      throw new Error("Admin with this email already exists");
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const admin = await Admin.create({
      name,
      email: email.toLowerCase(),
      password: hashedPassword,
    });

    const token = generateToken(admin._id);

    res.status(201).json({
      message: "Admin registered successfully",
      admin: {
        id: admin._id,
        name: admin.name,
        email: admin.email,
      },
      token,
    });
  } catch (error) {
    next(error);
  }
};

const loginAdmin = async (req, res, next) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      res.status(400);
      throw new Error("Email and password are required");
    }

    const admin = await Admin.findOne({ email: email.toLowerCase() });
    if (!admin) {
      res.status(401);
      throw new Error("Invalid credentials");
    }

    const isMatch = await bcrypt.compare(password, admin.password);
    if (!isMatch) {
      res.status(401);
      throw new Error("Invalid credentials");
    }

    const token = generateToken(admin._id);

    res.status(200).json({
      message: "Login successful",
      admin: {
        id: admin._id,
        name: admin.name,
        email: admin.email,
      },
      token,
    });
  } catch (error) {
    next(error);
  }
};

const getProfile = async (req, res) => {
  res.status(200).json({
    admin: req.admin,
  });
};

export { registerAdmin, loginAdmin, getProfile };
