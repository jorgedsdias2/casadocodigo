const LivroDAO = require('../infra/livro-dao');
const db = require('../../config/database');

module.exports = (app) => {
    let loggedIn = (req, res, next) => {
        if(req.isAuthenticated()) {
            next();
        } else {
            res.render('livros/auth/login');
        }
    };

    app.get('/', loggedIn, function(req, res) {
        console.log(req.session);
        res.send(`
            <html>
                <head><meta charset="UTF-8"></head>
                <body>
                    <h1>Casa do Código</h1>
                </body>
            </html>
        `);
    });

    app.get('/login', function(req, res) {
        res.render('livros/auth/login');
    });
    
    app.get('/livros', function(req, res) {

        const livroDAO = new LivroDAO(db);
        livroDAO.lista()
        .then(
            livros => 
                res.render('livros/lista/lista', {
                    livros: livros
                })
        )
        .catch(erro => console.log(erro));
    });

    app.get('/livros/form', function(req, res) {
        res.render('livros/form/form', {livro: {}});
    });

    app.get('/livros/form/:id', function(req, res) {
        const id = req.params.id;
        const livroDao = new LivroDAO(db);

        livroDao.buscaPorId(id)
        .then(livro => 
                res.render('livros/form/form', {
                    livro: livro
                })
        )
        .catch(erro => console.log(erro));
    });

    app.post('/livros', function(req, res) {
        const livroDAO = new LivroDAO(db);
        livroDAO.adiciona(req.body)
        .then(livro => {
            console.log(livro);
            res.redirect('/livros')
        })
        .catch(erro => console.log(erro));
    });

    app.put('/livros', function(req, res) {
        const livroDAO = new LivroDAO(db);
        livroDAO.atualiza(req.body)
        .then(livro => {
            console.log(livro);
            res.redirect('/livros')
        })
        .catch(erro => console.log(erro));
    });    

    app.delete('/livros/:id', function(req, res) {
        const id = req.params.id;

        const livroDAO = new LivroDAO(db);
        livroDAO.remove(id)
        .then(() => res.status(200).end())
        .catch(erro => console.log(erro));
    });

    app.get('/logout', function(req, res) {
        req.logout();
        res.send('/');
    });
}