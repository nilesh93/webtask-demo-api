var mongoose = require('mongoose');
const Todo = require('../models/Todo');
module.exports = (app) => {
    app.get('/todos', (req, res) => {
        req.TodoModel.find({}).sort({ 'created_at': -1 }).exec((err, todos) => res.json(todos))
    });
    app.post('/todos', (req, res) => {
        const newTodo = new req.TodoModel(Object.assign({}, req.body, { created_at: Date.now() }));
        newTodo.save((err, savedTodo) => {
            res.json(savedTodo)
        });
    });
    app.put('/todos', (req, res) => {
        const idParam = req.webtaskContext.query.id;
        req.TodoModel.findOne({ _id: idParam }, (err, todoToUpdate) => {
            const updatedTodo = Object.assign(todoToUpdate, req.body);
            updatedTodo.save((err, todo) => res.json(todo))
        });
    });
    app.delete('/todos', (req, res) => {
        const idParam = req.webtaskContext.query.id;
        req.TodoModel.remove({ _id: idParam }, (err, removedTodo) => res.json(removedTodo));
    });
};