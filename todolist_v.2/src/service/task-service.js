const Task = require("../models/taskModel");

// const model = require("../model/model")("task");


const addTask = ({ title, body }, Callback) => {
    return Task
        .create({ title, body })
        .exec(Callback);
}

const getAll = (Callback) => {
    return Task
        .find({})
        .exec(Callback);
}

const getTaskById = (id, Callback) => {
    return Task
        .findById(id)
        .exec(Callback);
}

const upDate = (task, Callback) => {
    if (!task.completed)
        task.completedAt = null;
    else
        task.completedAt = new Date();

    return Task
        .findByIdAndUpdate(task.id, task)
        .exec(Callback);
}

const deleteTaskById = (id, Callback) => {
    return Task
        .findByIdAndDelete(id)
        .exec(Callback);
}

module.exports = {
    addTask,
    getAll,
    getTaskById,
    upDate,
    deleteTaskById
}