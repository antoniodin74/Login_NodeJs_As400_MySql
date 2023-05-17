const data = require('../data.json');
const pool = require('../db');

async function getMenu(idutente) {
    //return data.tipi;
    //const [result,] = await pool.query('SELECT * FROM tipi');
    const [result,] = await pool.query('SELECT menu.id ,menu.nomemenu, menu.descrizionemenu FROM menu  LEFT JOIN utentimenu ON menu.id = utentimenu.idmenu WHERE utentimenu.idutente=? ' , [idutente]) ;
    return result;
    }



module.exports = {
    getMenu
};