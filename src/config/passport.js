const localStrategy = require('passport-local').Strategy;
const db = require('../config/database');
const UsuarioDAO = require('../app/infra/usuario-dao');

module.exports = (passport) => {
    passport.serializeUser(function(user, done) {
        done(null, user);
    });

    passport.deserializeUser(function(user, done) {
        done(null, user);
    });

    passport.use(new localStrategy({
        usernameField: 'email',
        passwordField: 'senha'
      },
      function(username, password, done) {
        const usuarioDAO = new UsuarioDAO(db);
        usuarioDAO.buscaUsuario(username, password)
        .then((usuario) => {
            if(usuario) {
                console.log(usuario.email);
                done(null, {
                    username: usuario.email,
                    password: usuario.senha
                });
            } else {
                console.log('Usuario invalido!');
                done(null, false);
            }
        })
        .catch(erro => {
            console.log(erro);
            done(null, false);
        });
    }));
}