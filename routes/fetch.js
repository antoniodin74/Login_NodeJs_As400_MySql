const express = require('express');
const router = express.Router();
const parser = require('xml2js');
const fs = require('fs');

router.get('/', async (req, res)=>{
        fs.readFile(__dirname + '/bolla.xml', function(err, data) {
                if (err) throw new Error(err);
                        parser.parseString(data, function(err, result) {
                        res.render('fetch', {
                                fetch : result,
                        signup : true
                        });
                });
                
        })
});

async function caricaxml(){
       
}


/*function caricaxml(){
        fs.readFile(__dirname + '/fetch.xml', function(err, data) {
                if (err) throw new Error(err);
                const parser = new xml2js.Parser();
                parser.parseStringPromise(data)
                .then(function (res){
                        console.log(res);
                        console.log(res.BollaEt.IdentificativoUnivocoBolla[0]);
                        console.log(res.BollaEt.TipoBolla[0]);
                        console.log(res.BollaEt.DataAccettazione[0]);
                        console.log(res.BollaEt.TipoDichiarazione[0]);
                        console.log(res.BollaEt.NumeroArticoli[0]);
                        console.log(res.BollaEt.TotaleMassaLorda[0]);
                        console.log(res.BollaEt.TotaleMassaNetta[0]);
                        console.log(res.BollaEt.TotaleColli[0]);
                        console.log(res.BollaEt.DoganaPresentazione[0]);
                        console.log(res.BollaEt.SpeditoreEsportatore[0].RagioneSociale[0]);
                        console.log(res.BollaEt.SpeditoreEsportatore[0].Indirizzo[0]);
                        console.log(res.BollaEt.SpeditoreEsportatore[0].Cap[0]);
                        console.log(res.BollaEt.SpeditoreEsportatore[0].Citta[0]);
                        console.log(res.BollaEt.SpeditoreEsportatore[0].Paese[0]);
                        console.log(res.BollaEt.SpeditoreEsportatore[0].Eori[0]);
                        console.log(res.BollaEt.Destinatario[0].RagioneSociale[0]);
                        console.log(res.BollaEt.Destinatario[0].Indirizzo[0]);
                        console.log(res.BollaEt.Destinatario[0].Cap[0]);
                        console.log(res.BollaEt.Destinatario[0].Citta[0]);
                        console.log(res.BollaEt.Destinatario[0].Paese[0]);
                        console.log(res.BollaEt.Destinatario[0].Eori[0]);
                        console.log(res.BollaEt.PaeseSpedizione[0]);
                        console.log(res.BollaEt.PaeseDestinazione[0]);
                        console.log(res.BollaEt.NumeroProgressivoAnnualePratica[0]);
                        console.log(res.BollaEt.UfficioDestinazione[0]);
                        console.log(res.BollaEt.EstremiRegistrazione[0].DataEsito[0]);
                        console.log(res.BollaEt.EstremiRegistrazione[0].SerieRegistro[0]);
                        console.log(res.BollaEt.EstremiRegistrazione[0].NumeroRegistrazione[0]);
                        console.log(res.BollaEt.EstremiRegistrazione[0].A93[0]);
                        console.log(res.BollaEt.EstremiRegistrazione[0].Cin[0]);
                        console.log(res.BollaEt.EstremiRegistrazione[0].CodiceRegistro[0]);
                        console.log(res.BollaEt.EstremiRegistrazione[0].Conto[0]);
                        console.log(res.BollaEt.EstremiRegistrazione[0].Mrn[0]);
                        console.log(res.BollaEt.NumeroCarico[0]);
                        console.log(res.BollaEt.AnnoCarico[0]);
                        console.log(res.BollaEt.Articoli[0].Articolo[0].NumeroArticolo[0]);
                        console.log(res.BollaEt.Articoli[0].Articolo[0].DescrizioneMerce[0]);
                        console.log(res.BollaEt.Articoli[0].Articolo[0].AltreIndicazioni[0]);
                        console.log(res.BollaEt.Articoli[0].Articolo[0].NomenclaturaCombinata[0]);
                        console.log(res.BollaEt.Articoli[0].Articolo[0].Containers[0].Sigla[0]);
                        console.log(res.BollaEt.Articoli[0].Articolo[0].Regime[0]);
                        console.log(res.BollaEt.Articoli[0].Articolo[0].MassaLorda[0]);
                        console.log(res.BollaEt.Articoli[0].Articolo[0].MassaNetta[0]);
                        console.log(res.BollaEt.Articoli[0].Articolo[0].UnitaSupplementare[0]);
                        console.log(res.BollaEt.Articoli[0].Articolo[0].ContieneUnitaSupplementare[0]);
                        console.log(res.BollaEt.Articoli[0].Articolo[0].Imballaggi[0]);
                        const arr = [{IdentificativoUnivocoBolla:res.BollaEt.IdentificativoUnivocoBolla[0],
                                TipoBolla:res.BollaEt.TipoBolla[0]},
                        ];
                        console.log(arr);
                        console.log('ciao');
                        return arr;
                })
        })
}*/

module.exports = router;