
const express = require('express');
const app = express();
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');
const Users = require('./model/user');

require('dotenv').config();

console.log('mmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmm');

mongoose.connection.on('error', (err) => {
    console.log('Erro na conexão com o banco de dados: ', err);
})
mongoose.connection.on('disconnect', () => {
    console.log('Aplicação desconectada do banco de dados!')
})
mongoose.connection.on('connected', () => {
    console.log('Aplicação conectada ao banco de dados!')
})

app.use(cors());


app.use(express.json());
app.use(bodyParser.json({ limit: "50mb" }));
app.use(bodyParser.urlencoded({ limit: "50mb", extended: true, parameterLimit: 50000 }))
//Body Parser
// app.use(bodyParser.urlencoded({ extended: false }));
// app.use(bodyParser.json());

// app.use(express.bodyParser({limit: '50mb'}));
// app.use(express.json());

// app.use(express.json({limit: '50mb'}));
// app.use(express.urlencoded({limit: '50mb'}));

const indexRoute = require('./Routes/index')
const usersRoute = require('./Routes/users')
const mensagemRoute = require('./Routes/mensagens');
const temaRoute = require('./Routes/temas');
const propostasRoute = require('./Routes/propostas');
const propostaComentariosRoute = require('./Routes/propostacomentarios');
const propostaModeracaoRoute = require('./Routes/propostamoderacao');
const moderacaoRoute = require('./Routes/moderacoes');
const numerosRoute = require('./Routes/numeros');
const reunioesRoute = require('./Routes/reunioes');
const estatisticasRoute = require('./Routes/estatisticas');
const apimatomoRoute = require('./Routes/apismatomo');

//  mongoose.connect(
//     'mongodb://db/http_app', 
//     {useNewUrlParser: true, useUnifiedTopology: true }); 

    mongoose.connect(
        'mongodb://127.0.0.1:27017/http_app', 
        {useNewUrlParser: true, useUnifiedTopology: true }); 

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/', indexRoute);
app.use('/users', usersRoute);
app.use('/mensagens', mensagemRoute);
app.use('/temas', temaRoute);
app.use('/propostas', propostasRoute);
app.use('/propostacomentarios', propostaComentariosRoute);
app.use('/propostamoderacao', propostaModeracaoRoute);
app.use('/moderacoes', moderacaoRoute);
app.use('/numeros', numerosRoute);
app.use('/reunioes', reunioesRoute);
app.use('/estatisticas', estatisticasRoute);
app.use('/apimatomo', apimatomoRoute);

app.listen(4040, () => console.log("Server is running - port 4040"));

module.exports = app;
