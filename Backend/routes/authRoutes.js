import express from 'express'
import { deleteUser, login, signUp, updateUser } from '../controllers/authController.js';
const router = express.Router();

router.route("/signUp").post(signUp);
router.route("/login").post(login);
router.route("/updateUser/:id").patch(updateUser);
router.route("/deleteUser/:id").delete(deleteUser);

export default router