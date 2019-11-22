module.exports = function isAdmLoggedIn(req, res, next){
    if(req.isAuthenticated() && req.user.admin){
        return next(); //prossegue com a execucao
    }
    res.redirect("/login"); //não prossegue com a execução e redireciona para a página login
    console.log("Não está logado!!!");
};