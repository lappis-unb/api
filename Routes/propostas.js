const express = require('express');
const router = express.Router();
const Propostas = require('../model/proposta');
const Estatisticas = require('../model/estatistica');
const { ObjectId } = require('mongodb');

// var estatistica;

// const buscaEstatistica = (categoria) => {
//     console.log('buscaEstatistica ', categoria);
//     Estatisticas.get(`/categoria/${categoria}`)
//     // axios.get(`estatisticas/categoria/${categoria}`)
//       .then(estatisticas => {
//         if (estatisticas.data[0] !== undefined) {
//           console.log(' categoria= ', categoria, 'estatisticas', estatisticas)
//           estatistica = estatisticas[0].data;
//         } else {
//           estatistica = '';
//         }
//       })
//       .catch(error => {
//         console.log(error);
//       })
//   }

//   const gravaEstatistica = (estatistica) => {
//     axios.get(`${URL_API_LOCAL}/estatisticas/create`, estatistica)
//       .then(estatistica => {
//           console.log(' gravou= ', estatistica)
//       })
//       .catch(error => {
//         console.log(error);
//       })
//   }  


router.get('/', async (req, res) => {
    res.setHeader("Access-Control-Allow-Origin", "*");        
    try {
        const propostas = await Propostas.find({}).limit(100);
        res.status(200).json(propostas)
    } catch (err) {
        res.status(500).json(err);
    }
})

// router.get('/estatistica', async (req, res) => {
//     res.setHeader("Access-Control-Allow-Origin", "*");        
//     //var resultadoEstatistica = [{}];
//     try {
//         const propostas = await Propostas.find({});

//         console.log('propostas ', propostas.length);
        
//         propostas.map((proposta) => {

//             buscaEstatistica(proposta.category_id)

//             if (estatistica !== '') { 
//                 estatistica.propostas = (estatistica.propostas + 1);
//                 estatistica.supports = (estatistica.supports + proposta.supports);
//                 estatistica.followers = (estatistica.followers + proposta.followers);
//             }  
//             else {
//                 estatistica.id = proposta.category_id;
//                 estatistica.category_id = proposta.category_id;
//                 estatistica.category_name = proposta.category_name;
//                 estatistica.participatory_space_id = proposta.participatory_space_id;
//                 estatistica.participatory_space_url = proposta.participatory_space_url;
//                 estatistica.data_num = proposta.published_at;
//                 estatistica.propostas = 1;
//                 estatistica.supports = proposta.supports;
//                 estatistica.followers = proposta.followers;
//             }

//             gravaEstatistica(estatistica);
            
//         } )
     
//         console.log('tamanhos= ',propostas.length,' ', resultadoEstatistica.length)

//         res.status(200).json(resultadoEstatistica)
//     } catch (err) {
//         res.status(500).json(err);
//     }
// })

router.get('/total', async (req, res) => {
    res.setHeader("Access-Control-Allow-Origin", "*");    
    try {
        const propostas = await Propostas.find({}).count();
        res.status(200).json(propostas)
    } catch (err) {
        res.status(500).json(err);
    }
})

router.get('/totalEvento/:tipo', async (req, res) => {
    res.setHeader("Access-Control-Allow-Origin", "*");    
    tipo = req.params.tipo;
    console.log('tipo =',tipo);
    try {
        escopo = 'confjuv4';
        if (tipo === '2') { escopo = 'ppaparticip'}
        if (tipo === '3') { escopo = 'confjuv4'}                 
        //const propostas = await Propostas.find( {tags: escopo} ).count()
        const propostas = await Propostas.aggregate([
            {$match: { tags:escopo}},
            {$group: {_id: escopo, propostas: {$sum: 1}, votos: {$sum: "$supports"}}}])        
        console.log('totalEvento ',propostas[0])
        res.status(200).json(propostas[0])
    } catch (err) {
        res.status(500).json(err);
    }
})

router.get('/totalCategoria', async (req, res) => {
    res.setHeader("Access-Control-Allow-Origin", "*");    // db.propostas.aggregate([{$group: {_id: "$category_name", votos: {$sum: "$supports"}, propostas: { $sum: 1 }}}])
    try {
        const propostas = await Propostas.aggregate([
                               {$group: {_id: "$category_name", propostas: {$sum: 1}, votos: {$sum: "$supports"}}}
                            ])
                            
        console.log('totalCategoria ',propostas)
        res.status(200).json(propostas)
    } catch (err) {
        res.status(500).json(err);
    }
})

router.get('/totalCategoriaEvento/:evento', async (req, res) => {
    res.setHeader("Access-Control-Allow-Origin", "*");   
    try {
        const propostas = await Propostas.aggregate([
                               {$match: {tags: req.params.evento}},
                               {$group: {_id: "$category_name", propostas: {$sum: 1}, votos: {$sum: "$supports"}}}])
        console.log('totalCategoriaEvento ',propostas)
        res.status(200).json(propostas)
    } catch (err) {
        res.status(500).json(err);
    }
})

router.get('/totalDataEvento/:evento', async (req, res) => {
    res.setHeader("Access-Control-Allow-Origin", "*");   
    try {
        const propostas = await Propostas.aggregate([
            // {$match: {tags: req.params.evento}},
            // { $project : 
            //     {
            //     "$published_at": 1,
            //     "$supports": 1,
            //     data: { $substr: [ "$published_at", 0, 10 ] }
            //     },
            // },            
            // {$group: {_id: "$data", propostas: {$sum: 1}, votos: {$sum: "$supports"}}},
            // {$sort : {published_at: -1} },])

            // db.propostas.aggregate(
            //     [
                  {$match: {tags: req.params.evento}},
                  {
                    $project:
                       {
                         publishe_at: 1,
                         supports: 1,
                         yearSubstring: { $concat: [ { $substr: [ "$published_at", 6, 4 ]}, {$substr: [ "$published_at", 3, 2 ]}, {$substr: [ "$published_at", 0, 2 ]}] },
                       }
                   },
                   {$group: {_id: "$yearSubstring", propostas: {$sum: 1}, votos: {$sum: "$supports"}}},
                   {$sort : {published_at: 1} }
                ]
             )





        console.log('totalDataEvento ',propostas)
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

    router.get('/categoriaName/:categoria', (req, res) => {
        res.setHeader("Access-Control-Allow-Origin", "*");
        console.log('req.params.categoria =' + req.params.categoria)
            Propostas.find({ category_name: req.params.categoria }).then((propostas) => {
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

       if (evento === '1') {campo = query}

       campo = campo.split(' ');
       //let campo = query + ' ' + escopo; 
       //console.log('req.query=',req.query, 'campo=',campo);
       //const query_min = simplify(campo);
       
       console.log('query simplify=',query, '...', campo, '...')

       Propostas.find({tags: {$all: campo }}).then((propostas) => {
                        console.log('.........',propostas.length)
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
