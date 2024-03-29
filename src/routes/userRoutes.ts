import express from 'express';

import UserController from '../controllers/UserController';
import RegisterValidation from '../middleware/validation/userValidation';

const router = express.Router();

router.post('/signup', RegisterValidation, UserController.Register);

export default router;