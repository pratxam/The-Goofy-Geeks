import { createCustomError } from "../errors/customError.js";
import connection from '../database.js';

//GET ALL CLUBS
export const getAllClubs = async (req, res, next) => {
    connection.query("select * from club", (err, result) => {
        if (err) throw new Error(err);
        res.send(result);
    });
}

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

//SEARCH
export const searchEvents = async (req, res, next) => {
    console.log("search events");
    try {
        var clubIdMap = new Map();
        connection.query("select * from club", (err, result) => {
            if (err) throw new Error(err);
                result.forEach(function (element) {
                clubIdMap.set(element.Cid, element.Cname);
            });
        });

        const { search_query: search_query } = req.params;
        connection.query("select * from event where Ename like '%" + search_query + "%'", (err, results) => {
            if (err) throw new Error(err);
            results.forEach(function (element) {
                element.Cname = clubIdMap.get(element.C_id);
            });
            res.status(200).json({
                result: results
            })
        })
    } catch (error) {
        next(error)
    }
}