import express from 'express';
import { createUserControllerFn, userLoginControllerFn } from '../controllers/user.js';

const router = express.Router();

router.post('/signup', createUserControllerFn);
 
router.post('/login', userLoginControllerFn);

export default router;