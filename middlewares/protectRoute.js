import User from "../models/userModel.js";
import jwt from "jsonwebtoken";

const protectRoute = async (req, res, next) => {
  try {
    const token = req.cookies.jwt;

    if (!token) {
      return res.status(401).json({ message: "Not authorized, no token" });
    }

    let decoded;
    try {
      decoded = jwt.verify(token, process.env.JWT_SECRET);
    } catch (err) {
      if (err.name === "TokenExpiredError") {
        res.clearCookie("jwt", {
          httpOnly: true,
          sameSite: "strict",
          path: "/",
        });

        return res
          .status(401)
          .json({ message: "Token expired, please log in again" });
      } else if (err.name === "JsonWebTokenError") {
        return res
          .status(401)
          .json({ message: "Invalid token, not authorized" });
      } else {
        return res
          .status(500)
          .json({ message: "Something went wrong with token validation" });
      }
    }

    if (!decoded) {
      return res.status(401).json({ message: "Not authorized" });
    }

    const user = await User.findById(decoded.userId).select("-password");

    if (!user) {
      return res.status(401).json({ message: "User not found" });
    }

    req.user = user;
    next();
  } catch (err) {
    console.error("Error in protectRoute middleware:", err);
    res.status(500).json({ message: "Server error" });
  }
};

export default protectRoute;
