//Carregando módulos

const express = require('express');
const handlebars = require('express-handlebars');
const bodyparser = require('body-parser');
const app = express();
const path = require('path');
const admin = require('./routes/admin');
const mongoose = require('mongoose');
const session = require('express-session');
const flash = require('connect-flash');

//Configurações
//sessão
app.use(session({
    secret: "cursodenode",
    resave: true,
    saveUninitialized: true
}))

app.use(flash());

//Middleware
app.use((req, res, next) => {
    res.locals.success_msg = req.flash("success_msg");
    res.locals.error_msg = req.flash("error_msg");
    next();
})

//body parser
app.use(bodyparser.urlencoded({ extended: true }));
app.use(bodyparser.json());

//Handlebars
app.engine('handlebars', handlebars({ defaultLayout: 'main' }));
app.set('view engine', 'handlebars');

//mongoose
mongoose.Promise = global.Promise;
mongoose.connect("mongodb://localhost/blogapp", {
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(() => {
    console.log("Conectado ao mongo")
}).catch((err) => {
    console.log("Erro ao se conectar: ", err)
});

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