const express = require('express');
const router = express.Router();
const Temas = require('../model/tema');
const { ObjectId } = require('mongodb');

router.get('/', async (req, res) => {
    res.setHeader("Access-Control-Allow-Origin", "*");        
    try {
        const temas = await Temas.find({});
        res.status(200).json(temas)
    } catch (err) {
        res.status(500).json(err);
    }
})

router.get('/evento/:evento', async (req, res) => {
    res.setHeader("Access-Control-Allow-Origin", "*");        
    console.log('req.params.evento=', req.params.evento);

    // Temas.find({evento: req.params.evento}).then((tema) => {
    //     res.send(tema);
    // }).catch((error) => {
    //     res.status(500).send(error);
    // })



    try {
        const temas = await Temas.find({evento: req.params.evento});
        res.status(200).json(temas)
    } catch (err) {
        res.status(500).json(err);
    }
})

router.get('/deate/:de/:ate', async (req, res) => {
    // res.setHeader("Access-Control-Allow-Origin", "*");        
    let de = req.params.de;
    let ate = req.params.ate;    
    // if (ate <= de) { ate = de }

    try {
        const temas = await Temas.find({}).skip(de).limit(ate);
        res.status(200).json(temas)
    } catch (err) {
        res.status(500).json(err);
    }
})


router.get('/total', async (req, res) => {
    res.setHeader("Access-Control-Allow-Origin", "*");    
    try {
        const temas = await Temas.find({}).count();
        res.status(200).json(temas)
    } catch (err) {
        res.status(500).json(err);
    }
})

router.get('/:id', (req, res) => {
    res.setHeader("Access-Control-Allow-Origin", "*");
    console.log('req.params.id =' + req.params.id)
        Temas.findById(req.params.id).then((tema) => {
            res.send(tema);
        }).catch((error) => {
            res.status(500).send(error);
        })
    })

router.get('/id/:id', (req, res) => {
    res.setHeader("Access-Control-Allow-Origin", "*");
    console.log('req.params.id =' + req.params.id)
        Temas.find({id: req.params.id}).then((tema) => {
            res.send(tema);
        }).catch((error) => {
            res.status(500).send(error);
        })
    })

router.post('/create', async (req, res) => {
    let tema = new Temas({
        id: req.body.id,
        nome: req.body.nome        
    });    
    try {
        const temaCadastrado = await tema.save();
        res.status(200).json(temaCadastrado)
    } catch (err) {
        res.status(500).json(err);
    }
})

module.exports = router;