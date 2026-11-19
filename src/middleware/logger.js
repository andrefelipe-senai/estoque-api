export default function (req, res, next) {
    console.log(`Uma requisição foi feita: ${req.body.nome}, params: ${req.params.id}`);
    next();
}

