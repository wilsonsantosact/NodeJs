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
require('./models/Postagem')
const Postagem = mongoose.model('postagens')
require('./models/Categoria')
const Categoria = mongoose.model('categorias')
const usuarios = require('./routes/usuario')
const passport = require('passport')
require('./config/auth')(passport)
const db = require('./config/db')

//Configurações
//sessão
app.use(session({
    secret: "cursodenode",
    resave: true,
    saveUninitialized: true
}))

app.use(passport.initialize())
app.use(passport.session())
app.use(flash());

//Middleware
app.use((req, res, next) => {
    res.locals.success_msg = req.flash("success_msg");
    res.locals.error_msg = req.flash("error_msg");
    res.locals.error = req.flash('error');
    res.locals.user = req.user || null;
    res.locals.userName = req.user ? req.user.nome : null;
    
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
mongoose.connect(db.mongoURI, {
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

    Postagem.find().populate('categoria').sort(({ data: 'desc' })).lean()
        .then((postagens) => {
            res.render('index', { postagens: postagens })
        })
        .catch((err) => {
            req.flash('error_msg', 'Houve um erro interno')
            req.redirect('/404')
        })
});

app.get('/postagem/:slug', (req, res) => {
    Postagem.findOne({ slug: req.params.slug }).lean().then((postagem) => {
        if (postagem) {
            Categoria.findOne({ _id: postagem.categoria }).lean().then((categoria) => {
                res.render('postagem/index', { postagem: postagem, categoria: categoria })
            }).catch((err) => {
                req.flash('error_msg', 'Erro interno')
                res.redirect('/')
            })
        }
        else {
            req.flash('error_msg', 'Esta página não existe')
            res.redirect('/')
        }
    }).catch((err) => {
        req.flash('error_msg', 'Houve um erro interno')
        res.redirect('/')
    })
})

app.get('/categorias', (req, res) => {
    Categoria.find().lean().then((categorias) => {
        res.render('categorias/index', { categorias: categorias })

    }).catch((err) => {
        req.flash('error_msg', 'Houve um erro interno ao listar as categorias')
        res.redirect('/')
    })
})

app.get('/categorias/:slug', (req, res) => {
    Categoria.findOne({ slug: req.params.slug }).lean().then((categoria) => {
        if (categoria) {
            Postagem.find({ categoria: categoria._id }).lean().then((postagens) => {
                res.render('categorias/postagens', { postagens: postagens, categoria: categoria })
            }).catch((err) => {
                req.flash('error_msg', 'Houve um erro ao listar os posts!')
                res.redirect('/')
            })
        }
        else {
            req.flash('error_msg', 'Esta categoria não existe!')
            res.redirect('/')
        }
    }).catch((err) => {
        req.flash('error_msg', 'Houve um erro interno ao carregar a página desta categoria')
        res.redirect('/')
    })
})

app.get('/404', (req, res) => {
    res.send('Erro 404')
})

app.use('/admin', admin)
app.use('/usuarios', usuarios)

//Outros
const port = process.env.PORT || 8081
app.listen(port, () => {
    console.log("Servidor rodando!");
})