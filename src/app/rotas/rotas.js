const LivroDAO = require('../infra/livro-dao');
const db = require('../../config/database');

module.exports = (app) => {
    app.get('/', function(req, res) {
        res.send(`
            <html>
                <head><meta charset="UTF-8"></head>
                <body>
                    <h1>Casa do Código</h1>
                </body>
            </html>
        `);
    });
    
    app.get('/livros', function(req, res) {

        const livroDAO = new LivroDAO(db);
        livroDAO.lista()
        .then(
            livros => res.marko(
                require('../views/livros/lista/lista.marko'),
                {
                    livros: livros
                }
            )
        )
        .catch(erro => console.log(erro));
    });

    app.get('/livros/form', function(req, res) {
        res.marko(require('../views/livros/form/form.marko'), 
        {
            livro: {}
        });
    });

    app.get('/livros/form/:id', function(req, res) {
        const id = req.params.id;
        const livroDao = new LivroDAO(db);

        livroDao.buscaPorId(id)
        .then(livro => res.marko(
                require('../views/livros/form/form.marko'), 
                { 
                    livro: livro 
                }
            )
        )
        .catch(erro => console.log(erro));
    });

    app.post('/livros', function(req, res) {
        console.log(req.body);

        const livroDAO = new LivroDAO(db);
        livroDAO.adiciona(req.body)
        .then(res.redirect('/livros'))
        .catch(erro => console.log(erro));
    });

    app.put('/livros', function(req, res) {
        console.log(req.body);

        const livroDAO = new LivroDAO(db);
        livroDAO.atualiza(req.body)
        .then(res.redirect('/livros'))
        .catch(erro => console.log(erro));
    });    

    app.delete('/livros/:id', function(req, res) {
        const id = req.params.id;

        const livroDAO = new LivroDAO(db);
        livroDAO.remove(id)
        .then(() => res.status(200).end())
        .catch(erro => console.log(erro));
    });
}