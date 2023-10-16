const express = require('express');
const router = express.Router();
const Mensagens = require('../model/mensagem');
const JWT = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const { ObjectId } = require('mongodb');

router.get('/', async (req, res) => {
    res.setHeader("Access-Control-Allow-Origin", "*");              
    try {
        const mensagens = await Mensagens.find({});
        res.status(200).json(mensagens)
        console.log(mensagens)
    } catch (err) {
        res.status(500).json(err);
    }
})

router.get('/total', async (req, res) => {
    res.setHeader("Access-Control-Allow-Origin", "*");    
    try {
        const mensagens = await Mensagens.find({}).count();
        res.status(200).json(mensagens)
    } catch (err) {
        res.status(500).json(err);
    }
})

router.get('/template/:template', (req, res) => {
    res.setHeader("Access-Control-Allow-Origin", "*");
    console.log('req.params.template =' + req.params.template)
        Mensagens.find({template: req.params.template}).then((mensagem) => {
            console.log(mensagem)
            res.send(mensagem);
        }).catch((error) => {
            res.status(500).send(error);
        })
    })

router.post('/create', async (req, res) => {
    let mensagem = new Mensagens({
        template: req.body.template, 
        assunto: req.body.assunto,
        texto: req.body.texto,
        tipo: req.body.tipo
    });    
    try {
        const mensagemCadastrada = await mensagem.save();
        // usuarioCadastrado.password = undefined
        res.status(200).json(mensagemCadastrada)
    } catch (err) {
        res.status(500).json(err);
    }
})

router.get('/token/:token', (req, res) => {
    res.setHeader("Access-Control-Allow-Origin", "*");
    console.log('req.body.template =' + req.body.template)
    console.log('req.body.secretKey =' + req.body.secretKey)    
    const template = req.body.template
    const secretKey = req.body.secretKey
    //------------------------------------------  Gerando o token  //
    const secret = new TextEncoder().encode(secretKey);    
    const payload = { iss: template };
    const options = { algorithm: 'HS256' };

    JWT.sign(payload, secret, options, 
        function(err, token_jsonwebtoken) {
            if(err) {
                res.status(500).send(err);
                // throw new (Error('ERR_INVALID_TOKEN'));
            }
            let token = token_jsonwebtoken;
            console.log('token_jsonwebtoken ',token_jsonwebtoken);
            console.log('token ',token);
            res.send(token);
        })      
    })

router.post('/arquivow', (req, res) => {
    res.setHeader("Access-Control-Allow-Origin", "*");    

    console.log('/arquivow -> Chegou aqui ', req.body)    
    var participantes = req.body; 
    // [
    //     {
    //       nome: 'ef4e1afa-94b0-451a-9170-79fe1c1cf484',
    //       cpf: '8c209f43-0f3d-46a3-a054-f6d7c3bd2915',
    //       email: '8c209f43-0f3d-46a3-a054-f6d7c3bd2915'
    //     },
    //     {
    //       nome: 'ef4e1afa-94b0-451a-9170-79fe1c1cf484',
    //       cpf: '8c209f43-0f3d-46a3-a054-f6d7c3bd2915',
    //       email: '8c209f43-0f3d-46a3-a054-f6d7c3bd2915'
    //     }
    //   ]
    
    console.log('participantes', participantes)    

        console.log('GravarArquivo - estou aqui !')
        const fs = require('fs');
        arquivoDestino = "C:\\Projetos\\ArquivoRW.txt"        

        // {participantes.forEach((participante) function {
        //     fs.appendFile(arquivoDestino, 
        //         participante.cpf + ';' + participante.nome + ';' + participante.email + "\n", function(erro) {
        //             if(erro) {
        //                 throw erro;
        //             }})
        //         })
        // ;}

        // {participantes.map((participante) => (
        //   fs.appendFile(arquivoDestino, 
        //   participante.cpf + ';' + participante.nome + ';' + participante.email + "\n", function(erro) {
        //       if(erro) {
        //           throw erro;
        //       }})))
        // }

            fs.appendFile(arquivoDestino, 
            participantes.cpf + ';' + participantes.nome + ';' + participantes.email + "\n", function(erro) {
                if(erro) {
                    throw erro;
                }})
   
        res.sendStatus(200)

    // fs.writeFileSync('arquivo.txt', data);
    // console.log('data=',data);
    // res.send(data);

})    

router.get('/arquivor', (req, res) => {
    res.setHeader("Access-Control-Allow-Origin", "*");    

    console.log('/arquivor -> Chegou aqui ')    
    console.log('LerArquivo - estou aqui !')
    const fs = require('fs');
    arquivoDestino = "C:\\Projetos\\ArquivoRW.txt"        
        fs.readFile(arquivoDestino, function(err, data) {
            if(!err) {
            console.log(data.toString);
            res.send(data);
            }
        })
}) 

router.get('/:id', (req, res) => {
    res.setHeader("Access-Control-Allow-Origin", "*");
    console.log('req.params.id =' + req.params.id)
        Mensagens.findById(req.params.id).then((mensagem) => {
            res.send(mensagem);
        }).catch((error) => {
            res.status(500).send(error);
        })
    })


// router.post('/auth', async (req, res) => {
//     console.log('/auth', req.body)
//     const {email, password} = req.body;
//     if (!email || !password) return res.send({ error: 'Dados Insuficientes!'});

//     try {
//         console.log(email, password);

//         const usuarioCadastrado = await Users.findOne({email}); //.select(+password);

//         console.log('uC: ', usuarioCadastrado);
            
//         bcrypt.compare(password, usuarioCadastrado.password, (err, same) => {
//             if (!same) return res.send({ error: 'Erro ao autenticar usuário!'});
//             return res.send(usuarioCadastrado);
//         });

//     } catch (err) {
//         res.status(500).json(err);
//     }    
// })

module.exports = router;
