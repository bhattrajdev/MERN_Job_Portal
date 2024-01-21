import jwt from "jsonwebtoken";
import User from "../models/userModel.js";

const checkToken = async (req, res, next) => {
  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ) {
    try {
      const token = req.headers.authorization.split(" ")[1];

      // Verify the token
      jwt.verify(token, process.env.JWT_SECRET, async (err, decoded) => {
        if (err) {
          console.error("JWT Verification Error:", err);
          res.status(401).json({ isLogin: false });
        } else {
          // Token is valid, retrieve the user
          const user = await User.findById(decoded.id).select("-password");
          if (user) {
            res.status(200).json({ isLogin: true, user: user });
          } else {
            res.status(401).json({ isLogin: false });
          }
        }
      });
    } catch (error) {
      console.error("JWT Verification Error:", error);
      res.status(401).json({ isLogin: false });
    }
  } else {
    // No token provided in headers
    res.status(401).json({ isLogin: false });
  }
};


const destroyToken = (req, res) => {
  try {
    // Remove the token from local storage
    // localStorage.removeItem("token");
    res.status(200).json({ isLogout:true });
  } catch (error) {
    console.error("Error during logout:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

export { checkToken,destroyToken };
