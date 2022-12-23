import express from 'express'
import { getallEvents, searchEvents } from '../controllers/otherController.js';
const router = express.Router();

router.route("/getAllEvents").get(getallEvents);
router.route("/search/:search_query").get(searchEvents);
router.route("/search/").get(getallEvents);
export default router