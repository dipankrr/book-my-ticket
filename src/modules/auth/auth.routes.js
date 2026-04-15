import { Router } from "express";
import * as controller from "./auth.controllers.js";
import { validate } from "../../common/middlewares/validate.middleware.js";
import { loginSchema, registerSchema } from "./auth.validate-models.js";
import { authenticate } from "./auth.middleware.js";

const router = Router();

router.post("/register", validate(registerSchema), controller.register);
router.post("/login", validate(loginSchema), controller.login);
// router.post("/refresh-token", controller.refreshToken);
// router.post("/logout", authenticate, controller.logout);
// router.get("/verify-email/:token", controller.verifyEmail);

router.get("/safe", authenticate, async(req, res) =>{
    res.send("congo, youre authenticated")
})


export default router