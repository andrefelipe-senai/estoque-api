const valorDobrado = function(req, res, next) {
    let precoDobrado = req.body.preco * 2;
    req.body.preco = precoDobrado
    next();
}

module.exports = valorDobrado