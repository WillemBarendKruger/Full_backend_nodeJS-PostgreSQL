import express from "express";
import  prisma  from "../prismaClient.js";

const router = express.Router();

// Get all todos from logged-in user
router.get("/", async (req, res) => {
    const todos = await prisma.todo.findMany({
        where:{
            userId: req.userId
        }
    })
    res.json(todos);
});

//Create a new todos
router.post("/", async (req, res) => {
    const {task} = req.body;
    const todo = await prisma.todo.create({
        data:{
            task,
            userId: req.userId
        }
    })

    res.json(todo)
});

// Update a todo
router.put("/:id", async (req, res) => {
    const {completed} = req.body;
    const {id} = req.params;

    const updatedTodo = await prisma.todo.update({
        where:{
            id: parseInt(id),
            userId: req.userId
        },
        data:{
            completed: !!completed //the double ! converts it to a boolean
        }
    })

    res.json(updatedTodo)
});


// Delete a todo
router.delete("/:id", async (req, res) => {
    const {id} = req.params;
    const userId = req.userId;
    const deleteTodo = await prisma.todo.delete({
        where:{
            id: parseInt(id),
            userId
        }
    })

    res.send(deleteTodo)
});

export default router