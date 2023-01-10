
import express from 'express'
import path from 'path'
import dotenv from 'dotenv'
import helmet from 'helmet'
import morgan from 'morgan'
import bodyParser from 'body-parser'
import cors from 'cors'
import fileUpload from 'express-fileupload'

const configViewEngine = (app) => {

    dotenv.config();
    
    app.use(express.static(path.join('./src', 'public')));
    app.use(bodyParser.raw({ type: 'image/jpeg' }));
    app.use(fileUpload());

    //parse req to JSON (config req.body)
    app.use(express.json());
    app.use(express.urlencoded({ extended: true }));

    //security
    app.use(helmet());
    app.use(helmet.crossOriginResourcePolicy({ policy: "cross-origin" }));
    app.use(cors())

    //record Http reques and response
    app.use(morgan("common"));

    //limit json req
    app.use(bodyParser.json({ limit: "30mb", extended: true }));
    app.use(bodyParser.urlencoded({ limit: "30mb", extended: true }));

}

export default configViewEngine;