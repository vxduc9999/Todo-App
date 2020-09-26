const path = require('path');
const fs = require('fs');
const { json } = require('body-parser');

const p = path.join(
    path.dirname(process.mainModule.filename),
    'data',
    'products.json'
);

const getProductFromFile = cb => {
    fs.readFile(p, (err, fileContent) => {
        if (err) {
            throw err;
        }
        else {
            cb(JSON.parse(fileContent));
        }
    })
};

module.exports = class Todo {
    constructor(id, task, flag) {
        this.id = id;
        this.task = task;
        this.flag = flag;
    }


    saveTask() {
        getProductFromFile(todos => {
            this.id = Math.random().toString();
            todos.push(this);
            fs.writeFile(p, JSON.stringify(todos), err => {
                console.log(err);
            })
        })
    }


    static fetchAllTask(todos) {
        getProductFromFile(todos);
    }

    static findById(id, arr) {
        getProductFromFile(todos => {
            const todo = todos.find(p => p.id === id);
            arr(todo);
        })
    }

    static CompleteById(id) {
        getProductFromFile(todos => {
            const existTodoIndex = todos.findIndex(t => t.id === id);
            const updateTodos = [...todos];
            updateTodos[existTodoIndex].flag = true;
            fs.writeFile(p, JSON.stringify(updateTodos), err => {
                console.log(err);
            })
        })
    }

    static Update(id, task) {
        getProductFromFile(todos => {
            const existTodoIndex = todos.findIndex(t => t.id === id);
            const updateTodos = [...todos];
            updateTodos[existTodoIndex].task = task;
            fs.writeFile(p, JSON.stringify(updateTodos), err => {
                console.log(err);
            })
        })
    }

    static deleteById(id) {
        getProductFromFile(todos => {
            const TodoNotDelete = todos.filter(todo => todo.id !== id)
            fs.writeFile(p, JSON.stringify(TodoNotDelete), err => {
                console.log(err);
            })
        })
    }

}

