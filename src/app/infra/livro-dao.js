class LivroDAO {

    constructor(db) {
        this._db = db;
    }

    lista() {
        return new Promise((resolve, reject) => {
            this._db.all('SELECT * FROM livros', 
                (erro, resultados) => {
                    if(erro) return reject('Nao foi possivel listar os livros!');
                    return resolve(resultados);
                }
            );
        });
    }

}

module.exports = LivroDAO;