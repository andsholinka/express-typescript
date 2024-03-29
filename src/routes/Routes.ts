import express from 'express';

import RoleController from '../controllers/RoleController';

const router = express.Router();

router.get('/', RoleController.getRoles);
router.post('/', RoleController.createRoles);
router.put('/:id', RoleController.updateRole);
router.delete('/:id', RoleController.deleteRole);

export default router;