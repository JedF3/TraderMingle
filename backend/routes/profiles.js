import express from 'express';

import {
  getProfiles,
  getProfile,
  createProfile,
  deleteProfile,
  updateProfile,
} from '../controllers/profile.controller.js';
import requireAuth from '../middleware/requireAuth.js';

const router = express.Router();

// require auth for all workout routes
router.use(requireAuth);

// GET all workouts
router.get('/', getProfiles);

//GET a single workout
router.get('/:id', getProfile);

// POST a new workout
router.post('/', createProfile);

// DELETE a workout
router.delete('/:id', deleteProfile);

// UPDATE a workout
router.patch('/:id', updateProfile);

export default router;
