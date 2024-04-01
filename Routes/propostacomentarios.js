const express = require('express');
const router = express.Router();
const PropostaComentarios = require('../model/propostaComentario');
const { ObjectId } = require('mongodb');

router.get('/', async (req, res) => {
 //   res.setHeader("Access-Control-Allow-Origin", "*");        
    try {
        const propostaComentarios = await PropostaComentarios.find({}).limit(1000);
        res.status(200).json(propostaComentarios)
    } catch (err) {
        res.status(500).json(err);
    }
})

router.get('/total', async (req, res) => {
    res.setHeader("Access-Control-Allow-Origin", "*");    
    try {
        const propostaComentarios = await PropostaComentarios.find({}).count();
        res.status(200).json(propostaComentarios)
    } catch (err) {
        res.status(500).json(err);
    }
})

router.get('/proposta/:proposta_id', (req, res) => {
    res.setHeader("Access-Control-Allow-Origin", "*");
    console.log('req.params.proposta_id =' + req.params.proposta_id);
    if (req.params.proposta_id.length > 4) {
        let id = '/' + req.params.proposta_id + '/';
            PropostaComentarios.find({ root_commentable_url:  { $regex: req.params.proposta_id }}).then((propostas) => {
                    //res.send(propostas);
                    res.status(200).json(propostas)
                }).catch((error) => {
                    res.status(500).send(error);
                })        
        }

    })

    router.get('/propostaid/:proposta_id', (req, res) => {
        res.setHeader("Access-Control-Allow-Origin", "*");
        console.log('_id req.params.proposta_id =' + req.params.proposta_id);
        if (req.params.proposta_id.length > 4) {
            let id = '/' + req.params.proposta_id + '/';
                // PropostaComentarios.find({ root_commentable_url:  { $regex: req.params.proposta_id }}).then((propostas) => {
                PropostaComentarios.find({ id_proposta: req.params.proposta_id }).then((propostas) => {                    
                        //res.send(propostas);
                        res.status(200).json(propostas)
                    }).catch((error) => {
                        res.status(500).send(error);
                    })        
            }
        })    

router.get('/deate/:de/:ate', async (req, res) => {
    res.setHeader("Access-Control-Allow-Origin", "*");        
    let de = req.params.de;
    let ate = req.params.ate;    
    // if (ate <= de) { ate = de }
    console.log('deate ', de, ' ',ate)

    try {
        const propostaComentarios = await PropostaComentarios.find({}).skip(de).limit(ate);
        res.status(200).json(propostaComentarios)
    } catch (err) {
        res.status(500).json(err);
    }
})

router.get('/:id', (req, res) => {
    res.setHeader("Access-Control-Allow-Origin", "*");
    console.log('req.params.id =' + req.params.id)
        PropostaComentarios.findById(req.params.id).then((propostaComentario) => {
            console.log(propostaComentario)
            res.send(propostaComentario);
        }).catch((error) => {
            res.status(500).send(error);
        })
    })

router.get('/id/:id', (req, res) => {
    res.setHeader("Access-Control-Allow-Origin", "*");
    console.log('req.params.id =' + req.params.id)
        PropostaComentarios.find({id: req.params.id}).then((propostaComentario) => {
            res.send(propostaComentario);
        }).catch((error) => {
            res.status(500).send(error);
        })
    })

    router.post('/create', async (req, res) => {
        let dados = req.body;
        console.log('dados: ',dados)
        let propostaComentario = new PropostaComentarios(
            dados 
        );    
        try {
            const propostaComentarioCadastrado = await propostaComentario.save();
            // usuarioCadastrado.password = undefined
            res.status(200).json(propostaComentarioCadastrado)
        } catch (err) {
            res.status(500).json(err);
        }
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
