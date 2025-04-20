import express from 'express';

import { checkAuth } from '../middlewares/check-auth.js';
import extractFile from '../middlewares/file.js';

import { createPostControllerFn, getPostsControllerFn, getPostControllerFn, deletePostControllerFn, updatePostControllerFn } from '../controllers/posts.js';

const router = express.Router();

router.post('', checkAuth, extractFile, createPostControllerFn);

router.get('', getPostsControllerFn);

router.get('/:id', getPostControllerFn);

router.delete('/:id', checkAuth, deletePostControllerFn);

router.put('/:id', checkAuth, extractFile, updatePostControllerFn);

export default router;