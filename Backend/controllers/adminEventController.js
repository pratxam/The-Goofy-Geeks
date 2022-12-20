import jwt from 'jsonwebtoken'
import bcrypt from 'bcryptjs'
import { createCustomError } from "../errors/customError.js";
import connection from '../database.js';

// CREATE EVENT
export const createEvent = async (req, res, next) => {
    try {
        let flag = 0;
        const { date, name, description, summary, link } = req.body;
        const { userId } = req.user
        if (!date || !name || !description || !link || !summary) {
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
                        connection.query(`INSERT INTO event (Ename, Edate, Edescription, Esummary, Rlink, C_id) VALUES("${name}", "${date}", "${description}", "${summary}", "${link}" , ${clubId})`, (err, result) => {
                            if (err) throw err;
                            //// send event to front//
                            res.status(200).json({
                                msg: "Events created successfully",
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
        const { date, name, description, summary, link } = req.body;
        const { userId } = req.user
        if (!date || !name || !description || !link || !summary) {
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
                        // clubId = result3[0].cid;
                        connection.query(`UPDATE event SET Ename="${name}", Edate="${date}", Edescription="${description}", Esummary="${summary}", Rlink="${link}" WHERE Eid = ${eventId}`, (err, decoded) => {
                            if (err) throw err;
                            //// send event to front,///////////////////////////////////////////////////////
                            res.status(200).json({
                                msg: "Event Updated successfully",
                            
                            });
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
                        // clubId = result3[0].cid;
                        connection.query(`DELETE FROM event WHERE Eid=${eventId}`, (err, result) => {
                            if (err) throw err;
                            res.status(200).json({
                                msg: "Deleted Successfully"
                            })
                        });
                        
                    }

                })
            }
        })
    } catch (error) {

    }
}


//GET ALL EVENTS
export const getAllEvent = async(req, res, next)=>{
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
                        let clubId = result1[0].cid;
                       connection.query(`SELECT * FROM event WHERE C_id=${clubId}`, (err2, result2)=>{
                        if(err2) throw err2;
                        if(result2.length ===0){
                            res.status(200).json({
                                msg:"No Events to display",
                                result2
                            })
                        }
                        else{
                            res.status(200).json({
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