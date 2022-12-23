import { createCustomError } from "../errors/customError.js";
import connection from '../database.js';

//GET ALL EVENTS
export const getallEvents = async (req, res, next) => {

    try {
        console.log("Hello World");
        connection.query("SELECT * FROM event", (err, result) => {
            if (err) throw err;
            res.status(200).json({
                result
            })
        })

    } catch (error) {
        next(error)
    }
}