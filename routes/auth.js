const express = require('express');
const router = express.Router();
const auth = require('../controllers/controllerAuth');

router.get('/signup', async (req, res)=>{
        res.render('login', {
            signup : true
        });
});

router.get('/changepwd', async (req, res)=>{
        res.render('login/changepwd', {
           // signup : true
        });
});

router.post('/register', async (req, res)=>{
    try{
            const {id,name,email,livello} = await auth.addUser(req.body);
            const User = {id,name,email,livello};
            req.session.user = User;
            res.status(id? 200: 404).json(id? User : null);
    } catch (e) {
            res.status(500).send({message:e.toString()});
    }
})

router.get('/login', async (req, res)=>{
        res.render('login', {
            signup : false
        });
});

router.post('/loginAs', async (req, res)=>{
        try{
                const User = req.body.user;
                req.session.user = User;
                res.status(User? 200: 404).json(User? User : null);
        } catch (e) {
                res.status(500).send({message: e.message});
                //res.status(500).send({message:e.toString()});
        }
});
router.post('/login', async (req, res)=>{
        try{
                const {nome,email,id,livello} = await auth.login(req.body);
                const User = {nome,email,id,livello};
                req.session.user = User;
                res.status(id? 200: 404).json(id? User : null);
        } catch (e) {
                res.status(500).send({message: e.message});
                //res.status(500).send({message:e.toString()});
        }
});

router.post('/changepwd', async (req, res)=>{
        try{
                const {nome,email,id,livello} = await auth.changepwd(req.body);
                const User = {nome,email,id,livello};
                req.session.user = User;
                res.status(id? 200: 404).json(id? User : null);
        } catch (e) {
                res.status(500).send({message:e.message});
        }
});


router.get('/logout', async (req, res)=>{
        req.session.destroy((e) =>{
         res.redirect('/auth/login');
        });
         
 });



module.exports = router;