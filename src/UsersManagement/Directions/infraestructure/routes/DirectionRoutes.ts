import { Router } from 'express';
import { directionController } from './Dependencies/DirectionDependencies';

const router = Router();

router.post('/api/v2/directions', (req, res) => directionController.createDirection(req, res));
router.get('/api/v2/directions/:id', (req, res) => directionController.getDirectionById(req, res));
router.get('/api/v2/directions', (req, res) => directionController.getAllDirections(req, res));
router.delete('/api/v2/directions/:id', (req, res) => directionController.deleteDirectionById(req, res));
router.put('/api/v2/directions/:id', (req, res) => directionController.updateDirection(req, res));

export default router;