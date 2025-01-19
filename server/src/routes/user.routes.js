import { Router } from "express";
import {
    changeCurrentPassword,
    getCurrentUser,
    loginUser,
    logoutUser,
    refreshAccessToken,
    registerUser,
    updateAccountDetails,
    updateUserAvatar,
    searchUserByUsername,
    passwordRecovery,
    sendOtp,
    sendFeedback
} from "../controllers/user.controller.js";
import { verifyJWT } from "../middlewares/auth.middleware.js";
import { upload } from "../middlewares/multer.middleware.js";

const router = Router()

router.route("/register/avatar").post(
    upload.single("avatar"),
    registerUser
)
router.route("/register").post(registerUser)
router.route("/login").post(loginUser)
router.route("/send-otp").post(sendOtp)
router.route("/recover-password").patch(passwordRecovery)
router.route("/refresh-token").post(refreshAccessToken)

// secure routes
router.route("/logout").post(verifyJWT, logoutUser)
router.route("/change-password").post(verifyJWT, changeCurrentPassword)
router.route("/current-user").get(verifyJWT, getCurrentUser)
router.route("/update-account").patch(verifyJWT, updateAccountDetails)
router.route("/avatar").patch(verifyJWT, upload.single("avatar"), updateUserAvatar)
router.route("/feedback").post(verifyJWT, sendFeedback)
router.route("/verified-search/username").patch(verifyJWT, searchUserByUsername)
router.route("/search/username").patch(searchUserByUsername)

export default router;