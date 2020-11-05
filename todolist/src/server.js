const express = require("express");
const service = require("./service/task-service");
const app = express();
const port = process.env.port || 3000;

app.use(express.json());

app.get("/",(req,res)=>{
    res.json({
        title : "1111",
        body : "aaa"
    });
});

app.get("/tasks/:id",(req,res)=>{
    const task = service.getTaskById(req.params.id);
    res.json(task);
});

app.get("/tasks",(req,res)=>{ //req = request, res = respon
    const data = service.getAll("task");
    res.json(data);
});

app.post("/tasks", (req, res) => {
    const { title, body } = req.body;
    const createdTask = service.addTask({ title, body });
    res.json(createdTask);
});

app.listen(port,()=>{
    console.log("http://localhost:"+port);
});