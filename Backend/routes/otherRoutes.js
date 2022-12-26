import express from 'express'
import { getallEvents, searchEvents,getallEventsByDate,getallEventsByPopularity,getAllClubs,getEventsByClubs, getClub} from '../controllers/otherController.js';
const router = express.Router();

router.route("/getAllEvents").get(getallEvents);
router.route("/search/:search_query").get(searchEvents);
router.route("/search/").get(getallEvents);
router.route("/getAllEvents/date").get(getallEventsByDate);
router.route("/getAllEvents/popularity").get(getallEventsByPopularity);
router.route("/getAllClubs/").get(getAllClubs);
router.route("/getEventsByCLubs/:filter_param").get(getEventsByClubs);
router.route("/getEventsByCLubs/").get(getallEvents);
router.route("/getClub/:id").get(getClub);
export default router