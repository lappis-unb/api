const express = require('express');
const router = express.Router();
const Propostas = require('../model/proposta');
const { ObjectId } = require('mongodb');

router.get('/', async (req, res) => {
    res.setHeader("Access-Control-Allow-Origin", "*");        
    try {
        const propostas = await Propostas.find({}).limit(100);
        res.status(200).json(propostas)
    } catch (err) {
        res.status(500).json(err);
    }
})

router.get('/total', async (req, res) => {
    res.setHeader("Access-Control-Allow-Origin", "*");    
    try {
        const propostas = await Propostas.find({}).count();
        res.status(200).json(propostas)
    } catch (err) {
        res.status(500).json(err);
    }
})

router.get('/categoria/:categoria', (req, res) => {
    res.setHeader("Access-Control-Allow-Origin", "*");
    console.log('req.params.categoria =' + req.params.categoria)
        Propostas.find({ category_id: req.params.categoria }).then((propostas) => {
            //res.send(propostas);
            res.status(200).json(propostas)
        }).catch((error) => {
            res.status(500).send(error);
        })
    })

router.get('/deate/:de/:ate', async (req, res) => {
    res.setHeader("Access-Control-Allow-Origin", "*");        
    let de = req.params.de;
    let ate = req.params.ate;    
    // if (ate <= de) { ate = de }
    console.log('deate ', de, ' ',ate)

    try {
        const propostas = await Propostas.find({}).skip(de).limit(ate);
        res.status(200).json(propostas)
    } catch (err) {
        res.status(500).json(err);
    }
})

router.get('/:id', (req, res) => {
    res.setHeader("Access-Control-Allow-Origin", "*");
    console.log('req.params.id =' + req.params.id)
        Propostas.findById(req.params.id).then((proposta) => {
            console.log(proposta)
            res.send(proposta);
        }).catch((error) => {
            res.status(500).send(error);
        })
    })

router.get('/id/:id', (req, res) => {
    res.setHeader("Access-Control-Allow-Origin", "*");
    console.log('req.params.id =' + req.params.id)
        Propostas.find({id: req.params.id}).then((proposta) => {
            res.send(proposta);
        }).catch((error) => {
            res.status(500).send(error);
        })
    })

// router.post('/create', async (req, res) => {
//     let propostas = new Propostas({
//         template: req.body.template, 
//         assunto: req.body.assunto,
//         texto: req.body.texto,
//         tipo: req.body.tipo
//     });    
//     try {
//         const mensagemCadastrada = await mensagem.save();
//         // usuarioCadastrado.password = undefined
//         res.status(200).json(mensagemCadastrada)
//     } catch (err) {
//         res.status(500).json(err);
//     }
// })

router.get('/busca/:query/:evento', function(req, res, next) {

    res.setHeader("Access-Control-Allow-Origin", "*");        
    let query = req.params.query;
    let evento = req.params.evento;    

    query = query.replaceAll('-','/');

    console.log('query ', query, ' ',evento)
    

    if((!query) && (!evento))
       return res.render([]);
    else {
   
       let escopo = ""; //= ["", "", "", ""];
   
       if (evento === '2') { escopo = 'ppaparticip'}
       if (evento === '3') { escopo = 'confjuv4'}
   
       if (query === 'x') {campo = escopo}
       else {campo = query + ' ' + escopo;}

       campo = campo.split(' ');
       //let campo = query + ' ' + escopo; 
       //console.log('req.query=',req.query, 'campo=',campo);
       //const query_min = simplify(campo);
       
       console.log('query simplify=',query, '...', campo, '...')

       Propostas.find({tags: {$all: campo }}).then((propostas) => {
                        res.send(propostas);
                        })
                    .catch((error) => {
                    res.status(500).send(error);
                })       
   
    //    const MongoClient = require("mongodb").MongoClient;
    //    const client = new MongoClient("mongodb://127.0.0.1:27017");
    //    client.connect()
    //               .then(conn => client.db("motor_busca"))
    //               .then(db => db.collection("proposals2").find({tags: {$all: query }}))
                  
    //               .then(cursor => cursor.toArray())
    //               .then(movies => {
    //                 return res.render('index', {title: 'Propostas - Motor de Busca', movies, query: req.query.q});
    //               })
      }
   });

module.exports = router;
