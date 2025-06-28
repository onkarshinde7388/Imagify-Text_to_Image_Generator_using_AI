import express from "express";
import {registeredUser,loginUser, userCredits, paymentRazorpay, verifyRazorpay} from "../controllers/userController.js";
import userAuth from "../middlewares/auth.js";

const userRouter = express.Router();

userRouter.post("/register", registeredUser);
userRouter.post("/login", loginUser);
userRouter.get("/credits", userAuth ,userCredits);
userRouter.post("/pay-razor", userAuth, paymentRazorpay);
userRouter.post("/verify-razor", verifyRazorpay);

export default userRouter;
