import express from 'express';

import UserController from '../controllers/UserController';
import RegisterValidation from '../middleware/validation/userValidation';
import Auth from '../middleware/auth';

const router = express.Router();

router.post('/signup', RegisterValidation, UserController.Register);
router.post('/login', UserController.Login);
router.get('/refresh-token', UserController.RefreshToken);
router.get('/current-user', Auth, UserController.UserDetail);

export default router;