import express from 'express';

import RoleController from '../controllers/RoleController';

const router = express.Router();

router.get('/roles', RoleController.getRoles);
router.post('/roles', RoleController.createRoles);

export default router;