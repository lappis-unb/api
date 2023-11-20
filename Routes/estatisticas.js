const express = require('express');
const router = express.Router();
const Estatisticas = require('../model/estatistica');
const { ObjectId } = require('mongodb');

router.get('/', async (req, res) => {
    res.setHeader("Access-Control-Allow-Origin", "*");        
    try {
        const estatisticas = await Estatisticas.find({});
        res.status(200).json(propostas)
    } catch (err) {
        res.status(500).json(err);
    }
})

router.post('/atualizar', async (req, res) => {
    res.setHeader("Access-Control-Allow-Origin", "*");        
    //console.log('>>> save() ', req.body); 
    // try{

        let estatistica = await Estatisticas.findOne({category_id: req.body.category_id});
        console.log('****',estatistica)
        //let estatistica = null;

      //  if (req.body.category_id.match(/^[0-9a-fA-F]{24}$/)) {
            // Yes, it's a valid ObjectId, proceed with `findById` call.

       //   estatistica = await Estatisticas.findById(estatistica._id);

      //  }
//console.log(estatistica);
        //let estatistica = await Estatisticas.findById(req.params.id)
        //let estatistica = await Estatisticas.find({'id': req.body.id})

          if (estatistica !== null) {
            console.log('estatistica-atualiza ',estatistica._id)
            estatistica.propostas = (estatistica?.propostas + 1);
            estatistica.supports = (estatistica.supports + req.body.supports);
            estatistica.followers = (estatistica.followers + req.body.followers);
            await estatistica.save((estatistica)); // => { res.status(200).send(estatistica)}) 
            res.status(200).send(estatistica);
           } 
           else 
           {
            console.log('>>> save() ', req.body.category_id); 
            let estatisticaNew = new Estatisticas({
                //_id : req.body.category_id, 
                id : req.body.category_id,
                category_id : req.body.category_id,
                category_name : req.body.category_name,
                participatory_space_id : req.body.participatory_space_id,
                participatory_space_url : req.body.participatory_space_url,
                data_num : req.body.data_num,
                propostas : 1,
                supports : req.body.supports,
                followers : req.body.followers,                
            })
        
            await estatisticaNew.save()        ; // => { res.status(200).send(estatistica)})             
            res.status(200).send(estatisticaNew);
           }
        // res.status(200).send(estatistica);
        
           
        // try {
        //     let tem = await Tema.findById(req.params.id)
        //         if (tem) {
        //             tem.numero = req.body.numero,
        //             tem.abrev = req.body.abrev,
        //             tem.nome = req.body.nome,
        //             tem.data = req.body.data,              
        //             tem.normas = req.body.normas,
        //             tem.imagem = req.body.imagem,     
        //             tem.save((tem)=>{
        //                 res.status(200).send(tem);
        //                 })
        //         }
        //     }
        // catch(e) {
        //     res.status(500).json({message: 'Error while patch>tema', error:e});
        // }
    


        // try {
            // const estatisticaFind = await Estatisticas.findOne({'category_id': req.body.category_id})

            // console.log('>>>Find ',estatisticaFind);  

            // if (estatisticaFind !== null) { 
            //     estatistica.propostas = (estatisticaFind.propostas + 1);
            //     estatistica.supports = (estatisticaFind.supports + req.body.supports);
            //     estatistica.followers = (estatisticaFind.followers + req.body.followers);

            //     estatistica.save(); //updateOne({_id: estatisticaFind._id}, {$set: { estatistica }} );

            //     console.log('<update()>',estatistica)


            //     }  
            // else {
            //     console.log('>>>Find início '); 
            //     estatistica.propostas = 1;
            //     estatistica.save();
            //     console.log('>>> save() ', estatistica); 
            // }

            // res.status(200).json(estatistica)

        // } catch (err) {
        //     res.status(500).json(err);
        // }            
            
    })

router.get('/total', async (req, res) => {
    res.setHeader("Access-Control-Allow-Origin", "*");    
    try {
        const estatisticas = await Estatisticas.find({}).count();
        res.status(200).json(estatisticas)
    } catch (err) {
        res.status(500).json(err);
    }
})

router.get('/categoria/:categoria', (req, res) => {
    res.setHeader("Access-Control-Allow-Origin", "*");
    console.log('req.params.categoria =' + req.params.categoria)
        Estatisticas.find({ category_id: req.params.categoria }).then((estatisticas) => {
            //res.send(propostas);
            res.status(200).json(estatisticas)
        }).catch((error) => {
            res.status(500).send(error);
        })
    })

router.get('/:id', (req, res) => {
    res.setHeader("Access-Control-Allow-Origin", "*");
    console.log('req.params.id =' + req.params.id)
        Estatisticas.findById(req.params.id).then((proposta) => {
            console.log(estatistica)
            res.send(estatistica);
        }).catch((error) => {
            res.status(500).send(error);
        })
    })

router.get('/id/:id', (req, res) => {
    res.setHeader("Access-Control-Allow-Origin", "*");
    console.log('req.params.id =' + req.params.id)
        Estatisticas.find({category_id: req.params.id}).then((estatistica) => {
            res.send(estatistica);
        }).catch((error) => {
            res.status(500).send(error);
        })
    })

router.post('/create', async (req, res) => {
    
    let estatistica = new Estatisticas({
        id: req.body.id,
        category_id: req.body.category_id,
        category_name: req.body.category_name,
        participatory_space_id: req.body.participatory_space_id,
        participatory_space_url: req.body.participatory_space_url,
        data_num: req.body.data_num,
        propostas: req.body.propostas,
        supports: req.body.supports,
        followers: req.body.followers,        
    });    
    try {
        const estatisticaCadastrada = await estatistica.save();
        // usuarioCadastrado.password = undefined
        res.status(200).json(estatisticaCadastrada)
    } catch (err) {
        res.status(500).json(err);
    }
})



module.exports = router;
