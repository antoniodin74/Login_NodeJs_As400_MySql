const pool = require('../db');
const bc = require('bcrypt');

async function addUser({name, email, password}){
    /* const newUser = {utente, nome, tipo, attivato};
    data.utenti.unshift(newUser);
    return newUser; */
    const pwd = bc.hashSync(password, 12);
    const created_at = new Date();
    const liveluser = 2;
    const [result,] = await pool.query('INSERT INTO utenti (nome,email,password,livello,created_at) values (?,?,?,?,?)',[name,email,pwd,liveluser, created_at]);
    //const recordIns = await(getUserbyId(result.insertId))
    //return recordIns;
    return {id: result.insertId, name, email, liveluser};
};

async function login({email, password}){
    const psw = bc.hashSync(password, 12);
    const [result,] =  await pool.query('SELECT * FROM utenti where email=?', [email]);
    if(!result[0]){
        throw new Error ('utente non trovato');
    } else if(!bc.compareSync(password,result[0].password)) {
        throw new Error ('password errata!!!');
    }
    return result[0];
}

async function changepwd({email, passwordOld, passwordNew}){
    const psw = bc.hashSync(passwordOld, 12);
    const [result,] =  await pool.query('SELECT * FROM utenti where email=?', [email]);
    if(!result[0]){
        throw new Error ('utente non trovato');
    } else if(!bc.compareSync(passwordOld,result[0].password)) {
        throw new Error ('password errata!');
    } else if(passwordOld===passwordNew) {
        throw new Error ('le password devono essere diverse!');
    } else {
        const idUtente = result[0].id;
        const pswNew = bc.hashSync(passwordNew, 12);
        await updatePwd(idUtente, pswNew);
    }
    return {nome: result[0].nome, email: result[0].email, id: result[0].id, livello: result[0].livello};
}

async function updatePwd(id, passwordNew) {
    const updated_at = new Date();
    const [result1,] = await pool.query('UPDATE utenti SET password=?,updated_at=? where id=?', [passwordNew, updated_at, +id]);
    return result1[0];
}

module.exports = {
    addUser,
    login,
    changepwd
};