//Carregando módulos

const express = require('express');
const handlebars = require('express-handlebars');
const bodyparser = require('body-parser');
const app = express();
const path = require('path');
const admin = require('./routes/admin');


//const mongoose = require('mongoose');

//Configurações
//body parser
app.use(bodyparser.urlencoded({ extended: true }));
app.use(bodyparser.json());

//Handlebars
app.engine('handlebars', handlebars({ defaultLayout: 'main' }));
app.set('view engine', 'handlebars');

//mongoose
//em breve

//public
app.use(express.static(path.join(__dirname, 'public')));

//Rotas
app.get('/', (req, res) => {
    res.send('Rota Principal!')
});

app.get('/posts', (req, res) => {
    res.send('Lista Posts')
})

app.use('/admin', admin);

//Outros
const port = 8081
app.listen(port, () => {
    console.log("Servidor rodando!");
})