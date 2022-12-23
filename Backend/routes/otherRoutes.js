import express from 'express'
import { getallEvents } from '../controllers/otherController.js';
const router = express.Router();

router.route("/getAllEvents").get(getallEvents);

export default router