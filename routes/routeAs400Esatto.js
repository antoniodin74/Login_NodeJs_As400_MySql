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
        const result = await(as400.getPrimaa());
        //console.log(result);
        res.render('as400/primaa', {
            bolla : result,
            user : req.session.user,
        });
    } catch (e) {
        res.status(500).send(e.toString());
    }
});

router.get('/primaab/:annoR([0-4]+):numeroR([0-9]+)', async (req, res)=>{
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

router.get('/primaa/:tipo([A-Z]+):numeroR([000000-Z]+)', async (req, res)=>{
    let tipoB = req.params.tipo;
    tipoB === "T" ? tipoB="" : tipoB;
    let numeroR = req.params.numeroR;
    try {
        const result = await(as400.getPrimaa1(tipoB, numeroR));
        res.render('as400/primaa', {
            bolla : result,
            user : req.session.user,
        });
    } catch (e) {
        res.status(500).send(e.toString());
    }
});

module.exports = router;