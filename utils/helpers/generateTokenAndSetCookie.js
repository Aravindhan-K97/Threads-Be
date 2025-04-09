import jwt from "jsonwebtoken";

const generateTokenAndSetCookie = (userId, res) => {
  try {
    const token = jwt.sign({ userId }, process.env.JWT_SECRET, {
      expiresIn: "15d",
    });

    res.cookie("jwt", token, {
      httpOnly: true,
      maxAge: 15 * 24 * 60 * 60 * 1000,
      sameSite: "strict",
      path: "/",
    });

    return token;
  } catch (error) {
    console.error("Error generating token or setting cookie:", error);
    throw new Error("Token generation failed");
  }
};

export default generateTokenAndSetCookie;
