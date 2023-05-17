const express = require('express');
const router = express.Router();
const as400 = require('../controllers/controllerAs400');




router.get('/primaa', async (req, res)=>{
    try {
        const result = await(as400.getPrimaa(req.query));
        res.json(result);
    } catch (e) {
        res.status(500).send(e.toString());
    }
});



module.exports = router;