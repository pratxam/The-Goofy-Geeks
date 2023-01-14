import express from 'express'
import { deleteUser, login, signUp, updateUser, logoutUser } from '../controllers/authController.js';
const router = express.Router();

router.route("/signUp").post(signUp);
router.route("/login").post(login);
router.route("/updateUser/:id").patch(updateUser);
router.route("/deleteUser/:id").delete(deleteUser);
router.route("/logout").post(logoutUser);
export default router