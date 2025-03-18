import { Request, Response } from 'express';
import {taskService} from "../service/taskService";
import Task from "../models/taskmodel";

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
 public async updateTask(req: Request, res: Response): Promise<void> {
  const { id } = req.params;
  const { title, description, status } = req.body;

  try {
   console.log('Request Body:', req.body);

   if (!title && !description && !status) {
    res.status(400).json({ message: 'No fields to update provided' });
    return;
   }

   // Шукаємо таску за id
   const existingTask = await Task.findByPk(id);
   if (!existingTask) {
    res.status(404).json({ message: `Task with ID ${id} not found` });
    return;
   }

   console.log('Existing Task:', existingTask);


   // if (title) existingTask.title = title;
   // if (description) existingTask.description = description;
   // if (status !== undefined) existingTask.status = status;


   await existingTask.save();


   console.log('Updated Task:', existingTask);

   res.status(200).json(existingTask);
  } catch (error) {
   res.status(500).json({message: 'Error updating task', error});
  }}
 public async deleteTask(req: Request, res: Response): Promise<void> {
  const { id } = req.params;

  try {
   const existingTask = await Task.findByPk(id);
   if (!existingTask) {
    res.status(404).json({ message: `Task with ID ${id} not found` });
    return;
   }

   await existingTask.destroy();

   res.status(200).json({ message: `Task with ID ${id} deleted successfully` });
  } catch (error) {
   res.status(500).json({ message: 'Error deleting task', error });
  }
 }

}

export const taskController = new TaskController();
