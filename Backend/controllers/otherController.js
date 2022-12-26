import { createCustomError } from "../errors/customError.js";
import connection from '../database.js';

//GET ALL CLUBS
export const getAllClubs = async (req, res, next) => {
    try{
        connection.query("select * from club", (err, result) => {
            if (err) throw new Error(err);
            res.status(200).json({
                result
            })
        });
    } catch(error){
        next(error)
    }
}

// GET CLUB BY ID
export const getClub = async (req, res, next) => {
    try{
        const { id: id } = req.params;
        connection.query("select * from club where Cid="+id, (err, result) => {
            if (err) throw new Error(err);
            res.status(200).json({
                result
            })
        });
    } catch(error){
        next(error)
    }
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

export const getEventsByClubs = async (req, res, next) => {
    try {
        var clubIdMap = new Map();
        connection.query("select * from club", (err, result) => {
            if (err) throw new Error(err);
                result.forEach(function (element) {
                clubIdMap.set(element.Cid, element.Cname);
            });
        });
        const { filter_param: filter_param } = req.params;
        connection.query("SELECT * FROM event where C_id in ("+filter_param+")", (err, result) => {
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

// GET EVENT
export const getEvent = async (req, res, next) => {
    console.log("get event")

    try {
        var clubIdMap = new Map();
        connection.query("select * from club", (err, result) => {
            if (err) throw new Error(err);
                result.forEach(function (element) {
                clubIdMap.set(element.Cid, element.Cname);
            });
        });
        const { id : id } = req.params;
        connection.query("SELECT * FROM event where Eid="+id, (err, result) => {
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