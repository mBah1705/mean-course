import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

import User from '../models/user.js';

export const createUserControllerFn = (req, res, next) => {
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
}

export const userLoginControllerFn = (req, res, next) => {
    User.findOne({ email: req.body.email })
        .then(user => {
            if (!user) {
                return res.status(401).json({
                    message: 'Auth failed'
                });
            }

            bcrypt.compare(req.body.password, user.password, (err, result) => {
                if (err) {
                    return res.status(401).json({
                        message: 'Auth failed'
                    });
                }
                if (result) {
                    const token = jwt.sign(
                        { email: user.email, userId: user._id },
                        process.env.JWT_KEY,
                        { expiresIn: '1h' }
                    );

                    return res.status(200).json({
                        message: 'Auth successful',
                        token: token,
                        expiresIn: 3600,
                        userId: user._id
                    });
                }
                res.status(401).json({
                    message: 'Auth failed'
                });
            });
        })
        .catch(err => {
            console.log(err);
            res.status(500).json({
                error: err
            });
        });

}