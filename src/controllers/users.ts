import { Request, Response, NextFunction, query } from 'express';
import { datalog } from '../task-manager/db';

interface Post {
    userName: Number;
    id: Number;
    title: String;
    body: String;
}
const getUser = async (req: Request, res: Response, next: NextFunction) => {
    let query = `SELECT * FROM users WHERE id = ${(datalog.escape(req.params.id))}`;
    datalog.query(query, (err, rows) => {
        if (err) throw err;
        console.log(rows);
        res.send({ rows })
    })
};
    const getAllUsers = async (req: Request, res: Response, next: NextFunction) => {
        let query = 'SELECT * FROM users';
        datalog.query(query, (err, rows) => {
            if (err) throw err;
            console.log(rows);
            res.send({ rows })
        });;
    };
    const updateUser = async (req: Request, res: Response, next: NextFunction) => {
            // Generating Query
            let query =
            `UPDATE users SET firstName = ${datalog.escape(req.body.firstName)} WHERE id = ${(datalog.escape(req.params.id))}`;
            // Executing Query
            datalog.query(query,[req.body.firstName,req.params.id],(err, rows) => {
                if (err) throw err;
                console.log(rows);
            });
    };
    const deleteUser = async (req: Request, res: Response, next: NextFunction) => {
            let query = `DELETE FROM users WHERE id = ${(datalog.escape(req.params.id))}`;
            datalog.query(query, (err, rows) => {
                if (err) throw err;
                res.send({message: "Deleted Successfully"})
            });
    };
    const addUser = async (req: Request, res: Response, next: NextFunction) => {
        let query = `INSERT INTO users (firstName, lastName, contact, email, password, usertypeid) VALUES (${datalog.escape(req.body.firstName)}, ${datalog.escape(req.body.lastName)},${datalog.escape(req.body.contact)},${datalog.escape(req.body.email)},${datalog.escape(req.body.password)},${(parseInt(req.body.usertypeid))});`;
        console.log(query)
        datalog.query(query, (err: any, rows) => {
            if (err) throw err;
            res.send({ Done: "Done" })
        });
    };

    export default { getAllUsers, getUser, addUser, updateUser, deleteUser };