class UsuarioDAO {

    constructor(db) {
        this._db = db;
    }

    buscaUsuario(email, senha) {
        return new Promise((resolve, reject) => {
            this._db.get(
                `
                    SELECT * FROM usuarios
                    WHERE email = ? AND senha = ?
                `,
                [
                    email,
                    senha
                ],
                (erro, usuario) => {
                    if(erro) {
                        return reject('Nao foi possivel encontrar o usuario!');
                    }

                    return resolve(usuario);
                }
            );
        });
    }

}

module.exports = UsuarioDAO;