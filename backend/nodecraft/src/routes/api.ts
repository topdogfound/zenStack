import { Router } from 'express';
import { getUsers, healthCheck } from '../app/controllers/userController';

const router = Router();

router.get('/health', healthCheck);
router.get('/users', getUsers);

export default router;
