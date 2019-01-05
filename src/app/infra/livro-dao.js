class LivroDAO {

    constructor(db) {
        this._db = db;
    }

    adiciona(livro) {
        return new Promise((resolve, reject) => {
            this._db.run(`
                INSERT INTO livros (
                    titulo,
                    preco,
                    descricao
                ) values (?, ?, ?)
            `,
            [
                livro.titulo,
                livro.preco,
                livro.descricao
            ],
            function(erro) {
                if(erro) {
                    console.log(erro);
                    return reject('Nao foi possivel adicionar o livro!');
                }

                resolve();
            });
        });
    }

    lista() {
        return new Promise((resolve, reject) => {
            this._db.all('SELECT * FROM livros', 
                (erro, livros) => {
                    if(erro) return reject('Nao foi possivel listar os livros!');
                    return resolve(livros);
                }
            );
        });
    }

}

module.exports = LivroDAO;