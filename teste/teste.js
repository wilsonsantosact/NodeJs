const Sequelize = require('sequelize');
const sequelize = new Sequelize('teste', 'root', 'dia25mes1', {
    host: "localhost",
    dialect: "mysql"
})

const Postagem = sequelize.define('postagens', {
    titulo: {
        type: Sequelize.STRING
    },
    conteudo: {
        type: Sequelize.TEXT
    }
})

// Postagem.create({
//     titulo: "Titulo de postagem",
//     conteudo: "conteudo da postagem"
// });

//Postagem.sync({ force: true });

const Usuario = sequelize.define('usuarios', {
    nome: {
        type: Sequelize.STRING
    },
    sobrenome: {
        type: Sequelize.STRING
    },
    idade: {
        type: Sequelize.INTEGER
    },
    email: {
        type: Sequelize.STRING
    }
})

// Usuario.create({
// nome: "Wilson",
// sobrenome: "Santos",
// idade: 29,
// email: "wilson.santos@actdigital.com.br"
// });

//Usuario.sync({ force: true });

// sequelize.authenticate().then(
//     console.log('conectado com sucesso!')
// ).catch(function (erro) {
//     console.log('falha ao se conectar: ' + erro)
// })