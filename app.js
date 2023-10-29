
const express = require('express');
const app = express();
const mongoose = require('mongoose');
const bodyParser = require('body-parser');

const cors = require('cors');

const Users = require('./model/user');

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
//Body Parser
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());


const indexRoute = require('./Routes/index')
const usersRoute = require('./Routes/users')
//const fileRoute = require('./Routes/file');
const mensagemRoute = require('./Routes/mensagens');
const temaRoute = require('./Routes/temas');
const propostasRoute = require('./Routes/propostas');
const propostaComentariosRoute = require('./Routes/propostacomentarios');
const numerosRoute = require('./Routes/numeros');
const reunioesRoute = require('./Routes/reunioes')

//const { collapseTextChangeRangesAcrossMultipleVersions } = require('typescript');

//----------------------------------------------------
// const readline = require('readline');
// const fs = require('fs');
// const readable = fs.createReadStream('arquivocsvlittle.csv');

// const rl = readline.createInterface({
//     input: readable,
//    // output: process.stdout
// })

// rl.on('line', (line) => {
//    console.log(' ', line.toUpperCase())
// })
//----------------------------------------------------


//Mongoose
 //const url = 'mongodb://localhost:27017/?readPreference=primary&directConnection=true&ssl=false';
 //const options = { reconnectTries: Number.MAX_VALUE, reconnectInterval: 500, pooSize: 5, useNewUrlParser: true}
 //mongoose.connect(url, options);
 //mongoose.set('useCreateIndex', true)

//  mongoose.connect(
//     'mongodb://db/http_app', 
//     {useNewUrlParser: true, useUnifiedTopology: true }); 


    mongoose.connect(
        'mongodb://127.0.0.1:27017/http_app', 
        {useNewUrlParser: true, useUnifiedTopology: true }); 

    // mongoose.connect(
    //     'mongodb://db/http_app', 
    //     {useNewUrlParser: true, useUnifiedTopology: true }); 

// async function main() {
//     await mongoose.connect('mongodb://127.0.0.1:27017/test');
  
//     // use `await mongoose.connect('mongodb://user:password@127.0.0.1:27017/test');` if your database has auth enabled
//   }
 
//app.use(bodyParser.json);
// app.use(bodyParser.json());
// app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/', indexRoute);
app.use('/users', usersRoute);
//app.use('/file', fileRoute);
app.use('/mensagens', mensagemRoute);
app.use('/temas', temaRoute);
app.use('/propostas', propostasRoute);
app.use('/propostacomentarios', propostaComentariosRoute);
app.use('/numeros', numerosRoute);
app.use('/reunioes', reunioesRoute)

app.listen(4040, () => console.log("Server is running - port 4040"));

module.exports = app;