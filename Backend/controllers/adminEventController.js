import jwt from 'jsonwebtoken'
import bcrypt from 'bcryptjs'
import { createCustomError } from "../errors/customError.js";
import connection from '../database.js';

// CREATE EVENT
export const createEvent = async (req, res, next) => {
    try {
        let flag = 0;
        const { date, name, description, summary, link, venue, photo } = req.body;
        const { userId } = req.user
        if (!date || !name || !description || !link || !summary || !venue || !photo) {
            return next(createCustomError("Please provide all values", 400));
        }

        let clubId;
        connection.query(`SELECT Uid FROM members WHERE Uname = "${userId}"`, (err, results) => {
            if (err) throw err;
            else {
                let uID = results[0].Uid;
                connection.query(`SELECT * FROM admin WHERE aid = ${uID}`, (err3, result3) => {
                    if (err3) throw err3;
                    if (result3.length === 0) {
                        flag = 1;
                        res.status(400).json({ msg: "Unauthorized user" });
                    }
                    else {

                        clubId = result3[0].cid;
                        connection.query(`INSERT INTO event (Ename, Edate, Edescription, Esummary, Rlink, C_id, Ephoto, Evenue) VALUES("${name}", "${date}", "${description}", "${summary}", "${link}" , ${clubId}, "${photo}", "${venue}")`, (err, result) => {
                            if (err) throw err;
                            //// send event to front//
                            res.status(200).json({
                                msg: "Events created successfully",
                                eventId: result.insertId,
                                name,
                                date,
                                description,
                                summary,
                                link,
                                clubId
                            });
                        })
                    }

                })
            }
        })

    } catch (error) {
        next(error);
    }
}

//EDIT EVENT
export const editEvent = async (req, res, next) => {
    try {
        const { id: eventId } = req.params;
        const { date, name, description, summary, link, venue, photo } = req.body;
        const { userId } = req.user
        if (!date || !name || !description || !link || !summary || !venue || !photo) {
            return next(createCustomError("Please provide all values", 400));
        }

        // let clubId;
        connection.query(`SELECT Uid FROM members WHERE Uname = "${userId}"`, (err, results) => {
            if (err) throw err;
            else {
                let uID = results[0].Uid;
                connection.query(`SELECT * FROM admin WHERE aid = ${uID}`, (err3, result3) => {
                    if (err3) throw err3;
                    if (result3.length === 0) {
                        flag = 1;
                        res.status(400).json({ msg: "Unauthorized user" });
                    }
                    else {
                        let clubId = result3[0].cid;
                        connection.query(`SELECT * FROM event WHERE Eid = "${eventId}"`, (error, result12) => {
                            if (error) throw error
                            if (result12.length === 0) {
                                return res.status(404).json({ msg: "Event with this id does not exist" })
                            }
                            else {
                                let dataEid = result12[0].C_id
                                if (dataEid === clubId) {
                                    connection.query(`UPDATE event SET Ename="${name}", Edate="${date}", Edescription="${description}", Esummary="${summary}", Rlink="${link}", Ephoto="${photo}", Evenue="${venue}" WHERE Eid = ${eventId}`, (err, decoded) => {
                                        if (err) throw err;
                                        //// send event to front,///////////////////////////////////////////////////////
                                        res.status(200).json({
                                            msg: "Event Updated successfully",

                                        });
                                    })
                                }
                                else {
                                    res.status(400).json({ msg: "Unauthorized user" });
                                }
                            }
                        })


                    }

                })
            }
        })


    } catch (error) {

    }
}

export const deleteEvent = async (req, res, next) => {
    try {
        const { id: eventId } = req.params;
        const { userId } = req.user;
        connection.query(`SELECT Uid FROM members WHERE Uname = "${userId}"`, (err, results) => {
            if (err) throw err;
            else {
                let uID = results[0].Uid;
                connection.query(`SELECT * FROM admin WHERE aid = ${uID}`, (err3, result3) => {
                    if (err3) throw err3;
                    if (result3.length === 0) {
                        flag = 1;
                        res.status(400).json({ msg: "Unauthorized user" });
                    }
                    else {
                        let clubId = result3[0].cid;

                        connection.query(`SELECT * FROM event WHERE Eid = "${eventId}"`, (error, result12) => {
                            if (error) throw error
                            if (result12.length === 0) {
                                return res.status(404).json({ msg: "Event with this id does not exist" })
                            }
                            else {
                                let dataEid = result12[0].C_id
                                if (dataEid === clubId) {
                                    connection.query(`DELETE FROM event WHERE Eid=${eventId}`, (err4, result) => {
                                        if (err4) throw err4;
                                        res.status(200).json({
                                            msg: "Deleted Successfully"
                                        })
                                    });
                                }
                                else {
                                    res.status(400).json({ msg: "Unauthorized user" });
                                }
                            }
                        })

                    }

                })
            }
        })
    } catch (error) {

    }
}


//GET ALL EVENTS
export const getAllEvent = async (req, res, next) => {
    try {
        const { userId } = req.user;
        connection.query(`SELECT Uid FROM members WHERE Uname = "${userId}"`, (err, results) => {
            if (err) throw err;
            else {
                let uID = results[0].Uid;
                connection.query(`SELECT * FROM admin WHERE aid = ${uID}`, (err1, result1) => {
                    if (err1) throw err1;
                    if (result1.length === 0) {
                        flag = 1;
                        res.status(400).json({ msg: "Unauthorized user" });
                    }
                    else {
                        var clubIdMap = new Map();
                        connection.query("select * from club", (err, result) => {
                            if (err) throw new Error(err);
                            result.forEach(function (element) {
                                clubIdMap.set(element.Cid, element.Cname);
                            });
                        });


                        let clubId = result1[0].cid;
                        connection.query(`SELECT * FROM event WHERE C_id=${clubId}`, (err2, result2) => {
                            if (err2) throw err2;
                            let clubName =clubIdMap.get(clubId);
                            if (result2.length === 0) {
                                res.status(200).json({
                                    clubName,
                                    msg: "No Events to display",
                                    result2
                                })
                            }
                            else {
                                let clubName =clubIdMap.get(clubId);
                                result2.forEach(function (element) {
                                    element.Cname = clubIdMap.get(element.C_id);
                                });
                                res.status(200).json({
                                    clubName,
                                    numOfEvents: result2.length,
                                    result2
                                })
                            }
                        })

                    }

                })
            }
        })
    } catch (error) {
        next(error);
    }
}

//GET One event
export const getOneEvent = async (req, res, next) => {
    const { id: eventId } = req.params;
    try {
        connection.query(`SELECT * FROM event Where Eid ="${eventId}" `, (err, result) => {
            if (err) throw err;
            if (result.length === 0) {
                return res.status(404).json({ msg: "Event does not exist" });
            }
            else {
                let data = result[0];
                res.status(200).json({
                    data
                })

            }
        })

    } catch (error) {
        next(error)
    }
}