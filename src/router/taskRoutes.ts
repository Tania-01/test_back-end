import { Router } from 'express';
import {taskController} from "../controller/TaskControler";
import authMiddleware from "../midleware/authMidleware";


const router = Router();

router.post('/task', taskController.createTask)
router.get('/',taskController.getTasks)

export default router;