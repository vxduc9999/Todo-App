const Todo = require('../models/todosModel');
const Todos = require('../models/todosModel');

exports.getTodo = (req, res, next) => {
    Todos.fetchAllTask(todos => {
        res.render('index', {
            tasks: todos
        })
    })
}

exports.postTodo = (req, res, next) => {
    const task = req.body.newtask;
    const todos = new Todos(null, task, false);
    todos.saveTask();
    res.redirect('/');
}

exports.postCompleteTodo = (req, res, next) => {
    const id = req.body.TaskIdCom;
    Todos.CompleteById(id);
    res.redirect('/');
}

// update
exports.getUpdateTodo = (req, res, next) => {
    const editMode = req.query.edit;
    if (!editMode) {
        return res.redirect('/');
    }
    const todoId = req.params.todoID;
    Todos.findById(todoId, todos => {
        res.render('UpdateTask', {
            path: '/UpdateTask',
            todo: todos
        })
    })
}

exports.postUpdateTodo = (req, res, next) => {
    const id = req.body.todoId;
    const task = req.body.updateTask;
    Todos.Update(id, task);
    res.redirect('/');
}

exports.postDelTodo = (req, res, next) => {
    const id = req.body.TaskId;
    Todos.deleteById(id);
    res.redirect('/');
}