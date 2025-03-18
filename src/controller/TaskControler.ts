import { Request, Response } from 'express';
import {taskService} from "../service/taskService";

class TaskController {

 public async createTask(req: Request, res: Response): Promise<void> {
  const { title, description, status } = req.body;
  try {
   if (!title || !description || !status) {
    res.status(400).json({ message: 'Missing required fields: title, description, or status' });
    return;
   }

   const task = await taskService.createTask(title, description, status);
   res.status(201).json(task);
  } catch (error) {
   res.status(500).json({ message: 'Error creating task', error });
  }
 }

 public async getTasks(req: Request, res: Response): Promise<void> {
  try {
   const tasks = await taskService.getTasks();
   res.status(200).json(tasks);
  } catch (error) {
   res.status(500).json({ message: 'Error fetching tasks', error });
  }
 }

}

export const taskController = new TaskController();
