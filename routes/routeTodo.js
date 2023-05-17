const express = require('express');
const router = express.Router();
const todo = require('../controllers/controllerTodo');


router.get('/', async (req, res)=>{
    try {
        //const search = (req.query.q);
        idUtente = req.session.user.id
        const result = await(todo.getTodo(idUtente));
        console.log(result);
        res.render('todos', {
            todos : result,
            user : req.session.user
        });
    } catch (e) {
        res.status(500).send(e.toString());
    }
});

router.get('/:todo_id([0-9]+)/visualizza', async (req, res)=>{
    try {
        const todoid = req.params.todo_id;
        const todoObj = await(todo.getTodobyId(todoid));
        res.render('todo/visualizza', {
            ...todoObj,
            user : req.session.user,
            errors: req.flash('errors'),
            message: req.flash('message')
        });
    } catch (e) {
        res.status(500).send(e.toString());
    }
});

router.get('/:todo_id([0-9]+)/edit', async (req, res)=>{
    try {
        const todoid = req.params.todo_id;
        const todoObj = await(todo.getTodobyId(todoid));
        res.render('todo/edit', {
            ...todoObj,
            user : req.session.user,
            errors: req.flash('errors'),
            message: req.flash('message')
        });
    } catch (e) {
        res.status(500).send(e.toString());
    }
});

router.get('/newtodo', async (req, res)=>{
    try {
        res.render('todo/newtodo', {
            user : req.session.user,
        });
    } catch (e) {
        res.status(500).send(e.toString());
    }
});

router.patch('/:todo_id([0-9]+)', async (req, res)=>{
    if(!req.body.nometodo){
       // req.flash('errors','Inserimento obbligatorio');
       // res.redirect('/todo/' + req.params.todo_id + '/edit');
    }else{
        try {
            const todoName = req.body.nometodo;
            const todoDescr = req.body.descrizionetodo;
            const todoCompleta = req.body.completatodo;
            const result = await todo.updateTodo(req.params.todo_id, todoName, todoDescr, +todoCompleta);
            res.status(result? 200: 404).json(result);
        } catch (e) {
            req.flash('errors', e.toString());
            res.redirect('/todo/' + req.params.todo_id + '/edit');
            res.status(500).send({message:e.toString()});
        }
    }
    
});

router.delete('/:todo_id([0-9]+)', async (req, res)=>{
    try {
        const deleted = await todo.deleteTodo(req.params.todo_id);
        res.redirect('/todo');
        //res.status(deleted? 200: 404).json(deleted? deleted:null);
    } catch (e) {
        res.status(500).send(e.toString());
    }
});

router.post('/', async (req, res)=>{
    if(!req.body.nometodo){
        //req.flash('errors','Inserimento obbligatorio');
        //res.redirect('/todo');
    }else{
        try {
            const idUtente = req.session.user.id
            const todoName = req.body.nometodo;
            const todoDescr = req.body.descrizionetodo;
            const result = await todo.addTodo(idUtente,todoName,todoDescr);
            res.status(result? 200: 404).json(result);
            //res.status(deleted? 200: 404).json(deleted? deleted:null);
        } catch (e) {
            //req.flash('errors', e.toString());
            //res.redirect('/todo/' + req.params.todo_id + '/edit');
            res.status(500).send({message:e.toString()});
        }
    }

});

module.exports = router;