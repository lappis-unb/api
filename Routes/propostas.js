const express = require('express');
const router = express.Router();
const Propostas = require('../model/proposta');

const PropostasLog = require('../model/propostaLog');
const PropostasVoto = require('../model/propostaVoto');
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

       //console.log('totalDataEvento ',propostas)
        res.status(200).json(propostas)
    } catch (err) {
        res.status(500).json(err);
    }
})
//-------------------------------------------------------------------------------------------------CPPS
router.get('/propostasData', async (req, res) => {
    //console.log('Entrou aqui - propostasData');
    res.setHeader("Access-Control-Allow-Origin", "*");   
    try {
        const propostas = await //Propostas.find().sort({published_at: -1}).limit(10); 

        Propostas.aggregate(
            [
              {
                $project:
                   {
                     id: 1,
                     published_at: 1,
                     category_name: 1,  
                     title: 1,
                     body: 1,
                     publishe_at: 1,
                     supports: 1,
                     yearSubstring: { $concat: [ {$substr: [ "$published_at", 6, 4 ]}, 
                                                 {$substr: [ "$published_at", 3, 2 ]}, 
                                                 {$substr: [ "$published_at", 0, 2 ]}
                                                ] },
                   }
               },
               {$sort : {yearSubstring: -1} }
            ]
         ).limit(1000)


        //console.log('propostaData ',propostas)
        res.status(200).json(propostas)
    } catch (err) {
        res.status(500).json(err);
    }
})

router.get('/totalDatas', async (req, res) => {
    res.setHeader("Access-Control-Allow-Origin", "*");   
    try {
        const propostas = await Propostas.aggregate([
                  {
                    $project:
                       {
                         published_at: 1,
                         supports: 1,
                         yearSubstring: { $concat: [ { $substr: [ "$published_at", 6, 4 ]}, {$substr: [ "$published_at", 3, 2 ]}, {$substr: [ "$published_at", 0, 2 ]}] },
                       }
                   },
                   {$group: {_id: "$yearSubstring", propostas: {$sum: 1}, votos: {$sum: "$supports"}}},
                   {$sort : {_id: -1} }
                ]
             ).limit(1000)
        res.status(200).json(propostas)
    } catch (err) {
        res.status(500).json(err);
    }
})

//-------------------------------------------------------------------------------------------------CPPS

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
    console.log('/:id req.params.id =' + req.params.id)
        Propostas.findById(req.params.id).then((proposta) => {
            console.log(proposta)
            res.send(proposta);
        }).catch((error) => {
            res.status(500).send(error);
        })
    })

router.get('/id/:id', (req, res) => {
    res.setHeader("Access-Control-Allow-Origin", "*");
    console.log('/id/:id req.params.id =' + req.params.id)
        Propostas.find({id: req.params.id}).then((proposta) => {
            res.send(proposta);
        }).catch((error) => {
            res.status(500).send(error);
        })
    })

router.post('/create', async (req, res) => {
    let dados = req.body;
    console.log('/create req.body: ',req.body.bairro)
    //console.log('req: ',req)

    console.log('dados: ',dados)
    let proposta = new Propostas(
        dados 
    );    
    try {
        const propostaCadastrada = await proposta.save();
        // usuarioCadastrado.password = undefined
        res.status(200).json(propostaCadastrada)
    } catch (err) {
        res.status(500).json(err);
    }
})

router.get('/logs/:id', async (req, res) => {
    res.setHeader("Access-Control-Allow-Origin", "*");
    console.log('/id/:id req.params.id =' + req.params.id)
        await PropostasLog.find({id_proposta: req.params.id}).then((propostaLog) => {
            res.send(propostaLog);
        }).catch((error) => {
            res.status(500).send(error);
        })
    })


router.post('/update', async (req, res) => {
    let dados = req.body;
    let propostaAtualizada = dados.propostaAtualizada;
    // propostaAtualizada.estado = dados.estado;
    let propostaEstadoAnterior = dados.propostaEstadoAnterior;
    console.log('/update req.body: ',req.body)
    console.log('dados.propostaAtualizada: ',dados.propostaAtualizada);
    console.log('dados.estado: ',dados.estado);
    console.log('dados.texto: ',dados.texto);
    console.log('dados.propostaEstadoAnterior: ',dados.propostaEstadoAnterior);

    let propostaLog = new PropostasLog({
        data_log: new Date(),
        id_proposta: propostaAtualizada._id,
        id_usuario: 'idZero',
        nome_usuario: 'Nome do Usuário',
        texto: dados.texto,        
        proposta_anterior: propostaEstadoAnterior
        }
    );    
    console.log('propostaLog=',propostaLog);
    try {
        const propostaLogCadastrada = await propostaLog.save();
        // usuarioCadastrado.password = undefined
        res.status(200).json(propostaLogCadastrada)
    } catch (err) {
        res.status(500).json(err);
    }

    // try {
    //     Propostas.updateOne({ _id: ObjectId(propostaAtualizada._id) }, {
    //         $set: { "estado": dados.estado }
    //         })
    // } catch (err) {
    //     res.status(500).json(err);
    // }

})

router.post('/updatevoto', async (req, res) => {
    let dados = req.body;
    console.log('/updatevoto req.body: ',req.body)
    let propostaVoto = new PropostasVoto({
        data_log: new Date(),
        id_proposta: dados.id_proposta,
        id_usuario: 'idZero',
        nome_usuario: 'Nome do Usuário',
        tipo: dados.tipo,        
        texto: dados.texto,
        }
    );    
    console.log('propostaVoto=',propostaVoto);
    try {
        const propostaVotoCadastrada = await propostaVoto.save();
        res.status(200).json(propostaVotoCadastrada)
    } catch (err) {
        res.status(500).json(err);
    }
})


router.get('/propostavotos/:proposta_id', (req, res) => {
    res.setHeader("Access-Control-Allow-Origin", "*");
    console.log('votos:: _id req.params.proposta_id =' + req.params.proposta_id);
    PropostasVoto.find({ id_proposta: req.params.proposta_id }).then((propostasVoto) => {                    
        res.status(200).json(propostasVoto)
        }).catch((error) => {
            res.status(500).send(error);
        })        
    })  

router.post('/statusvoto', async (req, res) => {
    let dados = req.body;
    console.log('/update req.body: ',req.body)
    console.log('dados.id_proposta: ',dados.id_proposta)    
try {
    // Update the first document that matches the filter
    const result = await Propostas.updateOne({ "_id": dados.id_proposta }, {
            $inc: { supports: 1}
        })
        console.log(' ok ',result)    
        res.status(200).json(result);
    } catch (err) {
        res.status(500).json(err);
    }
})

router.post('/status', async (req, res) => {
    let dados = req.body;
    console.log('/update req.body: ',req.body);
    console.log('dados.id_proposta: ',dados.id_proposta)
    console.log('dados.estado: ',dados.estado);

    try {

    // Update the first document that matches the filter
    const result = await Propostas.updateOne({ "_id": dados.id_proposta }, {
            $set: { "estado": dados.estado }
            })
        console.log(' ok ',result)    
        res.status(200).json(result);
    } catch (err) {
        res.status(500).json(err);
    }
})

router.post('/comments', async (req, res) => {
    let dados = req.body;
    console.log('/update req.body: ',req.body);
    console.log('dados.id_proposta: ',dados.id_proposta)
    console.log('dados.estado: ',dados.estado);

    try {

    // Update the first document that matches the filter
    const result = await Propostas.updateOne({ "_id": dados.id_proposta }, {
            $inc: { comments: 1}
        })
        console.log(' ok ',result)    
        res.status(200).json(result);
    } catch (err) {
        res.status(500).json(err);
    }
})

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
       if (evento === '4') { escopo = 'cppd'}

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
