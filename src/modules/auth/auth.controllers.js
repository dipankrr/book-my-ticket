import * as authService from "./auth.service.js";
import ApiResponse from "../../common/utils/ApiResponse.js";


const register = async (req, res) => {
  const user = await authService.register(req.body);
  ApiResponse.created(
    res,
    "Registration successful. Please verify your email.",
    user,
  );
};

const login = async (req, res) => {
  const accessToken = await authService.login(req.body);

  res.cookie("accessToken", accessToken, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "strict",
    maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
  });

  ApiResponse.ok(
    res,
    "Login successfull",
    accessToken,
  );
};



export{
    register,
     login
}
