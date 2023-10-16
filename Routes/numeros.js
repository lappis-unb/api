const express = require('express');
const router = express.Router();
const Numeros = require('../model/numero');
const JWT = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const { ObjectId } = require('mongodb');

router.get('/', async (req, res) => {
    res.setHeader("Access-Control-Allow-Origin", "*");
    try {
        const numeros = await Numeros.find({}).limit(100);
        res.status(200).json(numeros)
        console.log(numeros)
    } catch (err) {
        res.status(500).json(err);
    }
})

router.get('/total', async (req, res) => {
    res.setHeader("Access-Control-Allow-Origin", "*");
    try {
        const numeros = await Numeros.find({}).count();
        res.status(200).json(numeros)
    } catch (err) {
        res.status(500).json(err);
    }
})

router.get('/:id', (req, res) => {
    res.setHeader("Access-Control-Allow-Origin", "*");
    console.log('req.params.id =' + req.params.id)
    Numeros.findById(req.params.id).then((numero) => {
        res.send(numero);
    }).catch((error) => {
        res.status(500).send(error);
    })
})

router.get('/tipo/:tipo', async (req, res) => {
    // res.setHeader("Access-Control-Allow-Origin", "*");        
    let tipo = req.params.tipo;

    try {
        const numeros = await Numeros.find({ tipo: tipo }).limit(1000);
        res.status(200).json(numeros)
    } catch (err) {
        res.status(500).json(err);
    }
})


router.get('/ranking/:ranking', async (req, res) => {
    // res.setHeader("Access-Control-Allow-Origin", "*");        
    let ranking = req.params.ranking;

    try {
        const numeros = await Numeros.find({ ranking: ranking }).limit(1000);
        res.status(200).json(numeros)
    } catch (err) {
        res.status(500).json(err);
    }
})

router.post('/regiao', async (req, res) => {
    // res.setHeader("Access-Control-Allow-Origin", "*");        
    var consulta = {};
    let regiao = req.body.regiao; 
    let tipo = req.body.tipo;
    let ranking = req.body.ranking;
    let proposta = req.body.proposta;  
    let categoria = req.body.categoria;  

    if (regiao && (regiao.length > 0)) { consulta.regiao = regiao }
    if (tipo && (tipo.length > 0)) { consulta.tipo = tipo }
    if (ranking && (ranking.length > 0)) { consulta.ranking = ranking }
    if (proposta && (proposta.length > 0)) { consulta.proposta = proposta} 
    if (categoria && (categoria > 0)) { consulta.categoria = categoria } 

    console.log('consulta:',consulta)
    // if (!consulta) { consulta.proposta = 44 }
    console.log('categoria:[', categoria, ']');

    try {
        const numeros = await Numeros.find(consulta).limit(1000);
        res.status(200).json(numeros)
    } catch (err) {
        res.status(500).json(err);
    }
})

router.get('/ranking/:ranking/regiao/:regiao', async (req, res) => {
    // res.setHeader("Access-Control-Allow-Origin", "*");        
    let ranking = req.params.ranking;
    let regiao = req.params.regiao;

    try {
        const numeros = await Numeros.find({ ranking: ranking, regiao: regiao }).limit(1000);
        res.status(200).json(numeros)
    } catch (err) {
        res.status(500).json(err);
    }
})

router.get('/tipo/:tipo/regiao/:regiao/ranking/:ranking/proposta/:proposta', async (req, res) => {
    // res.setHeader("Access-Control-Allow-Origin", "*");        

    var regiao = req.params.regiao;
    var ranking = req.params.ranking;
    var tipo = req.params.tipo;
    var proposta = req.params.proposta;
    // let tipo = req.params.tipo; 
    // let proposta = req.params.proposta; 
    console.log(tipo, ' ', regiao, ' ', ranking, ' ', proposta);

    var numeros_c = []

    try {
        const numeros = await Numeros.find({ tipo: tipo, ranking: ranking, regiao: regiao, proposta: proposta }).limit(1000);
        // if (regiao && ranking) { 
        //     const numeros = await Numeros.find({ranking: ranking, regiao: regiao}); 
        //     numeros_c = numeros;
        // }  else {
        //         if (regiao) { const numeros = await Numeros.find({regiao: regiao}); 
        //                       numeros_c = numeros; }
        //         else { const numeros = await Numeros.find({regiao: regiao}); 
        //                numeros_c = numeros;}
        // } 

        res.status(200).json(numeros)
    } catch (err) {
        res.status(500).json(err);
    }
})

module.exports = router;