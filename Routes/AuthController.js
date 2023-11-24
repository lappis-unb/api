const UserModel = require('../models/UserModel');
var LogInOutModel = require("../models/LogInOutModel");

const bcrypt = require('bcryptjs');
const consts = require('../consts');
const jwt = require('jsonwebtoken');
const crypto = require('crypto');
const nodemailer = require('nodemailer');
const hbs = require('nodemailer-express-handlebars');

module.exports = {
    register: async function(req, res) {
        try {
            let u = await UserModel.findOne({email: req.body.email});
            if (!u) {
                const user = new UserModel(req.body);
                user.password = bcrypt.hashSync(req.body.password, consts.bcryptSalts);
                await user.save();
                delete user.password;
                res.status(200).json(user);
            }
            else {
                await UserModel.findByIdAndUpdate(u._id, {
                    '$set': {
                        firstname: req.body.firstname,
                        lastname: req.body.lastname,
                        address: req.body.address,
                        city: req.body.city,
                        state: req.body.state,
                        phone: req.body.phone,
                        mobilephone: req.body.mobilephone,
                        password: bcrypt.hashSync(req.body.password, consts.bcryptSalts)
                    }
                
                });
                let user = await UserModel.findById(u._id);
                delete user.password;
                res.status(200).json(user);
                //res.status(403).json({message: 'Email already registered', error: {}});
            }
        }
        catch(e) {
            res.status(500).json({message: 'Erro ao salvar dados do usuário.', error: e});
        }
    },

    login: function(req, res) {
        //console.log('login -req = ', req.body); 

        const password = req.body.password;
        const email = req.body.email;

        UserModel.findOne({email: email}).lean().exec(function(err, user) {
            if(err) {
                return res.status(500).json({
                    message: 'Erro no servidor.', error: err });
            }
            const auth_err = (password == '' || password == null || !user);

            if (!auth_err) {
                if (bcrypt.compareSync(password, user.password)) {
                    let token = jwt.sign({_id: user._id}, consts.keyJWT,{expiresIn: consts.expiresJWT});
                    delete user.password;

                    let log = new LogInOutModel({
                        id_user: user._id,
                        email : user.email,
                        tipo : 1,
                        data : new Date() 
                    }); 
                    log.save();

                    return res.json({...user, token: token});
                }
            }
            return res.status(404).json({
                message: 'e-mail ou senha incorretos.' })
        })
    },

    logout: function(req, res) {
        //console.log('logout -req = ', req.body);     
        const id_usuario = req.body.id;
        const email = req.body.email;

        let log = new LogInOutModel({
            id_user: id_usuario,
            email : email,
            tipo : 2,
            data : new Date() 
        }); 
        log.save();
        return res.json({ok: 1});
    },

    check_token: function(req, res, next) {
        const token = req.get('Authorization');

        //console.log('* Autorization token=', token)

        if (!token) {
            return res.status(401).json({message: 'Token inválido'});
        }
        jwt.verify(token, consts.keyJWT, 
            (err, decoded) => {
                if (err || !decoded) {
                    return res.status(401)
                        .json({message: 'Token inválido. Erro na autenticação.'});
                }
                next();
            }) 
    },

    user_data: function(req, res) {
        const token = req.get('Authorization');
        jwt.verify(token, consts.keyJWT, 
            (err, decoded) => {
                const id = decoded._id;
                UserModel.findById(id).lean().exec(function(err, user) {
                    if (err || !user) {
                        return res.status(500).json({
                            message: 'Erro na busca aos dados do usuário.', error: err})
                    }
                    let token = jwt.sign({_id: user._id}, consts.keyJWT,{expiresIn: consts.expiresJWT});
                    delete user.password;                        
                    return res.json({...user, token: token});
                });
            });
    },
 
    forgot_password: async function(req, res) {

        //console.log('forgot_password - body=', req.body);
        //console.log('email:', req.body.email);
        //{email: req.body.email}
        email = req.body.email; //'jcangst@terra.com.br';
        //let email="jcangst@terra.com.br";
        //console.log('* forgot_password: req.body.email -- ', email);

        try {
            let u = await UserModel.findOne({email: email});
            if (!u) {
                console.log('u=', u);
                return res.status(400).send({ error: 'Usuário não encontrado.'});
            }
            console.log('u=', u);            

            const token = crypto.randomBytes(20).toString('hex');
            const now = new Date();
            now.setHours(now.getHours() + 1);

            await UserModel.findByIdAndUpdate(u._id, {
                '$set': {
                    passwordResetToken: token,
                    passwordResetExpires: now
                }
            });

            console.log(token, now, ' '); //,res); 
            res.status(200).json({...u});
            //return res.json({...u});

            /*else {
                console.log('return res.json({...u});', u);
                return res.json({...u});
                
            } */
        }
        catch(e) {

            res.status(500).json({message: 'Erro no envio do e-mail-Alteração de Senha', error: e});
        }
    },

    send_email: async function(req, res) { 

        const destinatario = req.body.email;
        //console.log('send_email - transporter.sendMail', req.body.email, ' destinatário: ', destinatario)

        var token = "";
        var now = ""

        try {
            let u = await UserModel.findOne({email: email});
            if (!u) {
                console.log('u=', u);
                return res.status(400).send({ error: 'Usuário não encontrado'});
            }
            token = crypto.randomBytes(20).toString('hex');
            now = new Date();
            now.setHours(now.getHours() + 1);
            await UserModel.findByIdAndUpdate(u._id, {
                '$set': {
                    passwordResetToken: token,
                    passwordResetExpires: now
                }
            });
        }
        catch(e) {
            res.status(500).json({message: 'Erro no envio do e-mail - Alteração de Senha', error: e});
        }


  
/*        const user = "jcangst@terra.com.br";
        const pass ="0155";

        const transporter = nodemailer.createTransport({
            host: 'smtp.terra.com.br',
            port: 587,
            auth: {user, pass}
        })  */

        const user = "edireitonetsender@terra.com.br";
        const pass ="edireito2021";

        const transporter = nodemailer.createTransport({
            host: 'smtp.terra.com.br',
            port: 587,
            auth: {user, pass}
        })  




        //"host": "smtp.live.com",         
        //"port": 25 ou 465
        //"user": edireitonet_sender@hotmail.com,
        //"pass": edireito2021

/*        const user = "edireitonet_sender@hotmail.com";
        const pass ="edireito2021";
        const transporter = nodemailer.createTransport({
            host: 'smtp.live.com',
            port: 587,
            auth: {user, pass}
        })  */


        //Servidor SMTP: smtp.gmail.com
        //Usuário SMTP: edireitonetsender@gmail.com
        //Senha SMTP: edireito2021
        //Porta SMTP: 587
        //TLS/SSL: requeridos.

/*        const user = "edireitonetsender@gmail.com";
        const pass ="edireito2021";
        const transporter = nodemailer.createTransport({
            host: 'smtp.gmail.com',
            port: 587,
            auth: {user, pass}
        })   */

        console.log('transporter.sendMail - senha')
    
        transporter.sendMail({
            from: user,
            to: destinatario, //user,
            subject: "Digimecum - Alteração de Senha", 
            //text: "Prezado Usuário, para alterar sua senha de acesso ao Digimecum, utilize o seguinte código/token <b>" + token +"</b>", // + " (expira em : " + now + ")",
            html: "Prezado Usuário(a), para alterar sua senha de acesso ao Digimecum, utilize o seguinte código/token: <b>" + token +"</b>",
        }).then(info => {
            console.log('info=', info)
            res.send(info)
        }).catch(error => {
            console.log('error=', error)
            res.send(error)
        }) 
    },

    welcome: async function(req, res) { 

        const destinatario = req.body.email;

/*        const user = "jcangst@terra.com.br";
        const pass ="0155";

        const transporter = nodemailer.createTransport({
            host: 'smtp.terra.com.br',
            port: 587,
            auth: {user, pass}
        })  */

        const user = "edireitonetsender@terra.com.br";
        const pass ="edireito2021";

        const transporter = nodemailer.createTransport({
            host: 'smtp.terra.com.br',
            port: 587,
            auth: {user, pass}
        })         

        //console.log('send_email - transporter.sendMail', req.body.email, ' destinatário: ', destinatario)

/*        const user = "edireitonet_sender@hotmail.com";
        const pass ="edireito2021";
        const transporter = nodemailer.createTransport({
            host: 'smtp.live.com',
            port: 587,
            auth: {user, pass}
        })  */

/*        const user = "edireitonetsender@gmail.com";
        const pass ="edireito2021";
        const transporter = nodemailer.createTransport({
            host: 'smtp.gmail.com',
            port: 587,
            auth: {user, pass}
        })         */

        console.log('transporter.sendMail - welcome')
    
        await transporter.sendMail({
            from: user,
            to: destinatario, //user,
            subject: "Seja bem-vindo(a) ao DigiMecum!", 
            //text: "Prezado Usuário, para alterar sua senha de acesso ao Digimecum, utilize o seguinte código/token <b>token</b>", // + " (expira em : " + now + ")",
            html: "Olá, seja bem-vindo(a) ao DigiMecum!<br>"
                + "<br> Para nós, é uma satisfação enorme tê-lo(a) como usuário(a). Esperamos que essa ferramenta seja útil para o seu dia a dia, seja na universidade, seja a trabalho ou ainda durante a sua preparação para a OAB ou um concurso público. Para começar a utilizar, basta acessar o site <b><a href='http://www.digimecum.com'>http://www.digimecum.com</a></b> e informar seus dados de acesso.<br>"
                + "<br>Caso tenha alguma dúvida, entre agora mesmo em contato conosco, o que deve ser feito pelo link <b><a href='http://www.edireito.net/contato.html'>http://www.edireito.net/contato.html</b><br>"
                + "<br>ATENÇÃO: considerando que este é um e-mail automático, solicitamos a gentileza de não o responder, pois não será visualizado pela nossa equipe. Qualquer contato deve ser feito por meio do nosso site, acima indicado.<br>"
                + "<br>Agradecemos pela confiança!<br>"
                + "<br>Equipe eDireito.net"
                + "<br><a href='www.edireito.net'>www.edireito.net</a>"
                + "<br><a href='www.digimecum.com'>www.digimecum.com</a>",
        }).then(info => {
            console.log('info=', info)
            res.send(info)
        }).catch(error => {
            console.log('error ', error)
            res.send(error)
        }) 
    },


    reset_password: async function(req, res) {
        //console.log('reset_password: req.body -- ', req.body);
        const token = req.body.token;
        const password = req.body.password;
        const email = req.body.email;

        try {
            let user = await UserModel.findOne({email: email}); //.lean().exec(function(err, user) {

                console.log('user=',user)
                if(!user) {
                    return res.status(500).json({
                        message: 'Erro no servidor.', error: err });
                }
                let auth_err = (password == '' || password == null || !user);

                if (token !== user.passwordResetToken) {
                    auth_err = false 
                    //console.log('O código/token informado ', email);
                    return res.status(400).send({ error: 'O código/token informado é diferente do enviado ao seu e-mail.'}); }
             
                const now = new Date();
                if (now > user.passwordResetExpires) {
                        auth_err = false 
                        //console.log('Token expired, generate a new one ', email);
                        return res.status(400).send({ error: 'Código/Token expirou, solicite novamente.'});	 }                
    
                if (!auth_err) {
                    user.password = bcrypt.hashSync(password, consts.bcryptSalts);
                    await user.save();
                    delete user.password;
                    return res.status(200).json(user);
                }
                return res.status(404).json({
                    message: 'Código/token - senha incorretos.' })            
        }
        catch(e) {
            res.status(500).json({message: 'Erro ao alterar a senha, tente novamente.', error: e});
        }


     /*   try {
            let u = await UserModel.findOne({email: email});
            if (!u) {
                console.log('User not found ', email);
                return res.status(400).send({ error: 'User not found'});
            }
            else {
                if (token !== user.passwordResetToken) 
                   { console.log('Token invalid ', email);
                    return res.status(400).send({ error: 'Token invalid'}); }
             
                const now = new Date();
                if (now > user.passwordResetExpires)
                        { console.log('Token expired, generate a new one ', email);
                        return res.status(400).send({ error: 'Token expired, generate a new one'});	 }
                    
                //user.password = password; atualiza a senha 
                user.password = bcrypt.hashSync(req.body.password, consts.bcryptSalts);

                console.log('before - await user.save();', user)
                await user.save();

                console.log('await user.save();', user)

                delete user.password;
                res.status(200).json(user);

            }
        }
        catch(e) {
            res.status(500).json({message: 'Error on reset password, try again', error: e});
        } */
    },

}