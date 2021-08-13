const express = require("express");
const app = express();
const multer = require('multer');
const path = require('path')

app.set('view engine', 'ejs');

const storage = multer.diskStorage({
    destination: (req, res, cb) => {
        cb(null, 'uploads/')
    },
    filename: (req, file, cb) => {
        const nomeArquivo = file.originalname + '_' + Date.now() + path.extname(file.originalname);
        cb(null, nomeArquivo);
    }
})

const upload = multer({ storage })


app.get('/', (req, res) => {
    res.render("index")
})

app.post('/upload', upload.single('file'), (req, res) => {
    res.send('Arquivo recebido!')
})

app.listen(8080, () => {
    console.log("Servidor rodando!")
})