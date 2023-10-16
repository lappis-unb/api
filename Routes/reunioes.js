const express = require('express');
const router = express.Router();
const Reunioes = require('../model/reuniao');
const { ObjectId } = require('mongodb');

router.get('/', async (req, res) => {
 //   res.setHeader("Access-Control-Allow-Origin", "*");        
    try {
        const reunioes = await Reunioes.find({});
        res.status(200).json(reunioes)
    } catch (err) {
        res.status(500).json(err);
    }
})

router.get('/total', async (req, res) => {
 //   res.setHeader("Access-Control-Allow-Origin", "*");    
    try {
        const reunioes = await Reunioes.find({}).count();
        res.status(200).json(reunioes)
    } catch (err) {
        res.status(500).json(err);
    }
})

// router.get('/categoria/:categoria_id', (req, res) => {
//     console.log('req.params.categoria_id =' + req.params.categoria_id);
//     let id = '/' + req.params.categoria_id + '/';
//         Reunioes.find({ root_commentable_url:  { $regex: req.params.proposta_id }}).then((propostas) => {
//             res.status(200).json(propostas)
//         }).catch((error) => {
//             res.status(500).send(error);
//         })
//     })

router.get('/categoria/:categoria', (req, res) => {
    // res.setHeader("Access-Control-Allow-Origin", "*");
     console.log('req.params.categoria =' + req.params.categoria)
         Reunioes.find({ category_id: req.params.categoria }).then((reunioes) => {
             //res.send(propostas);
             res.status(200).json(reunioes)
         }).catch((error) => {
             res.status(500).send(error);
         })
     })

router.get('/scope/:scope', (req, res) => {
        // res.setHeader("Access-Control-Allow-Origin", "*");
    console.log('req.params.scope =' + req.params.scope)
        Reunioes.find({ scope_id: req.params.scope }).then((reunioes) => {
            //res.send(propostas);
            res.status(200).json(reunioes)
        }).catch((error) => {
            res.status(500).send(error);
        })
    })


router.get('/deate/:de/:ate', async (req, res) => {
    // res.setHeader("Access-Control-Allow-Origin", "*");        
    let de = req.params.de;
    let ate = req.params.ate;    
    // if (ate <= de) { ate = de }
    console.log('deate ', de, ' ',ate)

    try {
        const reunioes = await Reunioes.find({}).skip(de).limit(ate);
        res.status(200).json(reunioes)
    } catch (err) {
        res.status(500).json(err);
    }
})

router.get('/:id', (req, res) => {
 //   res.setHeader("Access-Control-Allow-Origin", "*");
    console.log('req.params.id =' + req.params.id)
        Reunioes.findById(req.params.id).then((reuniao) => {
            console.log(reuniao)
            res.send(reuniao);
        }).catch((error) => {
            res.status(500).send(error);
        })
    })

router.get('/id/:id', (req, res) => {
 //   res.setHeader("Access-Control-Allow-Origin", "*");
    console.log('req.params.id =' + req.params.id)
        Reunioes.find({id: req.params.id}).then((reuniao) => {
            res.send(reuniao);
        }).catch((error) => {
            res.status(500).send(error);
        })
    })

module.exports = router;
