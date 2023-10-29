const express = require('express');
const router = express.Router();
const PropostaModeracao = require('../model/propostaModeracao')
const { ObjectId } = require('mongodb');

router.get('/', async (req, res) => {
 //   res.setHeader("Access-Control-Allow-Origin", "*");        
    try {
        const propostaModeracao = await PropostaModeracao.find({}).limit(1000);
        console.log('propostaModeracao=', propostaModeracao)
        res.status(200).json(propostaModeracao)
    } catch (err) {
        res.status(500).json(err);
    }
})

router.get('/total', async (req, res) => {
    res.setHeader("Access-Control-Allow-Origin", "*");    
    //console.log(req)
    try {
        const propostaModeracao = await PropostaModeracao.find({}).count();

        console.log('propostaModeracao=', propostaModeracao)

        res.status(200).json(propostaModeracao)
    } catch (err) {
        res.status(500).json(err);
    }
})

// router.get('/proposta/:proposta_id', (req, res) => {
//     res.setHeader("Access-Control-Allow-Origin", "*");
//     console.log('req.params.proposta_id =' + req.params.proposta_id);
//     if (req.params.proposta_id.length > 4) {
//         let id = '/' + req.params.proposta_id + '/';
//             PropostaComentarios.find({ root_commentable_url:  { $regex: req.params.proposta_id }}).then((propostas) => {
//                     //res.send(propostas);
//                     res.status(200).json(propostas)
//                 }).catch((error) => {
//                     res.status(500).send(error);
//                 })        
//         }

//     })

router.get('/deate/:de/:ate', async (req, res) => {
    res.setHeader("Access-Control-Allow-Origin", "*");        
    let de = req.params.de;
    let ate = req.params.ate;    
    // if (ate <= de) { ate = de }
    console.log('deate ', de, ' ',ate)

    try {
        const propostaModeracao = await PropostaModeracao.find({}).skip(de).limit(ate);
        res.status(200).json(propostaModeracao)
    } catch (err) {
        res.status(500).json(err);
    }
})

router.get('/:id', (req, res) => {
    res.setHeader("Access-Control-Allow-Origin", "*");
    console.log('req.params.id =' + req.params.id)
        PropostaModeracao.findById(req.params.id).then((propostaModeracao) => {
            console.log(propostaModeracao)
            res.send(propostaModeracao);
        }).catch((error) => {
            res.status(500).send(error);
        })
    })

router.get('/id/:id', (req, res) => {
    res.setHeader("Access-Control-Allow-Origin", "*");
    console.log('req.params.id =' + req.params.id)
        PropostaModeracao.find({id: req.params.id}).then((propostaModeracao) => {
            res.send(propostaModeracao);
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

module.exports = router;
