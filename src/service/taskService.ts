
import {taskRepository} from "../repositories/taskRepositopies";

class TaskService {

    public async createTask(title: string, description: string, status: string) {
        return taskRepository.createTask(title, description, status);
    }

    public async getTasks() {
        return taskRepository.getTasks();
    }
}

export const taskService = new TaskService();
