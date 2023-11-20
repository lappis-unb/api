const express = require('express');
const router = express.Router();
const Moderacoes = require('../model/moderacao');
const { ObjectId } = require('mongodb');

router.get('/', async (req, res) => {
    res.setHeader("Access-Control-Allow-Origin", "*");        
    try {
        const moderacoes = await Moderacoes.find({}).limit(100);
        res.status(200).json(moderacoes)
    } catch (err) {
        res.status(500).json(err);
    }
})

router.get('/total', async (req, res) => {
    res.setHeader("Access-Control-Allow-Origin", "*");    
    try {
        const moderacoes = await Moderacoes.find({}).count();
        res.status(200).json(moderacoes)
    } catch (err) {
        res.status(500).json(err);
    }
})

router.post('/create', async (req, res) => {
    res.setHeader("Access-Control-Allow-Origin", "*");    
    console.log("req.body ", req.body)

    let moderacoes = new Moderacoes({
        id: req.body.id, 
        body: req.body.body,
        evento: req.body.evento,
        estado: req.body.estado
    });        

    // Moderacoes.find({"id": req.body.id})
    //   .then((moderacao) => {
    //     moderacao.id = req.body.id; 
    //     moderacao.body = req.body.body;
    //     moderacao.evento = req.body.evento;
    //     moderacao.estado = req.body.estado;        
    //     moderacoes = moderacao;
    //   });

    try {
        const moderacaoCadastrada = await moderacoes.save();
        res.status(200).json(moderacaoCadastrada)
    } catch (err) {
        res.status(500).json(err);
    }
})

router.post('/atualiza', async (req, res) => {

    console.log('moderação patch ', req.body.id,' ',req.body.body,' ',req.body.propostas_total);

    await Moderacoes.findById(req.body._id).then((moderacao) => {
        //console.log('*',moderacao)
        moderacao.id = req.body.id;
        moderacao.created_at = req.body.created_at;
        moderacao.body = req.body.body; 
        moderacao.evento = moderacao.evento; 
        moderacao.propostas_total = req.body.propostas_total; 
        moderacao.propostas_verificadas = req.body.propostas_verificadas; 
        moderacao.propostas_pendentes = req.body.propostas_pendentes; 
        moderacao.estado = req.body.estado;

        moderacao.save();

        // moderacao.save((err, moderacao)=>{
        //     if (err)
        //         res.status(500).send(err);                
        //     else
        //         res.status(200).send(moderacao);
        // })
    }).catch((error) => {
        res.status(500).send(error);
    })        
})

    // Moderacoes.findById(req.body._id, (err, moderacao) => {
    //     if (err)
    //         res.status(500).send(err);
    //     else if (!art)
    //         res.status(404).send({});
    //     else {
    //         moderacao.id = req.body.id,
    //         moderacao.created_at = req.body.created_at,
    //         moderacao.body = req.body.body, 
    //         moderacao.evento = moderacao.evento, 
    //         moderacao.propostas_total = req.body.propostas_total, 
    //         moderacao.propostas_verificadas = req.body.propostas_verificadas, 
    //         moderacao.propostas_pendentes = req.body.propostas_pendentes, 
    //         moderacao.estado = req.body.estado,
    //         moderacao.save((err, moderacao)=>{
    //             if (err)
    //                 res.status(500).send(err);                
    //             else
    //                 res.status(200).send(moderacao);
    //         })
    //     }
    // })





// router.get('/categoria/:categoria', (req, res) => {
//     res.setHeader("Access-Control-Allow-Origin", "*");
//     console.log('req.params.categoria =' + req.params.categoria)
//         Propostas.find({ category_id: req.params.categoria }).then((propostas) => {
//             //res.send(propostas);
//             res.status(200).json(propostas)
//         }).catch((error) => {
//             res.status(500).send(error);
//         })
//     })

// router.get('/deate/:de/:ate', async (req, res) => {
//     res.setHeader("Access-Control-Allow-Origin", "*");        
//     let de = req.params.de;
//     let ate = req.params.ate;    
//     // if (ate <= de) { ate = de }
//     console.log('deate ', de, ' ',ate)

//     try {
//         const propostas = await Propostas.find({}).skip(de).limit(ate);
//         res.status(200).json(propostas)
//     } catch (err) {
//         res.status(500).json(err);
//     }
// })

router.get('/:id', (req, res) => {
    res.setHeader("Access-Control-Allow-Origin", "*");
    console.log('req.params.id 1 =' + req.params.id)
        Moderacoes.findById(req.params.id).then((moderacao) => {
            console.log(moderacao)
            res.send(moderacao);
        }).catch((error) => {
            res.status(500).send(error);
        })
    })

router.get('/id/:id', (req, res) => {
    res.setHeader("Access-Control-Allow-Origin", "*");
    console.log('req.params.id 2 =' + req.params.id)
        Moderacoes.find({id: req.params.id}).then((moderacao) => {
            res.send(moderacao);
        }).catch((error) => {
            res.status(500).send(error);
        })
    })



// router.get('/busca/:query/:evento', function(req, res, next) {

//     res.setHeader("Access-Control-Allow-Origin", "*");        
//     let query = req.params.query;
//     let evento = req.params.evento;    

//     query = query.replaceAll('-','/');

//     console.log('query ', query, ' ',evento)
    

//     if((!query) && (!evento))
//        return res.render([]);
//     else {
   
//        let escopo = ""; //= ["", "", "", ""];
   
//        if (evento === '2') { escopo = 'ppaparticip'}
//        if (evento === '3') { escopo = 'confjuv4'}
   
//        if (query === 'x') {campo = escopo}
//        else {campo = query + ' ' + escopo;}

//        campo = campo.split(' ');
//        //let campo = query + ' ' + escopo; 
//        //console.log('req.query=',req.query, 'campo=',campo);
//        //const query_min = simplify(campo);
       
//        console.log('query simplify=',query, '...', campo, '...')

//        Propostas.find({tags: {$all: campo }}).then((propostas) => {
//         console.log(propostas);
//                         res.send(propostas);
//                         })
//                     .catch((error) => {
//                     res.status(500).send(error);
//                 })       
   
//     //    const MongoClient = require("mongodb").MongoClient;
//     //    const client = new MongoClient("mongodb://127.0.0.1:27017");
//     //    client.connect()
//     //               .then(conn => client.db("motor_busca"))
//     //               .then(db => db.collection("proposals2").find({tags: {$all: query }}))
                  
//     //               .then(cursor => cursor.toArray())
//     //               .then(movies => {
//     //                 return res.render('index', {title: 'Propostas - Motor de Busca', movies, query: req.query.q});
//     //               })
//       }
//    });

module.exports = router;
