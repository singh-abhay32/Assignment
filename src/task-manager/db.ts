import mysql = require('mysql')
import express, { application, request } from 'express';
import bodyParser from "body-parser";
import { ErrorCallback, Identifier, ResolvedModule, UserPreferences } from 'typescript';

 var app = express()
 app.use(bodyParser.json());

 export const datalog= mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'abhaydb',
    port : 3306
       
});

    
 





