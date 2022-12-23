import { createCustomError } from "../errors/customError.js";
import connection from '../database.js';

//GET ALL EVENTS
export const getallEvents = async (req, res, next) => {
    console.log("get all events")

    try {
        var clubIdMap = new Map();
        connection.query("select * from club", (err, result) => {
            if (err) throw new Error(err);
            result.forEach(function (element) {
                clubIdMap.set(element.Cid, element.Cname);
            });
        });

        connection.query("SELECT * FROM event", (err, result) => {
            if (err) throw err;
            result.forEach(function (element) {
                element.Cname = clubIdMap.get(element.C_id);
            });
            res.status(200).json({
                result
            })
        })

    } catch (error) {
        next(error)
    }
}