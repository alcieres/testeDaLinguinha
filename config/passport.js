const LocalStrategy = require('passport-local').Strategy;
const User = require('../models/User');

module.exports = function (passport) {

    //Métodos usados para serializar e desserializar os dados das seções esses métodos foram adicionados em User na linha UserSchema.plugin(passportLocalMongoose); em AssessmentController.js
    passport.serializeUser(User.serializeUser());
    passport.deserializeUser(User.deserializeUser());

    //informa ao passport para usar a função authenticate de User (originaria de AssessmentController.js) para a estrategia de autenticacao local
    passport.use(new LocalStrategy({
            usernameField: 'cpf',
            proxy: true,
        },
        User.authenticate()));
    //passport.use(new LocalStrategy(User.authenticate()));
};