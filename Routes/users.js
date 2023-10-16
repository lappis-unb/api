const express = require('express');
const router = express.Router();
const Users = require('../model/user');
const bcrypt = require('bcrypt');
const { ObjectId } = require('mongodb');

router.get('/', async (req, res) => {
    res.setHeader("Access-Control-Allow-Origin", "*");        
    try {
        const usuariosCadastrados = await Users.find({}).skip(0).limit(10);
        res.status(200).json(usuariosCadastrados)
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
        const usuariosCadastrados = await Users.find({}).skip(de).limit(ate);
        res.status(200).json(usuariosCadastrados)
    } catch (err) {
        res.status(500).json(err);
    }
})


router.get('/total', async (req, res) => {
    res.setHeader("Access-Control-Allow-Origin", "*");    
    try {
        const usuariosCadastrados = await Users.find({}).count();
        res.status(200).json(usuariosCadastrados)
    } catch (err) {
        res.status(500).json(err);
    }
})

router.get('/:id', (req, res) => {
    res.setHeader("Access-Control-Allow-Origin", "*");
    console.log('req.params.id =' + req.params.id)
        Users.findById(req.params.id).then((usu) => {
            res.send(usu);
        }).catch((error) => {
            res.status(500).send(error);
        })
    })

router.get('/email/:email', (req, res) => {
    res.setHeader("Access-Control-Allow-Origin", "*");
    console.log('req.params.email =' + req.params.email)
        Users.find({email: req.params.email}).then((usu) => {
            res.send(usu);
        }).catch((error) => {
            res.status(500).send(error);
        })
    })

router.post('/create', async (req, res) => {
    let user = new Users({
        email: req.body.email,  
        password : req.body.password 
    });    
    try {
        const usuarioCadastrado = await user.save();
        usuarioCadastrado.password = undefined
        res.status(200).json(usuarioCadastrado)
    } catch (err) {
        res.status(500).json(err);
    }
})

router.post('/auth', async (req, res) => {
    console.log('/auth', req.body)
    const {email, password} = req.body;
    if (!email || !password) return res.send({ error: 'Dados Insuficientes!'});

    try {
        console.log(email, password);

        const usuarioCadastrado = await Users.findOne({email}); //.select(+password);

        console.log('uC: ', usuarioCadastrado);
            
        bcrypt.compare(password, usuarioCadastrado.password, (err, same) => {
            if (!same) return res.send({ error: 'Erro ao autenticar usuário!'});
            return res.send(usuarioCadastrado);
        });

    } catch (err) {
        res.status(500).json(err);
    }    
})

module.exports = router;
