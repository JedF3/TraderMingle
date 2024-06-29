import express from 'express';
import { loginUser, signupUser, updateUser } from '../controllers/user.controller.js';

const router = express.Router();

// login route
router.post('/login', loginUser);

// signup route
router.post('/signup', signupUser);

// update user route
router.patch('/:id', updateUser);

export default router;
