import { Request, Response } from 'express';
import jwt from 'jsonwebtoken';
import { datalog } from '../task-manager/db';

interface Login {
    email: String
    password: String
}

interface Register {
    firstName: String
    email: String
    password: String
}
const getUser = async (req: Request, res: Response) => {
    datalog.query(
        `SELECT * FROM users WHERE email = ${datalog.escape(req.body.email)};`,
        (_err, result) => {
            if (!result.length) {
                return res.status(400).send({
                    message: "User does not exist"
                });
            }
            if (result[0].password != req.body.password) {
                return res.status(400).send({
                    message: "Password do not match"
                });
            }
            const token = jwt.sign({ id: result[0].id }, 'the-super-strong-secrect', { expiresIn: '1h' });
            // datalog.query(    
            //     `UPDATE users SET last_login = now() WHERE id = '${result[0].id}'`
            // );
            return res.status(200).send({
                msg: 'Logged in!',
                token,
                user: result[0]
            });
        })
};
const registerUser = async (req: Request, res: Response) => {
    datalog.query(
        `SELECT * FROM users WHERE LOWER(email) = LOWER(${datalog.escape(
            req.body.email
        )});`,
        (err, result) => {
            if (result.length) {
                return res.status(409).send({
                    msg: 'This user is already in use!'
                });
            } else {
                datalog.query(`INSERT INTO users (firstName, lastName, contact, email, password, usertypeid) VALUES (${(datalog.escape(req.body.firstName))},${(datalog.escape(req.body.lastName))},${(datalog.escape(req.body.contact))},${(datalog.escape(req.body.email))},${(datalog.escape(req.body.password))},${(parseInt(req.body.usertypeid))})`,
                    (err, _result) => {
                        if (err) {
                            throw err;
                            return res.status(400).send({
                                msg: err
                            });
                        }
                        return res.status(201).send({
                            msg: 'The user has been registerd with us!'
                        });
                    }
                );
            }
        });
}

export default { getUser, registerUser };