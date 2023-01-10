import express from 'express';
import { fileURLToPath } from "url";
import path from 'path';

import configViewEngine from './config/viewEngine';
import startFileStorage from './config/fileStorage';
import connection from './config/database';
import {
    register
} from './controllers/auth';
import { createPost } from './controllers/post';
import authRoutes from './routes/auth';
import userRoutes from './routes/user';
import postRoutes from './routes/post';
import verifyToken from './middleware/auth';

const app = express();


configViewEngine(app);
const upload = startFileStorage();

// ROUTES to file
app.get('/images/:filename', (req, res) => {
    const __filename = fileURLToPath(import.meta.url);
    let __dirname = path.dirname(__filename)
    console.log(__dirname);
    res.sendFile(`${__dirname}/public/images/${req.params.filename}`);
})

/* ROUTES WITH FILES */
app.post("/auth/register", register);
app.post("/posts", verifyToken, createPost);

// /* ROUTES */
app.use("/auth", authRoutes);
app.use("/users", userRoutes);
app.use("/posts", postRoutes);

const port = process.env.PORT;
const hostName = process.env.HOST_NAME;

(async () => {

    try {
        await connection();
        
        app.listen(port, hostName, () => {
            console.log(`Example app listening on port ${port}`);
        });
    } catch (error) {
        console.log("Error: ", error);
    }

})();
