import jwt from 'jsonwebtoken'
import bcrypt from 'bcryptjs'
import { createCustomError } from "../errors/customError.js";
import connection from '../database.js';


//SIGNUP USER
export const signUp = async (req, res, next) => {


    let flag = 0;
    try {
        const { email, password } = req.body;

        if (!email || !password) {
            return next(createCustomError("Please provide all values", 400));
        }

        const salt = await bcrypt.genSalt(5);
        const hashedPassword = await bcrypt.hash(password, salt)

        connection.query(`SELECT DISTINCT Uname FROM members WHERE Uname = "${email}" `, (err, results) => {
            if (err) throw err;
            if (results.length !== 0) {
                flag = 1;
                return next(createCustomError("Email already exists", 400));
            }
            else {
                connection.query(`INSERT INTO members ( Uname, Password) VALUES ("${email}", "${hashedPassword}")`,
                    (err, results) => {
                        if (err) throw err;
                        res.status(201);
                    });

            }

        })
    } catch (error) {
        next(error);
    }
}

//LOGIN USER
export const login = async (req, res, next) => {
    try {
        console.log("hello");
        const { email, password } = req.body;
        
        if (!email || !password) {
            return next(createCustomError("Please provide all values", 400));
        }

        connection.query(`SELECT * FROM members WHERE Uname = "${email}" `, (err, results) => {
            if (err) throw err;
            if (results.length === 0) {
                return next(createCustomError("User has not registered", 400));
            }
            else {
                bcrypt.compare(password, results[0].Password, (err1, result) => {
                    if (!result) {
                        return res.status(400).json({ msg: "Incorrect password" });
                    }
                    else {
                        const userId = results[0].Uid
                        const token = jwt.sign({ userId }, "goofygeeks", { expiresIn: "1h" });
                        console.log(token);
                        connection.query(`SELECT * FROM admin WHERE aid = ${userId}`, (er, result2) => {
                            if (er) throw er;
                            if (result2.length === 0) {
                                res.cookie('userId',userId,{path:'/', maxAge:1000*60*60*24})
                                res.cookie('adminId','',{path:'/', maxAge:1000*60*60*24})
                                res.cookie('token',token,{path:'/', maxAge:1000*60*60*24})
                                res.status(200).json({})
                            }
                            else {
                                res.cookie('userId',results[0].Uid,{path:'/'})
                                res.cookie('adminId',result2[0].aid,{path:'/'})
                                res.cookie('token',token,{path:'/'})
                                res.status(200).json({})
                            }
                        })
                    }
                });
            }
        })

    } catch (error) {
        next(error);
    }

}


//UPDATE USER
export const updateUser = async (req, res, next) => {
    try {
        const { id: _id } = req.params;
        const { password } = req.body;

        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt)

        connection.query(`SELECT * FROM members WHERE Uname = "${_id}" `, (err, results) => {
            if (err) throw err;
            if (results.length === 0) {
                return next(createCustomError("User does not exist", 400));
            }
            else {
                connection.query(`UPDATE members SET Password = "${hashedPassword}" WHERE Uname="${_id}"`, (err, result4) => {
                    if (err) throw err;
                    res.status(200).json({
                        msg: "Updated successfully",
                        Uid: _id
                    })
                });
            }
        })

    } catch (error) {
        next(error)
    }
}

//DELETE USER
export const deleteUser = async (req, res, next) => {
    try {
        const { id: _id } = req.params;
        const { email, password } = req.body;
        if (!email || !password) {
            return next(createCustomError("Please provide all values", 400));
        }

        connection.query(`SELECT * FROM members WHERE Uname = "${_id}" `, (err, results) => {
            if (err) throw err;
            if (results.length === 0) {
                return next(createCustomError("User does not exist", 400));
            }

            else {
                bcrypt.compare(password, results[0].Password, (err1, result) => {
                    if (err1) throw err1;
                    if (!result) {
                        return res.status(400).json({ msg: "Incorrect password" });
                    }
                    else {
                        connection.query(`DELETE FROM members WHERE Uname="${email}"`, (err, result4) => {
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
        next(error)
    }
}




