import { Router } from 'express';
import { usersController } from './Dependencies/UserDependencies';

const router = Router();

router.post('/api/v1/users', (req, res) => usersController.registerUser(req, res));
router.post('/api/v1/userslogin', (req, res) => usersController.loginUser(req, res));
router.delete('/api/v1/users/:email', (req, res) => usersController.deleteUser(req, res));
router.get('/api/v1/users/:id', (req, res) => usersController.getUserById(req, res));
router.get('/api/v1/users', (req,res) => usersController.getAllUsers(req, res));

export default router;