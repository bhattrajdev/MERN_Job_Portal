import {
  createUser,
  getUsers,
  getUser,
  deleteUser,
  updateUser,
  authUser,
} from "../controllers/UserController.js";
import {protect,admin} from "../middleware/authMiddleware.js"
import express from "express";



const router = express.Router();

// ROUTES REALTED TO USERS

router.route("/").get(protect,admin,getUsers).post(createUser).get(getUser);
router.route("/:id").get(getUser).delete(deleteUser).put(updateUser);
router.route("/login").post(authUser);
export default router;
