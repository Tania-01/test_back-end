import Task from "../models/taskmodel";


class TaskRepository {

    public async createTask(title: string, description: string, status: string) {
        return Task.create({ title, description, status });
    }


    async getTasks(status?: string) {
        const whereClause: any = {};
        if (status) {
            whereClause.status = status;
        }

        return Task.findAll({ where: whereClause });
    }
};

export const taskRepository = new TaskRepository();
