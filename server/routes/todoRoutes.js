import express from "express";

import Todo from '../models/Todo.js'

const router = express.Router();

router.get('/',async (req,res)=> {
    const todos = await Todo.find();
    res.json(todos);
});

router.post('/',async (req,res)=> {
    const {text} = req.body;
    const newTodo = new Todo({text});
    const savedTodo = await newTodo.save();
    res.status(201).json(savedTodo);

});

router.delete('/:id',async (req,res)=> {
    const deleted = await Todo.findByIdAndDelete(req.params.id);
    res.json(deleted);
});


export default router;