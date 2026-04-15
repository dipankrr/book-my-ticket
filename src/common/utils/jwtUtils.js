import "dotenv/config";
import jwt from "jsonwebtoken";
import ApiError  from "../utils/ApiError.js";


const generateAccessToken = (payload) => {
  return jwt.sign(payload, process.env.JWT_ACCESS_SECRET, {
    expiresIn: process.env.JWT_ACCESS_EXPIRES_IN || "15m",
  });
};

const verifyAccessToken = (token) => {
    try {
        return jwt.verify(token, process.env.JWT_ACCESS_SECRET);
    } catch (err) {
      console.log(err);
      
        if (err.name === "TokenExpiredError") {
            throw ApiError.unauthorized("Access token expired");
        }

        if (err.name === "JsonWebTokenError") {
            throw ApiError.unauthorized("Invalid access token");
        }

        throw ApiError.unauthorized("Authentication failed");
    }
};



const generateRefreshToken = (payload) => {
  return jwt.sign(payload, process.env.JWT_REFRESH_SECRET, {
    expiresIn: process.env.JWT_REFRESH_EXPIRES_IN || "7d",
  });
};

const verifyRefreshToken = (token) => {
  return jwt.verify(token, process.env.JWT_REFRESH_SECRET);
};

// const generateResetToken = () => {
//   const rawToken = crypto.randomBytes(32).toString("hex");
//   const hashedToken = crypto
//     .createHash("sha256")
//     .update(rawToken)
//     .digest("hex");

//   return { rawToken, hashedToken };
// };

export {
  verifyAccessToken,
  verifyRefreshToken,
  generateAccessToken,
  generateRefreshToken,
};
