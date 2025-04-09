import express from "express";
import protectRoute from "../middlewares/protectRoute.js"; // Your existing middleware
import User from "../models/userModel.js";

const router = express.Router();

router.get("/verify", protectRoute, async (req, res) => {
  try {
    const user = await User.findById(req.user._id).select("-password");
    if (!user) {
      return res.status(401).json({ message: "User not found" });
    }
    res.json({ user });
  } catch (error) {
    console.error("Error verifying user:", error);
    res.status(500).json({ message: "Internal server error" });
  }
});

export default router;
