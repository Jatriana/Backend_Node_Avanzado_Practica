var express = require('express');
var router = express.Router();

/* GET /change-locale/:locale */
router.get('/:locale', function(req, res, next) {
//poner una cookie con el idiona que me pide para 20 dias
const locale = req.params.locale

res.cookie('nodepop-locale', locale,{maxAge:1000*60*60*24*20})
//redirigir a la pagina de donde venia (cabecea referer )
res.redirect(req.get('referer'))
});


module.exports = router;
