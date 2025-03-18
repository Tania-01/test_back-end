import Task from "../models/taskmodel";


class TaskRepository {

    public async createTask(title: string, description: string, status: string) {
        return Task.create({ title, description, status });
    }


    public async getTasks() {
        return Task.findAll();
    }
}

export const taskRepository = new TaskRepository();
