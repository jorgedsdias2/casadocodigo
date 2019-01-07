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

    buscaPorId(id) {
        return new Promise((resolve, reject) => {
            this._db.get(
                `
                    SELECT *
                    FROM livros
                    WHERE id = ?
                `,
                [id],
                (erro, livro) => {
                    if(erro) {
                        return reject('Nao foi possivel encontrar o livro!');
                    }
                    return resolve(livro);
                }                
            );
        });
    }

    atualiza(livro) {
        return new Promise((resolve, reject) => {
            this._db.run(
                `
                    UPDATE livros SET
                    titulo = ?,
                    preco = ?,
                    descricao = ?
                    WHERE id = ?
                `,
                [
                    livro.titulo,
                    livro.preco,
                    livro.descricao,
                    livro.id
                ],
                (erro) => {
                    if(erro) {
                        return reject('Nao foi possivel atualizar o livro!');
                    }
                    resolve();
                }                
            );
        });
    }

    remove(id) {
        return new Promise((resolve, reject) => {
            this._db.get(
                `
                    DELETE
                    FROM livros
                    WHERE id = ?
                `,
                [id],
                (erro) => {
                    console.log('x');
                    if(erro) {
                        console.log(erro);
                        return reject('Nao foi possivel remover o livro!');
                    }
                    return resolve();
                }                
            );
        });
    }

}

module.exports = LivroDAO;