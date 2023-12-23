import {
  createUser,
  getUsers,
  getUser,
  deleteUser,
  updateUser,
  authUser,
} from "../controllers/UserController.js";
import express from "express";

const router = express.Router();

// routers realted to users
router.route("/").get(getUsers).post(createUser).get(getUser);
router.route("/:id").get(getUser).delete(deleteUser).put(updateUser);
router.route("/login").post(authUser)
export default router;
