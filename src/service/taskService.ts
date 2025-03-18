
import {taskRepository} from "../repositories/taskRepositopies";

class TaskService {

    public async createTask(title: string, description: string, status: string) {
        return taskRepository.createTask(title, description, status);
    }

    async getTasks(status?: string) {
        return taskRepository.getTasks(status);
    }
}

export const taskService = new TaskService();
