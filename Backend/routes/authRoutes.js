import express from 'express'
import { deleteUser, getallEvents, login, signUp, updateUser } from '../controllers/authController.js';
const router = express.Router();

router.route("/signUp").post(signUp);
router.route("/login").post(login);
router.route("/updateUser/:id").patch(updateUser);
router.route("/deleteUser/:id").delete(deleteUser);
router.route("/getallEvents").get(getallEvents);

export default router