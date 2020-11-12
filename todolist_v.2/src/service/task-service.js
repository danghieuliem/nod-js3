const Task = require("../models/taskModel");

// const model = require("../model/model")("task");

const addTask = ({ title, body },) => {
    return Task.create({ title, body });
}

const getAll = () => {
    return Task
        .find({})
        .exec();
}

const getTaskById = (id) => {
    return Task
        .findById(id)
        .exec();
}

const upDate = (task) => {
    
    if (!task.completed)
        task.completedAt = null;
    else
        task.completedAt = new Date();

    return Task
        .findByIdAndUpdate(task.id, task)
        .exec();
}

const deleteTaskById = (id) => {
    return Task
        .findByIdAndDelete(id)
        .exec();
}

module.exports = {
    addTask,
    getAll,
    getTaskById,
    upDate,
    deleteTaskById
}