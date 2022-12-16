import express from 'express'
import { adminLogin, deleteUser, login, signUp, updateUser } from '../controllers/authController.js';
const router = express.Router();

router.route("/signUp").post(signUp);
router.route("/login").post(login);
router.route("/adminLogin").post(adminLogin);
router.route("/updateUser/:id").patch(updateUser);
router.route("/deleteUser/:id").delete(deleteUser);

export default router;