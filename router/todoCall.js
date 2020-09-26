const path = require('path');
const express = require('express');

const router = express.Router();

const todos = require('../controller/todoController');

router.get('/', todos.getTodo);

router.post('/addtask', todos.postTodo);

router.post('/CompleteTask', todos.postCompleteTodo);

router.get('/UpdateTask/:todoID', todos.getUpdateTodo);

router.post('/updateTask', todos.postUpdateTodo);

router.post('/DelTask', todos.postDelTodo);

module.exports = router;