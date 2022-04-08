import { Request, Response, NextFunction, query } from 'express';
import axios, { AxiosResponse } from 'axios';
import { datalog } from '../task-manager/db';

interface Post {
    userName: Number;
    id: Number;
    title: String;
    body: String;
}
const getbook = async (req: Request, res: Response, next: NextFunction) => {
    let query = "SELECT * FROM users WHERE id = '18'";
    datalog.query(query, (err, rows) => {
        if (err) throw err;
        console.log(rows);
        res.send({ rows })
    })
};
    const getbooks = async (req: Request, res: Response, next: NextFunction) => {
        let query = 'SELECT * FROM users';
        datalog.query(query, (err, rows) => {
            if (err) throw err;
            console.log(rows);
            res.send({ rows })
        });;
    };
    const updatebooks = async (req: Request, res: Response, next: NextFunction) => {
            
            let query =
                "UPDATE publishers SET salary=salary+1000 WHERE salary > 7000";
            // Executing Query
            datalog.query(query, (err, rows) => {
                if (err) throw err;
                console.log(rows);
            });
    };
    const deletebooks = async (req: Request, res: Response, next: NextFunction) => {

            // here is our query
            let query = 'DELETE FROM users ';
            datalog.query(query, (err, _rows) => {
                if (err) throw err;
                console.log('Cleared users Table');
            });
    };
    const addbooks = async (req: Request, res: Response, next: NextFunction) => {
        console.log('Add post')
        console.log(req.body);
        let query = `INSERT INTO users (name,city,contact) VALUES (?,?,?);`;
        datalog.query(query, [req.body.name, req.body.city, req.body.contact], (err: any, rows: { insertId: string; }) => {
            if (err) throw err;
            console.log("Row inserted with id = " + rows.insertId);
            res.send({ hello: "Hello" })
        });
    };

    export default { getbook, getbooks, updatebooks, deletebooks, addbooks };