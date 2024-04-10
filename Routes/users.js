const express = require('express');
const router = express.Router();
const Users = require('../model/user');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { ObjectId } = require('mongodb');
const auth = require('../middlewares/auth')

//const config = require('../config/config');
const JWT_PASS = process.env.JWT_PASS;

//'batatafrita2019'

//FUNÇÕES AUXILIARES
const createUserToken = (userId) => {
    console.log('userId=',userId,' ','batatafrita2019', ' ', JWT_PASS)
    //return jwt.sign({ id: userId }, config.jwt_pass, { expiresIn: config.jwt_expires_in });
    return jwt.sign({ id: userId }, JWT_PASS, { expiresIn: '7d' });    
}

router.get('/', auth, async (req, res) => {
    console.log('res.locals.auth_data=', res.locals.auth_data)
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

// router.post('/create', async (req, res) => {
//     let user = new Users({
//         email: req.body.email,  
//         password : req.body.password 
//     });    
//     try {
//         const usuarioCadastrado = await user.save();
//         usuarioCadastrado.password = undefined
//         res.status(200).json(usuarioCadastrado)
//     } catch (err) {
//         res.status(500).json(err);
//     }
// })

router.post('/create', async (req, res) => {
    const { email, password } = req.body;
    if (!email || !password) return res.status(400).send({ error: 'Dados insuficientes!' });

    try {
        if (await Users.findOne({ email })) return res.status(400).send({ error: 'Usuário já registrado!'});

        const user = await Users.create(req.body);
        user.password = undefined;

        return res.status(201).send({user, token: createUserToken(user._id)});
    }
    catch (err) {
        return res.status(500).send({ error: 'Erro ao buscar usuário!' });
    }
});


// router.post('/auth', async (req, res) => {
//     console.log('/auth', req.body)
//     const {email, password} = req.body;
//     if (!email || !password) return res.send({ error: 'Dados Insuficientes!'});

//     try {
//         console.log(email, password);

//         const usuarioCadastrado = await Users.findOne({email}).select('+password');

//         // const user = await Users.findOne({ email }).select('+password');

//         console.log('uC: ', usuarioCadastrado);

//         // user.password = undefined;
//         // return res.send({ user, token: createUserToken(user.id) });
            
//         bcrypt.compare(password, usuarioCadastrado.password, (err, same) => {
//             if (!same) return res.send({ error: 'Erro ao autenticar usuário!'});
//             //return res.send(usuarioCadastrado);
//             return res.send({ usuarioCadastrado, token: createUserToken(usuarioCadastrado.id) });
//         });

//     } catch (err) {
//         res.status(500).json(err);
//     }    
// })

router.post('/auth', async (req, res) => {
    const { email, password } = req.body;

    if (!email || !password) return res.status(400).send({ error: 'Dados insuficientes!' });

    try {
        const user = await Users.findOne({ email }).select('+password');
        if (!user) return res.status(400).send({ error: 'Usuário não registrado!' });

        const pass_ok = await bcrypt.compare(password, user.password);

        if(!pass_ok) return res.status(401).send({ error: 'Erro ao autenticar usuário!' });

        user.password = undefined;
        return res.send({ user, token: createUserToken(user._id) });
    }
    catch (err) {
        return res.status(500).send({ error: 'Erro ao buscar usuário!' });
    }
});

module.exports = router;
