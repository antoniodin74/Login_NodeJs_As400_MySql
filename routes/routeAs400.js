const express = require('express');
const router = express.Router();
const as400 = require('../controllers/controllerAs400');


router.get('/', async (req, res)=>{
    try {
        //const search = (req.query.q);
        idUtente = req.session.user.id
        const result = await(as400.getAs400(idUtente));
        res.render('as400', {
            as400 : result,
            user : req.session.user
        });
    } catch (e) {
        res.status(500).send(e.toString());
    }
});

router.get('/primaa', async (req, res)=>{
    try {
        const result = await(as400.getPrimaa(req.query));
        /*result.forEach(function(elem, index) {
            console.log(elem.LAARE0 + ' ' + elem.LANRE0 + ' ' + index);
        });
        console.log(result.length);*/
        res.render('as400/primaa', {
            bolla : result,
            user : req.session.user,
        });
    } catch (e) {
        res.status(500).send(e.toString());
    }
});

router.get('/primaab/:annoR/:numeroR', async (req, res)=>{
    try {
        const result = await(as400.getPrimaab(req.params.annoR, req.params.numeroR));
        res.render('as400/primaab', {
            bolla : result,
            user : req.session.user,
        });
    } catch (e) {
        res.status(500).send(e.toString());
    }
});

router.get('/primaa/:tipo([A-Z]+):numeroR([0-999999]+)', async (req, res)=>{
    let tipoB = req.params.tipo;
    tipoB === "T" ? tipoB="" : tipoB;
    try {
        const result = await(as400.getPrimaa1(tipoB, req.params.numeroR));
        res.render('as400/primaa', {
            bolla : result,
            user : req.session.user,
        });
    } catch (e) {
        res.status(500).send(e.toString());
    }
});

module.exports = router;