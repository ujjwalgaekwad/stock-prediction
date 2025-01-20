import { Router } from "express";
import { verifyJWT } from "../middlewares/auth.middleware.js";
import { addToWishlist, clearWishlist, getWishlist, removeFromWishlist } from "../controllers/whishlist.controller.js";

const router = Router()

router.route("/get").post(verifyJWT, getWishlist)
router.route("/add").post(verifyJWT, addToWishlist)
router.route("/remove").post(verifyJWT, removeFromWishlist)
router.route("/clear").post(verifyJWT, clearWishlist)

export default router;