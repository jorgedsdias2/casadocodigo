module.exports = (app, passport) => {
    app.post('/login', passport.authenticate('local', { 
        successRedirect: '/',
        failureRedirect: '/login' 
    }));
}