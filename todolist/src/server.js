const express = require("express");
const Task = require("./service/task-service");
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
    return res.status(400).json({ message: "id is requestted"});
    const task = Task.getTaskById(req.params.id);
    res.json(task);
});

app.get("/tasks",(req,res)=>{ //req = request, res = respon
    const data = Task.getAll("task");
    res.json(data);
});

app.post("/tasks", (req, res) => {
    const { title, body } = req.body;
    const createdTask = Task.addTask({ title, body });
    res.json(createdTask);
});

app.patch("/tasks", (req,res)=>{
    const {id, title, body, completed, completedAt} = req.query;
    if(!id) return res.status(400).json({ message: "id is requestted"});
    if(!title && !body && !completed && !completedAt) 
        return res.status(420).json({ message: "not thing to update"});
    res.json(Task.upDate({id, title, body, completed, completedAt}));   
});
app.listen(port,()=>{
    console.log("http://localhost:"+port);
});