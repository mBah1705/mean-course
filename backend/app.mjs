import express from 'express';
import bodyParser from 'body-parser';
import mongoose from 'mongoose';
import path from 'path';

import postsRoutes from './routes/posts.js';
import userRoutes from './routes/user.js';

const app = express();
const mongoDB = 'mongodb+srv://moon:DJ4dsBfs6kyThxL@cluster0.2ccb2lc.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0';
mongoose.connect(mongoDB)
    .then(() => {
        console.log('Connected to database!');
    })
    .catch(() => {
        console.log('Connection failed!');
    });


app.use(bodyParser.json({ limit: '20mb'}));
app.use(bodyParser.urlencoded({ extended: false }));

app.use('/images', express.static(path.join('backend/images')));

app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader(
        'Access-Control-Allow-Headers',
        'Origin, X-Requested-With, Content-Type, Accept, X-Authentication-Token'
    );
    res.setHeader(
        'Access-Control-Allow-Methods',
        'GET, POST, PATCH, PUT, DELETE, OPTIONS'
    ); 
    next();
});

app.use('/api/posts', postsRoutes);
app.use('/api/user', userRoutes);

export default app;