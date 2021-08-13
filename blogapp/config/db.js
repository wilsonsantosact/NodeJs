if (process.env.NODE_ENV == 'production') {
    module.exports = { mongoURI: 'mongodb+srv://wilson:dia25mes1@cluster0.cchgk.mongodb.net/myFirstDatabase?retryWrites=true&w=majority' }
}
else {
    module.exports = { mongoURI: 'mongodb://localhost/blogapp' }
}