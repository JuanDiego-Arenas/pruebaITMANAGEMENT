import { Router } from 'express';
import * as task from '../controllers/task.controller.js';

const router = Router();

// Rutas
router.get('/tasks', task.getTasks);
router.get('/tasks/:taskId', task.getTaskById);
router.post('/tasks', task.createTask);
router.put('/tasks/:taskId', task.updateTask);
router.delete('/tasks/:taskId', task.deleteTask);

export default router;
