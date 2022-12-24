import express from 'express'
import { getallEvents, searchEvents,getallEventsByDate,getallEventsByPopularity } from '../controllers/otherController.js';
const router = express.Router();

router.route("/getAllEvents").get(getallEvents);
router.route("/search/:search_query").get(searchEvents);
router.route("/search/").get(getallEvents);
router.route("/getAllEvents/date").get(getallEventsByDate);
router.route("/getAllEvents/popularity").get(getallEventsByPopularity);
export default router