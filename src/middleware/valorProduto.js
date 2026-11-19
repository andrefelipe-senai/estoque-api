export default function(req, res, next) {
    console.log(req.body.preco);
    
    let preco = req.body.preco
    if (preco < 100) {
        // chutar pra fora
        res.send('Não autorizado. produto menor que 100');
    } else {
        next();
    }
}