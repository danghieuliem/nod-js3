const model = require("../model/model")("task");

const getAll = () => {
    return model.getAll();
}

const addTask = ({ title, body }) => {
    return model.addTask({ title, body });
}

const getTaskById = (id) => {
    return model.getById(id);
}

module.exports = {
    getAll,
    addTask,
    getTaskById
}