import express from 'express';
import { loginUser, signupUser, updateUser, getAllUsers, getUser } from '../controllers/user.controller.js';
import requireAuth from '../middleware/requireAuth.js';

const router = express.Router();

// login route
router.post('/login', loginUser);

// signup route
router.post('/signup', signupUser);

// get a single user profile
router.get('/profile/:id', getUser);

// update profile route
router.use(requireAuth);
router.patch('/profile/:id', updateUser);

// get all users
router.get('/profile', getAllUsers);

export default router;
