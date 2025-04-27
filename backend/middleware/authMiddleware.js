import jwt from "jsonwebtoken";
import User from "../models/User.js";

export const protect = async (req, res, next) => {
  const token = req.headers.authorization?.split(" ")[1];

  if (!token)
    return res.status(401).json({ message: "Unauthorized, no token" });

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = await User.findById(decoded.id).select("-password");
    next();
  } catch (error) {
    res.status(401).json({ message: "Token failed" });
  }
};

export const isAdmin = (req, res, next) => {
  if (req.user?.role === 0) next();
  else res.status(403).json({ message: "Admin access required" });
};

export const isClient = (req, res, next) => {
  if (req.user?.role === 1) next();
  else res.status(403).json({ message: "Client access required" });
};
