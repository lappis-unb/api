const express = require('express');
const axios = require('axios');
const router = express.Router();
const Matomo = require('../model/matomo');

//# Configurações da API do Matomo
const matomo_url = process.env.MATOMO_URL; 

router.post('/create', async (req, res) => {
    let matomo = new Matomo({
        apinome: req.body.apinome,
        resposta: req.body.resposta, 
        datarequisicao: req.body.dataRequisicao
    });    
    try {
        const matomoCadastrado = await matomo.save();
        // usuarioCadastrado.password = undefined
        console.log('OK')
        res.status(200).json(matomoCadastrado)
    } catch (err) {
        res.status(500).json(err);
    }
})


router.post('/requisicao', async (req, res) => {
    console.log('requisicao ', req.body)
    var api = req.body.api; 
    var data = req.body.data;

    const params = new URLSearchParams(
        [['module', 'API'], ['method', api],
        ['idSite', process.env.MATOMO_ID_SITE], ['period', 'day'], 
        ['date', data], ['format', 'json'], ['token_auth', process.env.MATOMO_TOKEN]]);     

        // console.log(matomo_url, ' ', params)        
    try {            
        var res1;
        await axios.get(matomo_url, { params })
        .then(resposta => {
            res1 = resposta.data
            console.log(resposta.data); // JSON.stringify(res))
            //res1 = JSON.stringify(res)
            //res1 = JSON.parse(res)
            //console.log(api + '> ' + resposta.data);

        })
        .catch (error => {
        console.log(error);
        }) 

        res.status(200).json(res1)
    } catch (err) {
        res.status(500).json(err);
    }
})


router.post('/requisicaogravando', async (req, res) => {
    console.log('requisicaogravando ', req.body)
    var api = req.body.api; 
    var data = req.body.data;
    var limit = req.body.limite;

    // var labelsDados = 
    // ["2023-05-10","2023-05-11","2023-05-12","2023-05-13","2023-05-14","2023-05-15","2023-05-16","2023-05-17","2023-05-18","2023-05-19","2023-05-20",
    //  "2023-05-21","2023-05-22","2023-05-23","2023-05-24","2023-05-25","2023-05-26","2023-05-27","2023-05-28","2023-05-29","2023-05-30","2023-05-31","2023-06-01","2023-06-02","2023-06-03","2023-06-04","2023-06-05","2023-06-06","2023-06-07","2023-06-08","2023-06-09",
    //  "2023-06-10","2023-06-11","2023-06-12","2023-06-13","2023-06-14","2023-06-15","2023-06-16","2023-06-17","2023-06-18","2023-06-19","2023-06-20","2023-06-21","2023-06-22","2023-06-23","2023-06-24","2023-06-25","2023-06-26","2023-06-27","2023-06-28","2023-06-29",
    //  "2023-06-30","2023-07-01","2023-07-02","2023-07-03","2023-07-04","2023-07-05","2023-07-06","2023-07-07","2023-07-08","2023-07-09","2023-07-10","2023-07-11","2023-07-12","2023-07-13","2023-07-14","2023-07-15","2023-07-16","2023-07-17","2023-07-18","2023-07-19",
    //  "2023-07-20","2023-07-21","2023-07-22","2023-07-23","2023-07-24","2023-07-25","2023-07-26","2023-07-27","2023-07-28","2023-07-29","2023-07-30","2023-07-31","2023-08-01","2023-08-02","2023-08-03","2023-08-04","2023-08-05","2023-08-06","2023-08-07","2023-08-08",
    //  "2023-08-09","2023-08-10","2023-08-11","2023-08-12","2023-08-13","2023-08-14","2023-08-15","2023-08-16","2023-08-17","2023-08-18","2023-08-19","2023-08-20","2023-08-21","2023-08-22","2023-08-23","2023-08-24","2023-08-25","2023-08-26","2023-08-27","2023-08-28",
    //  "2023-08-29","2023-08-30","2023-08-31","2023-09-01","2023-09-02","2023-09-03","2023-09-04","2023-09-05","2023-09-06","2023-09-07","2023-09-08","2023-09-09","2023-09-10","2023-09-11","2023-09-12","2023-09-13","2023-09-14","2023-09-15","2023-09-16","2023-09-17",
    //  "2023-09-18","2023-09-19","2023-09-20","2023-09-21","2023-09-22","2023-09-23","2023-09-24","2023-09-25","2023-09-26","2023-09-27","2023-09-28","2023-09-29","2023-09-30","2023-10-01","2023-10-02","2023-10-03","2023-10-04","2023-10-05","2023-10-06","2023-10-07",
    //  "2023-10-08","2023-10-09","2023-10-10","2023-10-11","2023-10-12","2023-10-13","2023-10-14","2023-10-15","2023-10-16","2023-10-17","2023-10-18","2023-10-19","2023-10-20","2023-10-21","2023-10-22","2023-10-23","2023-10-24","2023-10-25","2023-10-26","2023-10-27",
    //  "2023-10-28","2023-10-29","2023-10-30","2023-10-31","2023-11-01","2023-11-02","2023-11-03","2023-11-04","2023-11-05","2023-11-06","2023-11-07","2023-11-08","2023-11-09","2023-11-10"]    

    var res1;

    // labelsDados.map( async (data) => {

         console.log('.',data,'.');
        // if (data.indexOf("{") !== -1) {
        //     let aux = data.substr((data.indexOf("{") + 1),(data.length),'_');
        //     limit = aux;
        //     data = data.substr(0,(data.indexOf("{")));
        //     console.log('.',data,'.',aux,'_');
        // }

        // setTimeout(() => {  console.log('Esperando ...'); }, 2000);

        let params = new URLSearchParams(
            [['module', 'API'], ['method', api],
            ['idSite', process.env.MATOMO_ID_SITE], ['period', 'day'], ['filter_limit', limit],
            ['date', data], ['format', 'json'], ['token_auth', process.env.MATOMO_TOKEN]]);     
    
             console.log(matomo_url, ' ', params)        

            await axios.get(matomo_url, { params })
            .then(resposta => {
                res1 = resposta.data
         //       console.log(resposta.data); // JSON.stringify(res))
                //res1 = JSON.stringify(res)
                //res1 = JSON.parse(res)
               // console.log(api + '> ' + res1);
  
            })
            .catch (error => {
                res.status(500).json(error)
            console.log(error);
            }) 

    // });            

    try {     
            res.status(200).json(res1)
    } catch (err) {
            res.status(500).json(err);
        }
    
})


module.exports = router;
