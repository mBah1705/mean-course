import jwt from 'jsonwebtoken';

export const checkAuth = (req, res, next) => {
    const token = req.headers['x-authentication-token'];

    if (!token) {
        throw new Error('Authentication failed!');
    }
    const decodedToken = jwt.verify(token, 'secret_this_should_be_longer');
    req.userData = { email: decodedToken.email, userId: decodedToken.userId };
    next();
}