var express = require('express');
var router = express.Router();
var Usuario = require('../model/usuario');
var sha256 = require('js-sha256');

router.post('/', function(req, res) {
    console.log('chegou aqui: ', req.body)
    let senhaString = sha256(req.body.senha)
    let pwd = req.body.senha
    console.log('senhaString=' + pwd + ' ' + senhaString)
   let u = new Usuario({ 
       nome: req.body.nome,
       email: req.body.email,
       cpf: req.body.cpf,
       endereco: req.body.endereco,
       senha: senhaString,
       data: Date(),
       destacados: req.body.destacados });
//console.log('Chegou aqui.')       
   u.save((err, usu) => {
        console.log(err)
        if (err)
            res.status(500).send(err);
        else
            res.status(200).send(usu);
   })
   console.log('Chegou aqui.' + u + ')') 
})

router.get('/', function(req, res) {

    Usuario.find().exec((err, usus) => {
         if (err)
             res.status(500).send(err);
         else
            console.log(usus);
             res.status(200).send(usus);
    })
})

router.get('/:id', (req, res) => {
    console.log('req.params.id =' + req.params.id)
    Usuario.find(objectId(req.params.id), (err, usu) => {
    //Tema.findById(req.params.id, (err, tem) => {
        if(err)
            res.status(500).send(err);
        else    
            console.log('usu = ' + usu);
            res.status(200).send(usu);        
    })
})  

router.get('/cpf/:cpf', function(req, res) {
    console.log('req.params.cpf =' + req.params.cpf)
    //Artigo.find({cpf: req.params.cpf}, (err, art) => {
    Usuario.find({cpf: req.params.cpf}).exec((err, usus) => {
         if (err)
             res.status(500).send(err);
         else
            console.log(usus);
             res.status(200).send(usus);
    })
})

router.get('/id/:id/cpf/:cpf', function(req, res) {
    console.log('(1)req.params.id =' + req.params.cpf)
    console.log('(2)req.params.cpf =' + req.params.cpf)
    //Artigo.find({cpf: req.params.cpf}, (err, art) => {
    Usuario.find({_id: req.params.id},{cpf: req.params.cpf}).exec((err, usus) => {
         if (err)
             res.status(500).send(err);
         else
            console.log(usus);
             res.status(200).send(usus);
    })
})


router.delete('/:id', (req, res) => {
    console.log(req.body);
    Usuario.deleteOne({_id: req.params.id}, (err) => {
        if(err)
            res.status(500).send(err);
        else    
            res.status(200).send({});
    })
})

router.patch('/:id', (req, res) => {
    console.log(req.body)
    Usuario.findById(req.params.id, (err, usu) => {
        if (err)
            res.status(500).send(err);
        else if (!usu)
            res.status(404).send({});
        else {
            usu.nome = req.body.nome;
            usu.email = req.body.email;
            usu.cpf = req.body.cpf;
            usu.endereco = req.body.endereco;
            usu.senha = req.body.senha;
            usu.data = Date();
            usu.destacados = req.body.destacados;
            usu.save()
                .then((u) => res.status(200).send(u))
                .catch((e) => res.status(500).send(e));
        }
    })
})

module.exports = router;