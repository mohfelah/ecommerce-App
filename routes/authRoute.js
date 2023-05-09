import express from "express";
import { forgotPasswordController, loginController, registerController, testController, updateProfileController } from '../controllers/authController.js'
import { isAdmin, requireSignIn } from "../middelware/authMiddleware.js";

//router object
const router = express.Router()

//routing
//Register -- Method POST
////http://localhost:5000/api/v1/auth/register
router.post('/register', registerController)

//LOGIN || POST
//http://localhost:5000/api/v1/auth/login
router.post("/login", loginController)

//Forgot Password || POST
router.post("/forgot-password", forgotPasswordController);

//test routes --Get
//http://localhost:5000/api/v1/auth/test
router.get("/test", requireSignIn, isAdmin, testController)

//protected User route auth
router.get("/user-auth", requireSignIn, (req, res) => {
    res.status(200).send({ ok: true });
});

//protected Admin route auth
router.get("/admin-auth", requireSignIn, isAdmin, (req, res) => {
    res.status(200).send({ ok: true });
});

//update profile
router.put("/profile", requireSignIn, updateProfileController);

export default router;