import express from 'express';
import bodyParser from 'body-parser';
import mongoose from 'mongoose';

import Post from './models/post.js';

const app = express();
const mongoDB = 'mongodb+srv://moon:DJ4dsBfs6kyThxL@cluster0.2ccb2lc.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0';
mongoose.connect(mongoDB)
    .then(() => {
        console.log('Connected to database!');
    })
    .catch(() => {
        console.log('Connection failed!');
    });


app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader(
        'Access-Control-Allow-Headers',
        'Origin, X-Requested-With, Content-Type, Accept'
    );
    res.setHeader(
        'Access-Control-Allow-Methods',
        'GET, POST, PATCH, DELETE, OPTIONS'
    ); 
    next();
});

app.post('/api/posts', (req, res, next) => {
    const post = new Post({
        title: req.body.title,
        content: req.body.content
    });

    post.save()
        .then(createdPost => {
            res.status(201).json({
                message: 'Post added successfully',
                postId: createdPost._id
            });
        })
        .catch(error => {
            res.status(500).json({
                message: 'Creating a post failed!'
            });
        });
    
});

app.get('/api/posts', (req, res, next) => {
    Post.find()
        .then(documents => {
            res.status(200).json({
                message: 'Posts fetched successfully!',
                posts: documents
            });
        })
        .catch(error => {
            res.status(500).json({
                message: 'Fetching posts failed!'
            });
        });
});

app.delete('/api/posts/:id', (req, res, next) => {
    Post.deleteOne({ _id: req.params.id })
        .then(result => {
            res.status(200).json({ message: 'Post deleted!' });
        })
        .catch(error => {
            res.status(500).json({
                message: 'Deleting posts failed!'
            });
        });
});


export default app;