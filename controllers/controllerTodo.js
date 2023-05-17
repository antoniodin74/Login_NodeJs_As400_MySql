const data = require('../data.json');
const pool = require('../db');

async function getTodo(idUtente) {
    //return data.tipi;
    //const [result,] = await pool.query('SELECT * FROM tipi');
    const [result,] = await pool.query('SELECT * FROM todo WHERE idutente=? ' , [idUtente]) ;
    //console.log(result);
    return result;
    }

    async function getTodobyId( id) {
        //return data.tipi.find((tipo) => tipo.id === +id)
        const [result,] = await pool.query('SELECT * FROM todo where id=?', [id]);
        return result[0];
    }

    async function updateTodo(id, todoName, todoDescr, todoCompleta) {
        //const idx = data.tipi.findIndex(tipo => tipo.id == id);
        //const oldTipo = getTipobyId(id);
        /* if(idx !== -1){
            data.tipi[idx] = {...data.tipi[idx], tipo};
            return data.tipi[idx];
        } */
        const updated_at = new Date();
        const [result,] = await pool.query('UPDATE todo SET nometodo=?,descrizionetodo=?,completato=?,updated_at=? where id=?', [todoName,todoDescr,todoCompleta, updated_at, +id]);
        return {id, todoName, todoDescr, todoCompleta, updated_at};
    }

    async function deleteTodo( id) {
        const [result,] = await pool.query('DELETE FROM todo where id=?', [id]);
        return result;
    }

    async function addTodo(idUtente,todoName, todoDescr){
        const created_at = new Date();
        const [result,] = await pool.query('INSERT INTO todo (nometodo,descrizionetodo,idutente,created_at) values (?,?,?,?)',[todoName,todoDescr,idUtente,created_at]);
    
        return {id: result.insertId, todoName, created_at};
    }


module.exports = {
    getTodo,
    getTodobyId,
    updateTodo,
    deleteTodo,
    addTodo
};