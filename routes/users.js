const express = require('express');
const router = express.Router();
const isAdmLoggedIn = require('../config/isAdmLogged');
const User = require('../models/User');
const { check, validationResult } = require('express-validator');

// ROTA INDEX (USERS) exibe todos dos usuários cadastrados
router.get('/', isAdmLoggedIn, function(req, res, next) {
User.find({}).sort({name: 1, lastName: 1}).exec( function (err, docs) {
    if(err){
      //console.log(err);
    } else {
      res.render('usersAdm/users', { title: 'Teste da Linguinha', user: req.user, users: docs });
    }
  });
});

//ROTA NEW - Rota para criação de um novo usuário
router.get('/new', isAdmLoggedIn, function(req, res, next) {
    res.render('usersAdm/userNewViewEdit', {
        title: 'Teste da Linguinha',
        user: req.user,
        profile: null,
        userConfig: 'new',
        userTitle: 'Novo Usuário'
    });
});

// ROTA CREATE - Rota para inserção de um novo usuário no banco
router.post("/",
    isAdmLoggedIn,
    [
        check ('inputName', 'Os dados do campo "Nome" são inválidos')
            .exists().withMessage('O campo "Nome" é obrigatório')
            .not().isEmpty().withMessage('O campo "Nome" é obrigatório')
            .isLength({min: 1, max: 50}).withMessage('O campo "Nome" pode ter no máximo 50 caracteres')
            .escape()
            .trim(),
        check ('inputLastName', 'Os dados do campo "Sobrenome" são inválidos')
            .exists().withMessage('O campo "Sobrenome" é obrigatório')
            .not().isEmpty().withMessage('O campo "Sobrenome" é obrigatório')
            .isLength({min: 1, max: 50}).withMessage('O campo "Sobrenome" pode ter no máximo 50 caracteres')
            .escape()
            .trim(),
        check ('inputCPF', 'Os dados do campo "CPF" são inválidos')
            .exists().withMessage('O campo "CPF" é obrigatório')
            .not().isEmpty().withMessage('O campo "CPF" é obrigatório')
            .isLength({min: 14, max: 14}).withMessage('O campo "CPF" deve ter 14 dígitos')
            .blacklist('.-')
            .custom(
            (value) =>{
                let sum = 0;
                let rest;
                if (value.length !== 11 ||
                    value === "00000000000" ||
                    value === "11111111111" ||
                    value === "22222222222" ||
                    value === "33333333333" ||
                    value === "44444444444" ||
                    value === "55555555555" ||
                    value === "66666666666" ||
                    value === "77777777777" ||
                    value === "88888888888" ||
                    value === "99999999999") {
                    throw new Error('O CPF informado é inválido.');
                }
                for (let i = 1; i <= 9; i++){
                    sum += parseInt(value.substring(i-1, i)) * (11 - i);
                }
                rest = (sum * 10) % 11;
                if ((rest === 10) || (rest === 11)){
                    rest = 0;
                }
                if (rest !== parseInt(value.substring(9, 10)) ){
                    throw new Error('O CPF informado é inválido.');
                }
                sum = 0;
                for (let i = 1; i <= 10; i++){
                    sum += parseInt(value.substring(i-1, i)) * (12 - i);
                }
                rest = (sum * 10) % 11;
                if ((rest === 10) || (rest === 11)){
                    rest = 0;
                }
                if (rest !== parseInt(value.substring(10, 11) ) ){
                    throw new Error('O CPF informado é inválido.');
                }
                return value;
            })
            .escape()
            .trim(),
        check ('inputRegistry', 'Os dados do campo "Registro no Conselho" são inválidos')
            .exists().withMessage('O campo "Registro no Conselho" é obrigatório')
            .not().isEmpty().withMessage('O campo "Registro no Conselho" é obrigatório')
            .isLength({min: 3, max: 10}).withMessage('O campo "Registro no Conselho" deve ter entre 3 e 10 caracteres')
            .escape()
            .trim(),
        check ('inputOccupation', 'Os dados do campo "Profissão" são inválidos')
            .exists().withMessage('O campo "Profissão" é obrigatório')
            .not().isEmpty().withMessage('O campo "Profissão" é obrigatório')
            .isLength({min: 3, max: 30}).withMessage('O campo "Profissão" deve ter no máximo 50 caracteres')
            .escape()
            .trim(),
        check ('inputEmail', 'Os dados do campo "E-mail" são inválidos')
            .exists().withMessage('O campo "E-mail" é obrigatório')
            .not().isEmpty().withMessage('O campo "E-mail" é obrigatório')
            .isLength({min: 3, max: 100}).withMessage('O campo "E-mail" deve ter no máximo 100 caracteres')
            .isEmail().withMessage('O campo "E-mail" é inválido')
            .normalizeEmail(),
        check ('cbAdm', 'Os dados do campo "Administrador" são inválidos')
            .isIn(['true', 'false', undefined]),
        check("inputPassword", "Senha inválida.")
            .exists().withMessage('O campo "Senha" é obrigatório')
            .not().isEmpty().withMessage('O campo "Senha" é obrigatório')
            .isLength({ min: 6, max: 16 }).withMessage('A senha tem que ter entre 6 e 16 caracteres.')
            .custom(
                (value, {req}) => {
                if (value !== req.body.inputPasswordConfirm) {
                    throw new Error("A senha diverge entre os dois campos.");
                } else {
                    return value;
                }
            })
    ],
    function (req, res) {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        //console.log(errors.array());
        return res.status(422).json({ error: errors.array() });
    }

    let name = req.body.inputName;
    let lastName = req.body.inputLastName;
    let cpf = req.body.inputCPF;//.replace(/\D/g, '');
    let registry = req.body.inputRegistry;
    let occupation = req.body.inputOccupation;
    let email = req.body.inputEmail;
    let admin = req.body.cbAdm === 'true';
    let password = req.body.inputPassword;

    User.register(new User({
            cpf: cpf,
            name: name,
            lastName: lastName,
            occupation: occupation,
            email: email,
            registry: registry,
            date: new Date,
            admin: admin
        }),
        password, function(err) {
            if (err) {
                //console.log('error while user register!', err);
                if (err.name === "UserExistsError"){
                    res.status(422).json({ error: [{msg: 'CPF já cadastrado para outro usuário.'}]});
                } else{
                    res.status(422).json({ error: [{msg: 'Erro de acesso ao banco de dados.'}]});
                }
            }
            res.status(201).json({ success: [{msg:'Novo usuário registrado com sucesso.'}]});
        });
});

//ROTA SHOW - Rota para exibição dos dados de um usuário
router.get('/:cpf', isAdmLoggedIn, function(req, res) {
    User.findByUsername(req.params.cpf, function (err, doc) {
        res.render('usersAdm/userNewViewEdit', {
            title: 'Teste da Linguinha',
            user: req.user,
            profile: doc,
            userConfig: 'show',
            userTitle: 'Dados do Usuário'
        });
    });
});

//ROTA SHOW - Rota para exibição da tela de edição de um usuário
router.get('/:cpf/edit', isAdmLoggedIn, function(req, res) {
    User.findByUsername(req.params.cpf, function (err, doc) {
        res.render('usersAdm/userNewViewEdit', {
            title: 'Teste da Linguinha',
            user: req.user,
            profile: doc,
            userConfig: 'edit',
            userTitle: 'Edição do Usuário'
        });
    });
});

//ROTA UPDATE - Edita informacoes do usuário
router.put("/:id",
    isAdmLoggedIn,
    [
        check ('inputName', 'Os dados do campo "Nome" são inválidos')
            .exists().withMessage('O campo "Nome" é obrigatório')
            .not().isEmpty().withMessage('O campo "Nome" é obrigatório')
            .isLength({max: 50}).withMessage('O campo "Nome" pode ter no máximo 50 caracteres')
            .escape()
            .trim(),
        check ('inputLastName', 'Os dados do campo "Sobrenome" são inválidos')
            .exists().withMessage('O campo "Sobrenome" é obrigatório')
            .not().isEmpty().withMessage('O campo "Sobrenome" é obrigatório')
            .isLength({max: 50}).withMessage('O campo "Sobrenome" pode ter no máximo 50 caracteres')
            .escape()
            .trim(),
        check ('inputCPF', 'Os dados do campo "CPF" são inválidos')
            .exists().withMessage('O campo "CPF" é obrigatório')
            .not().isEmpty().withMessage('O campo "CPF" é obrigatório')
            .isLength({min: 14, max: 14}).withMessage('O campo "CPF" deve ter 14 dígitos')
            .blacklist('.-')
            .custom(
                (value) =>{
                    let sum = 0;
                    let rest;
                    if (value.length !== 11 ||
                        value === "00000000000" ||
                        value === "11111111111" ||
                        value === "22222222222" ||
                        value === "33333333333" ||
                        value === "44444444444" ||
                        value === "55555555555" ||
                        value === "66666666666" ||
                        value === "77777777777" ||
                        value === "88888888888" ||
                        value === "99999999999") {
                        throw new Error('O CPF informado é inválido.');
                    }
                    for (let i = 1; i <= 9; i++){
                        sum += parseInt(value.substring(i-1, i)) * (11 - i);
                    }
                    rest = (sum * 10) % 11;
                    if ((rest === 10) || (rest === 11)){
                        rest = 0;
                    }
                    if (rest !== parseInt(value.substring(9, 10)) ){
                        throw new Error('O CPF informado é inválido.');
                    }
                    sum = 0;
                    for (let i = 1; i <= 10; i++){
                        sum += parseInt(value.substring(i-1, i)) * (12 - i);
                    }
                    rest = (sum * 10) % 11;
                    if ((rest === 10) || (rest === 11)){
                        rest = 0;
                    }
                    if (rest !== parseInt(value.substring(10, 11) ) ){
                        throw new Error('O CPF informado é inválido.');
                    }
                    return value;
                })
            .escape()
            .trim(),
        check ('inputRegistry', 'Os dados do campo "Registro no Conselho" são inválidos')
            .exists().withMessage('O campo "Registro no Conselho" é obrigatório')
            .not().isEmpty().withMessage('O campo "Registro no Conselho" é obrigatório')
            .isLength({min: 3, max: 10}).withMessage('O campo "Registro no Conselho" deve ter entre 3 e 10 caracteres')
            .escape()
            .trim(),
        check ('inputOccupation', 'Os dados do campo "Profissão" são inválidos')
            .exists().withMessage('O campo "Profissão" é obrigatório')
            .not().isEmpty().withMessage('O campo "Profissão" é obrigatório')
            .isLength({max: 50}).withMessage('O campo "Profissão" deve ter no máximo 50 caracteres')
            .escape()
            .trim(),
        check ('inputEmail', 'Os dados do campo "E-mail" são inválidos')
            .exists().withMessage('O campo "E-mail" é obrigatório')
            .not().isEmpty().withMessage('O campo "E-mail" é obrigatório')
            .isEmail().withMessage('O campo "E-mail" é inválido')
            .normalizeEmail(),
        check ('cbAdm', 'Os dados do campo "Administrador" são inválidos')
            .isIn(['true', 'false', undefined]),
    ],
    function(req,res){
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        //console.log(errors.array());
        return res.status(422).json({ error: errors.array()
        });
    }

    let user;
    let id = req.params.id;
    let name = req.body.inputName;
    let lastName = req.body.inputLastName;
    let cpf = req.body.inputCPF.replace(/\D/g, '');
    let registry = req.body.inputRegistry;
    let occupation = req.body.inputOccupation;
    let email = req.body.inputEmail;
    let admin = req.body.cbAdm === 'true';

    let userCpf = req.user.cpf;

    async function checkUpdateUser() {
            user = await User.findById(id, function (err, doc) {
                if (err) {
                    //console.log(err);
                    return res.status(422).json({ error: [{msg: 'Erro de acesso ao banco de dados.'}]});
                } else {
                    //console.log("doc: " + doc);
                }
            });
            if ((user.cpf === userCpf) && (user.admin !== admin)) {
                    return res.json({ error: [{msg: 'Não é possível retirar o privilégio de administrador do próprio usuário.'}]});
            }else if (user.cpf !== cpf){
                    let tempUser = await User.findOne({cpf: cpf}, function (err, doc) {
                        if (err) {
                            //console.log(err);
                            return res.status(422).json({ error: [{msg: 'Erro de acesso ao banco de dados.'}]});
                        } else {
                            //console.log("doc: " + doc);
                        }
                    });
                    if (tempUser === null){
                        updateUser();
                    }else if (tempUser._id !== id){
                        return res.status(422).json({ error: [{msg: 'Já existe outro usuário com esse CPF.'}]});
                    } else {
                        updateUser();
                    }
                } else{
                    updateUser();
                    }
    }

    function updateUser(){
        User.findByIdAndUpdate(id,
            {cpf: cpf,
              name: name,
              lastName:lastName,
              occupation: occupation,
              email: email,
              registry: registry,
              admin: admin
            },
            function(err){
            if (err){
                //console.log(err);
                return res.status(422).json({ error: [{msg: 'Erro ao atualizar o usuário.'}]});
            } else{
                if ((user.cpf === userCpf)){
                    req.user.cpf = cpf;
                    req.user.name = name;
                    req.user.lastName = lastName;
                    req.user.occupation = occupation;
                    req.user.email = email;
                    req.user.registry = registry;
                }
                res.status(200).json({ success: [{msg: 'Usuário atualizado com sucesso.'}]});
            }
        });
    }

    checkUpdateUser();
});

//ROTA DELETE - Deletar usuário, ela não permite que o usuário logado apague a própria conta e, nesse caso, retorna erro para usuário
router.delete("/:id", isAdmLoggedIn, function(req, res){
    let user;
    let id = req.params.id;

    async function deleteUser () {
        try {
            user = await User.findById(id, function (err, doc) {
                if (err) {
                    //console.log(err);
                    res.status(422).json({ error: [{msg: 'Erro de acesso ao banco de dados.'}]});
                } else {
                    //console.log("doc: " + doc);
                }
            });
        } catch (e) {
            //console.log(e);
        }
        if (user.cpf !== req.user.cpf) {
            User.findByIdAndRemove(id, function(err){
                if (err){
                    res.status(422).json({ error: [{msg: 'Erro de acesso ao banco de dados.'}]});
                    //console.log(err);
                } else{
                    res.status(200).json({ success: [{msg: 'Usuário deletado'}]});
                }
            });
        } else {
            return res.status(422).json({ error: [{msg: 'Não é possível excluir o próprio usuário.'}]});
        }
    }
    deleteUser();
});

//ROTA UPDATE - Reseta a senha do usuário a trocando por outra de escolha do administrador
router.put ("/:id/passwordReset",
    isAdmLoggedIn,
    [
    check("inputPassword", "Senha inválida.")
    .exists().withMessage('O campo "Senha" é obrigatório')
    .not().isEmpty().withMessage('O campo "Senha" é obrigatório')
    .trim()
    .isLength({ min: 6, max: 16 }).withMessage('A senha deve ter entre 6 e 16 caracteres.')
    .custom(
        (value, {req}) => {
            if (value !== req.body.inputPasswordConfirm) {
                throw new Error("A senha diverge entre os dois campos.");
            } else {
                return value;
            }
        })
    ],
    function (req, res) {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            //console.log(errors.array());
            return res.status(422).json({ error: errors.array() });
        }
        let newPassword = req.body.inputPassword;
        //console.log("-----=========>" + newPassword);
        User.findById(req.params.id, function (err, doc) {
            //console.log(doc);
            if (err) {
                //console.log(err);
                res.status(422).json({ error: [{msg: 'Erro de acesso ao banco de dados.'}]});
            } else {
                doc.setPassword(newPassword, function(err, user){
                    if(err){
                        //console.log(err);
                        res.status(422).json({ error: [{msg: 'Erro ao redefinir a senha.'}]});
                    }else {
                        doc.save(function(error){
                            if (error) {
                                //console.log(error);
                                res.status(422).json({ error: [{msg: 'Erro ao gravar redefinição da senha.'}]});
                            }
                        });
                        res.status(200).json({ success: [{msg: 'Senha reinicializada com sucesso.'}]});
                        //console.log("-----=========>" + newPassword);
                    }
                });
            }
        });
    });

module.exports = router;
