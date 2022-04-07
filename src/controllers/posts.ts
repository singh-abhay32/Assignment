import { Request, Response, NextFunction, query } from 'express';
import axios, { AxiosResponse } from 'axios';
import { datalog } from '../task-manager/db';

interface Post {
    userName: Number;
    id: Number;
    title: String;
    body: String;
}

const getPost = async (req: Request, res: Response, next: NextFunction) => {

};

const getPosts = async (req: Request, res: Response, next: NextFunction) => {

    let query = 'SELECT name FROM users';
    datalog.query(query, (err, rows) => {
        if (err) throw err;
        console.log(rows);
        res.send({ rows })
    });;
};

const updatePost = async (req: Request, res: Response, next: NextFunction) => {

    datalog.connect((err) => {
        if (err) {
            console.log("Database Connection Failed !!!", err);
            return;
        }

        console.log("We are connected to users database");

        // Generating Query
        let query =
            "UPDATE publishers SET salary=salary+1000 WHERE salary > 7000";

        // Executing Query
        datalog.query(query, (err, rows) => {
            if (err) throw err;

            console.log(rows);
        });

    };
};
    const deletePost = async (req: Request, res: Response, next: NextFunction) => {

        datalog.connect((err) => {
            if (err) {
                console.log("Database Connection Failed !!!", err);
                return;
            }

            console.log("We are connected to users database");

            // here is our query
            let query = 'DELETE FROM users';

            datalog.query(query, (err, _rows) => {
                if (err) throw err;

                console.log('Cleared users Table');
            });
        });

    };

        const addPost = async (req: Request, res: Response, next: NextFunction) => {
            console.log('Add post')
            console.log(req.body);

            let query = `INSERT INTO users (name) VALUES (?);`;

            datalog.query(query, [req.body.name], (err: any, rows: { insertId: string; }) => {
                if (err) throw err;
                console.log("Row inserted with id = " + rows.insertId);
                res.send({ hello: "Hello" })
            });


        };

        export default { getPosts, getPost, updatePost, deletePost, addPost };