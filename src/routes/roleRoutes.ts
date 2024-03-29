import express from 'express';

import RoleController from '../controllers/RoleController';
import Auth from '../middleware/auth';

const router = express.Router();

router.get('/', Auth, RoleController.getRoles);
router.post('/', RoleController.createRoles);
router.put('/:id', RoleController.updateRole);
router.delete('/:id', RoleController.deleteRole);
router.get('/:id', RoleController.getRoleById);

export default router;