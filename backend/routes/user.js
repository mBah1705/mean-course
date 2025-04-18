import express from 'express';
import bcrypt from 'bcrypt';

import User from '../models/user.js';


const router = express.Router();

router.post('/signup', (req, res, next) => {
    bcrypt.hash(req.body.password, 10, (err, hash) => {
        if (err) {
            return res.status(500).json({
                error: err
            });
        }
        const user = new User({
            email: req.body.email,
            password: hash
        });

        user.save()
            .then(result => {
                res.status(201).json({
                    message: 'User created',
                    result: result
                });
            })
            .catch(err => {
                res.status(500).json({
                    error: err
            });
        });
    })

});
 

export default router;