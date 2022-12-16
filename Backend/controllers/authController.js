import jwt from 'jsonwebtoken'
import bcrypt from 'bcryptjs'
import { createCustomError } from "../errors/customError.js";
import connection from '../database.js';

//SIGNUP USER
export const signUp = async (req, res, next) => {
    let flag = 0;
    try {
        const { name, email, password } = req.body;

        if (!name || !email || !password) {
            return next(createCustomError("Please provide all values", 400));
        }


        connection.query(`SELECT DISTINCT Uid FROM members WHERE Uid = ${email} `, (err, results) => {
            if (err) throw err;
            if (results.length !== 0) {
                flag = 1;
                return next(createCustomError("Email already exists", 400));
            }

        })


        const salt = await bcrypt.genSalt(5);
        const hashedPassword = await bcrypt.hash(password, salt)
        console.log(hashedPassword)
        if (flag === 0) {
            connection.query(`INSERT INTO members (Uid, Uname, Password) VALUES ("${email}", "${name}", "${hashedPassword}")`,
                (err, results) => {
                    if (err) throw err;
                    const token = jwt.sign({ email }, "goofyGeeks", { expiresIn: "1h" });

                    res.status(201).json({
                        user: {
                            email: email,
                            name: name
                        },
                        token
                    });
                });
        } else {
            flag = 0;
        }

    } catch (error) {
        next(error);
    }
}

//LOGIN USER
export const login = async (req, res, next) => {
    try {
        const { email, password } = req.body;

        if (!email || !password) {
            return next(createCustomError("Please provide all values", 400));
        }

        connection.query(`SELECT * FROM members WHERE Uid = ${email} `, (err, results) => {
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
                        const token = jwt.sign({ email }, "goofyGeeks", { expiresIn: "1h" });

                        res.status(201).json({
                            user: {
                                email: email,
                                admin: false,
                                name: results[0].Uname
                            },
                            token
                        });
                    }
                });
            }
        })

    } catch (error) {
        next(error);
    }

}

//LOGIN_ADMIN
export const adminLogin = async (req, res, next) => {
    try {
        const { name, email, password } = req.body;

        if (!name || !email || !password) {
            return next(createCustomError("Please provide all values", 400));
        }
        connection.query(`SELECT * FROM members WHERE Uid = ${email} `, (err, results) => {
            if (err) throw err;
            console.log(results);
            if (results.length === 0) {
                return next(createCustomError("User has not registered", 400));
            }
            if (results[0].Admin === 0) {
                return next(createCustomError("Invalid credentials", 400));
            }
            else {
                bcrypt.compare(password, results[0].Password, (err1, result) => {
                    if (!result) {
                        return res.status(400).json({ msg: "Incorrect password" });
                    }
                    else {
                        const token = jwt.sign({ email }, "goofyGeeks", { expiresIn: "1h" });

                        res.status(201).json({
                            user: {
                                email: email,
                                admin: true,
                                name: results[0].Uname
                            },
                            token
                        });
                    }
                });
            }
        })

    } catch (error) {
        next(error)
    }
}

//UPDATE USER
export const updateUser = async (req, res, next) => {
    try {
        const { id: _id } = req.params;
        const { name, password } = req.body;

        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt)

        connection.query(`SELECT * FROM members WHERE Uid = ${_id} `, (err, results) => {
            if (err) throw err;
            if (results.length === 0) {
                return next(createCustomError("User does not exist", 400));
            }
            else {
                connection.query(`UPDATE members SET Uname = "${name}", Password = "${hashedPassword}" WHERE Uid=${_id}`, (err, result4) => {
                    if (err) throw err;
                    res.status(200).json({
                        name: name,
                        email: _id
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
        if ( !email || !password) {
            return next(createCustomError("Please provide all values", 400));
        }

        connection.query(`SELECT * FROM members WHERE Uid = ${_id} `, (err, results) => {
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
                    else{
                        connection.query(`DELETE FROM members WHERE Uid="${email}"`, (err, result4) => {
                            if (err) throw err;
                            res.status(200).json({
                                msg:"Deleted Successfully"
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
