const jwt = require('jsonwebtoken');
//const config = require('../config/config');
const JWT_PASS = process.env.JWT_PASS;

const auth = (req, res, next) => {
    const token_header = req.headers.auth;
    if(!token_header) return res.status(401).send({ error: 'Token não enviado!' });

    res.locals.auth_data = '';
    jwt.verify(token_header, JWT_PASS, (err, decoded) => {
        if (err) return res.status(401).send({ error: 'Token inválido!' });
        res.locals.auth_data = decoded;
        return next();
    });
}

module.exports = auth;



// const jwt = require('jsonwebtoken'); 
// const config = require('../config/config');
// //require('dotenv').config();

// //# Configurações da API do Matomo
// //const JWT_PASS = process.env.JWT_PASS; 

// const auth = (req, res, next) => {      
//     const token_header = req.headers.auth;

//     console.log(' token=',token_header)

//     if(!token_header) return res.status(401).send({ error: 'Token não enviado!' });

//     jwt.verify(token_header, 'batatafrita', (err, decoded) => {
//         if (err) return res.status(401).send({ error: 'Token inválido!' });
//         res.locals.auth_data = decoded;
//         return next();
//     });

//     //jwt.verify(token_header, config.jwt_pass, (err, decoded) => {
//     // jwt.verify(token_header, 'batatafrita', (err, decoded) => {        
//     //     if (err) return res.status(401).send({ error: 'Token inválido! '+err+' decoded='+decoded });
//     //     res.locals.auth_data = decoded;
//     //     return next();
//     // });
// }

// module.exports = auth;