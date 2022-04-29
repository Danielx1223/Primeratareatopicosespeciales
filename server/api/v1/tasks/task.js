const tasks = [
    {
        id: 1651106186363,
        description: 'Task example 1',
        author: 'Author example',
        createdAt: new Date(),
        updatedAt: new Date()
    }
];

const createTask = ({ description = '', author = '' }) => {
    const task = {
        id: Date.now(),
        description,
        author,
        createdAt: new Date(),
        updatedAt: new Date()
    }
    tasks.push(task);
    return task;
}

const getTaskById = (id) => {
    const index = tasks.findIndex(t => t.id == id);
    if (index >= 0) {
        return tasks[index];
    }
    return {};
}

const getAllTasks = () => {
    return tasks;
}

const updateTask = (id, { description = '', author = '' }) => {
    const index = tasks.findIndex(t => t.id == id);
    if (index >= 0) {
        const task = {
            id: tasks[index].id,
            description,
            author,
            createdAt: tasks[index].createdAt,
            updatedAt: new Date()
        }
        tasks[index] = task;
        return task;
    }
    return {}
}

const deleteTask = (id) => {
    const index = tasks.findIndex(t => t.id == id);
    if (index >= 0) {
        tasks.splice(index, 1);
    }
    return true;
}

module.exports = {
    createTask,
    getTaskById,
    getAllTasks,
    updateTask,
    deleteTask
}