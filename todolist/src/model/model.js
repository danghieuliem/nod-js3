const { constants } = require("buffer");
const fs = require("fs");
const path = require("path");
const DataDir = path.resolve(__dirname, "../../Data");


const createModel = (modelName) => {

    const DataFile = path.resolve(DataDir, modelName) + ".json";

    (() => {
        if (!fs.existsSync(DataDir))
            fs.mkdirSync(DataDir);

        if (!fs.existsSync(DataFile))
            fs.writeFileSync(DataFile, "");
    })();

    const addTask = ({ title, body }) => {
        if (!validition({ title, body })) {
            return "null";
        }
        else {
            task = {
                id: Date.now().toString(),
                title: title,
                body: body,
                createAt: new Date(),
            };
            return addData(task);
        }
    }

    const getAll = () => {
        try {
            const data = JSON.parse(fs.readFileSync(DataFile));
            return data;
        } catch (e) {
            console.log(e);
            return [];
        }
    }

    const addData = (task) => {
        if (!fs.existsSync(DataDir))
            fs.mkdirSync(DataDir, { recursive: true });
        try {
            var data = getAll();
            console.log(data);
            console.log(task);

            if (!data)
                data = task;
            else
                data = [...data, task];

            fs.writeFileSync(DataFile, JSON.stringify(data));
            return data;
        } catch (e) {
            console.log(e);
            return null;
        }
    }

    const validition = ({ title, body }) => {
        if (title === "" || body === "")
            return false;
        return true;
    }

    const getById = (id) => {
        const data = getAll();
        console.log(data);
        const task = data.find((item) => item.id === id);
        if (!task)
            return null;
        else
            return task;
    }

    return { addTask, getAll, getById };
}

module.exports = createModel;
