const express = require('express');
const app = express();
const handlebars = require('express-handlebars');
const bodyParser = require('body-parser');
const Post = require('./models/Posts');

//config
//tamplete engine
app.engine('handlebars', handlebars({ defaultLayout: 'main' }));
app.set('view engine', 'handlebars');

//Body Parser
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

//Rotas
app.get('/', function (req, res) {

    Post.findAll({ order: [['id', 'desc']] }).then(function (posts) {
        res.render('home', { posts: posts })
    })
})

app.get('/cad', function (req, res) {
    res.render('formulario')
})

app.post('/add', function (req, res) {
    Post.create({
        titulo: req.body.titulo,
        conteudo: req.body.conteudo
    }).then(function () {
        res.redirect('/')
    }).catch(function (erro) {
        res.send("Houve um erro: " + erro)
    })
})

app.get('/deletar/:id', function (req, res) {
    Post.destroy({ where: { 'id': req.params.id } }).then(function () {
        res.send('Apagado com sucesso!')
    }).catch(function (erro) {
        res.send('Essa postagem não existe')
    })
})


//Ouvindo a porta 8081
app.listen(8081, function () {
    console.log("Servidor Rodando na URL http://localhost:8081");
});