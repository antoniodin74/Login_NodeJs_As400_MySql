const data = require('../data.json');
const pool = require('../db');
const odbc = require('odbc');

async function getAs400(idUtente) {
    //return data.tipi;
    //const [result,] = await pool.query('SELECT * FROM tipi');
    const [result,] = await pool.query('SELECT as400.id ,as400.tipo, as400.nomeam, as400.descrizioneam FROM utentiazionimenuas400  LEFT JOIN as400 ON utentiazionimenuas400.idmenu = as400.id WHERE utentiazionimenuas400.idutente=? ' , [idUtente]) ;
    return result;
    }

async function getPrimaa(pars){
    //console.log(pars);
    //pars.tipo===undefined?pars.tipo='S':pars.tipo;
    //pars.tipo===''?pars.tipo='S':pars.tipo;
    const cn1 = "DSN=nodejs;UID=dinoceraa;PWD=antodino";
    const connection = await odbc.connect(cn1);
    const dtday = new Date();
    const dtday1 = new Date();
    dtday1.setDate(dtday.getDate() - 1);
    const dtfin = giraData(dtday);
    const dtini = giraData(dtday1);
    if (pars.tipo===undefined || pars.tipo==='') {
        var where = ' WHERE LADRB0 BETWEEN ? AND ? '
        var param = [
            dtini, 
            dtfin];
    } else {
        console.log('else');
        var where = ' WHERE LATBO0 = ? AND LADRB0 BETWEEN ? AND ? '
        var param = [
        pars.tipo,
        dtini, 
        dtfin];
    }
    
    //const totaleRighe = await connection.query('SELECT COUNT(lanre0) as TRIG FROM L0__STDAT.LABOLF0 WHERE LADRB0 BETWEEN ? AND ?' , ['2022-08-31','2022-09-10']);
    //const OTR = totaleRighe[0];
    const data = await connection.query('SELECT LAARE0, LANRE0, LADER0, LATBO0,LABNR0,LABDT0,LABTI0,LASTR0,COUNT(*) as TCNT  FROM L0__STDAT.LABOLF0' + where + 'GROUP BY LAARE0, LANRE0, LADER0, LATBO0, LATBO0,LABNR0,LABDT0,LABTI0,LASTR0 ORDER BY LANRE0' , param);
    //const data1 = data.slice(0, OTR.TRIG);
    return data;
}
async function getPrimaa1(tipo, numeroR){
    const cn1 = "DSN=nodejs;UID=dinoceraa;PWD=antodino";
    const connection = await odbc.connect(cn1);
    const dtday = new Date();
    const dtday1 = new Date();
    dtday1.setDate(dtday.getDate() - 10);
    const dtfin = giraData(dtday);
    const dtini = giraData(dtday1);
    //const totaleRighe = await connection.query('SELECT COUNT(lanre0) as TRIG FROM L0__STDAT.LABOLF0 WHERE LADRB0 BETWEEN ? AND ?' , ['2022-08-31','2022-09-10']);
    //const OTR = totaleRighe[0];
    console.log(+numeroR);
    console.log(tipo);
    var param = [
        tipo,
        dtini, 
        dtfin];
    let data;
    data = await connection.query('SELECT LAARE0, LANRE0, LADER0, LATBO0,LABNR0,LABDT0,LABTI0,LASTR0,COUNT(*) as TCNT  FROM L0__STDAT.LABOLF0 WHERE LATBO0 = ? AND LADRB0 BETWEEN ? AND ? GROUP BY LAARE0, LANRE0, LADER0, LATBO0, LATBO0,LABNR0,LABDT0,LABTI0,LASTR0 ORDER BY LANRE0' , param);

    /*if(tipo !== "" && numeroR== 000000){
        data = await connection.query('SELECT LAARE0, LANRE0, LADER0, LATBO0,LABNR0,LABDT0,LABTI0,LASTR0,COUNT(*) as TCNT  FROM L0__STDAT.LABOLF0 WHERE LATBO0 = ? AND LADRB0 BETWEEN ? AND ? GROUP BY LAARE0, LANRE0, LADER0, LATBO0, LATBO0,LABNR0,LABDT0,LABTI0,LASTR0 ORDER BY LANRE0' , param);
    } else if (tipo !== "" && numeroR !== 000000) {
        data = await connection.query('SELECT LAARE0, LANRE0, LADER0, LATBO0,LABNR0,LABDT0,LABTI0,LASTR0,COUNT(*) as TCNT  FROM L0__STDAT.LABOLF0 WHERE LANRE0 = ? AND LATBO0 = ? AND LADRB0 BETWEEN ? AND ? GROUP BY LAARE0, LANRE0, LADER0, LATBO0, LATBO0,LABNR0,LABDT0,LABTI0,LASTR0 ORDER BY LANRE0' , [numeroR, tipo, dtini, dtfin]); 
    } else if (tipo == "" && numeroR == 000000){
        data = await connection.query('SELECT LAARE0, LANRE0, LADER0, LATBO0,LABNR0,LABDT0,LABTI0,LASTR0,COUNT(*) as TCNT  FROM L0__STDAT.LABOLF0 WHERE LADRB0 BETWEEN ? AND ? GROUP BY LAARE0, LANRE0, LADER0, LATBO0, LATBO0,LABNR0,LABDT0,LABTI0,LASTR0 ORDER BY LANRE0' , [dtini, dtfin]);
    };*/
    //const data1 = data.slice(0, OTR.TRIG);
    return data;
}

async function getPrimaab(annoR, numeroR){
    const cn1 = "DSN=nodejs;UID=dinoceraa;PWD=antodino";
    const connection = await odbc.connect(cn1);
    const data = await connection.query('SELECT * FROM L0__STDAT.LABOLF0 WHERE LAARE0=? AND LANRE0=?' , [annoR, numeroR]);
    //const data1 = data.slice(0, 100);
    return data;
}

function giraData (data) {
    gg = data.getDate();
    mm = data.getMonth()+1;
    aa = data.getFullYear();
    let ggg = "";
    if(gg<10){
        ggg = "0"+gg;
    }else{
        ggg = gg;
    }
    let mmm = "";
    if(mm<10){
        mmm = "0"+mm;
    }else{
        mmm = mm;
    }
    const dtgira = aa +'-'+ mmm + '-' + ggg;
    return dtgira;
}

module.exports = {
    getAs400,
    getPrimaa,
    getPrimaab,
    getPrimaa1
};