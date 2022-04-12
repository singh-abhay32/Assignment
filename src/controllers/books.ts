import { Request, Response, NextFunction, query } from 'express';
import axios, { AxiosResponse } from 'axios';
import { datalog } from '../task-manager/db';

interface Post {
    userName: Number;
    id: Number;
    title: String;
    body: String;
}
const getBook = async (req: Request, res: Response) => {
    let query = `SELECT * FROM books WHERE id = ${(datalog.escape(req.params.id))}`;
    datalog.query(query, (err, rows) => {
        if (err) throw err;
        res.send({ rows })
    })
};
    const getAllBooks = async (req: Request, res: Response) => {
        let query = 'SELECT * FROM books';
        datalog.query(query, (err, rows) => {
            if (err) throw err;
            res.send({ rows })
        });;
    };
    const updateBook = async (req: Request, res: Response, next: NextFunction) => {
            
            let query = `UPDATE books SET bookName = ${datalog.escape(req.body.bookName)} WHERE id = ${(datalog.escape(req.params.id))}`;
            // Executing Query
            datalog.query(query, (err, rows) => {
                if (err) throw err;
            });
            res.send({message: "Data updated"})
    };
    const deleteBook = async (req: Request, res: Response, next: NextFunction) => {
            let query = `DELETE FROM books WHERE id = ${(datalog.escape(req.params.id))}`;
            datalog.query(query, (err, rows) => {
                if (err) throw err;
                res.send({message: "Deleted Successfully"})
            });
    };

    const addBook = async (req: Request, res: Response, next: NextFunction) => {
        let query = `INSERT INTO books (bookName,author,description) VALUES (${datalog.escape(req.body.bookName)},${datalog.escape(req.body.author)},${datalog.escape(req.body.description)})`;
        datalog.query(query, (err: any, rows) => {
            if (err) throw err;
            res.send({message: "Data added successfully"})
        });
    };

    export default { getAllBooks, getBook, addBook, updateBook, deleteBook };