const express = require('express');
const router = express.Router();
const menu = require('../controllers/controllerMenu');


router.get('/', async (req, res)=>{
    try {
        //const search = (req.query.q);
        idUtente = req.session.user.id
        const result = await(menu.getMenu(idUtente));
        //console.log(result);
        res.render('menu', {
            menu : result,
            idUtente,
            user : req.session.user
        });
    } catch (e) {
        res.status(500).send(e.toString());
    }
});





module.exports = router;