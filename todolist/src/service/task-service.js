const model = require("../model/model")("task");

const getAll = () => {
    return model.getAllEntities();
}

const addTask = ({ title, body }) => {
    return model.addEntitie({ title, body });
}

const getTaskById = (id) => {
    return model.getEntitieById(id);
}

const upDate = (task) => {
    return model.Update(task);
}

module.exports = {
    getAll,
    addTask,
    getTaskById,
    upDate
}