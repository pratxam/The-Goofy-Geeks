import express from 'express'
import { createEvent, deleteEvent, editEvent, getAllEvent } from '../controllers/adminEventController.js';
const router = express.Router();

router.route("/createEvent").post(createEvent);
router.route("/getAllEvent").get(getAllEvent);
router.route("/editEvent/:id").patch(editEvent);
router.route("/deleteEvent/:id").delete(deleteEvent);

export default router;