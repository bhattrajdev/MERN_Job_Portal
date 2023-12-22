import {
  createUser,
  getUsers,
  getUser,
  deleteUser,
  updateUser,
} from "../controllers/UserController.js";
import express from "express";

const router = express.Router();

// routers realted to users
router.route("/").get(getUsers).post(createUser).get(getUser);
router.route("/:id").get(getUser).delete(deleteUser).put(updateUser);

export default router;
