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
export const getallEventsByDate = async (req, res, next) => {
    console.log("get all events")

    try {
        var clubIdMap = new Map();
        connection.query("select * from club", (err, result) => {
            if (err) throw new Error(err);
                result.forEach(function (element) {
                clubIdMap.set(element.Cid, element.Cname);
            });
        });

        connection.query("SELECT * FROM event order by Edate", (err, result) => {
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
export const getallEventsByPopularity = async (req, res, next) => {
    console.log("get all events")

    try {
        var clubIdMap = new Map();
        connection.query("select * from club", (err, result) => {
            if (err) throw new Error(err);
                result.forEach(function (element) {
                clubIdMap.set(element.Cid, element.Cname);
            });
        });
        var eventIdMap = new Map();
        connection.query("SELECT * FROM event", (err, result) => {
            if (err) throw err;
            result.forEach(function (element) {
                element.Cname = clubIdMap.get(element.C_id);
            });
            result.forEach(function (element) {
                eventIdMap.set(element.Eid, element)
            });
        })
        connection.query("SELECT Eid FROM register GROUP BY Eid ORDER BY count(Uid) Desc", (err, result) => {
            if (err) throw err;
            var events = []
            result.forEach(function (element) {
                events.push(eventIdMap.get(element.Eid));
            });
            res.status(200).json({
                'result': events
            })
        })
        
    } catch (error) {
        next(error)
    }
}