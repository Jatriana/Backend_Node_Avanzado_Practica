'use strict'
const jwt = require('jsonwebtoken')

module.exports = (req, res, next) => {

    // recoger el token de la cabecara metodo get de la request o de query o del body (o de otros sitios)
    const jwtToken = req.get('Authorization') || req.query.token || req.body.token;

    // comprobar que tengo el token, creo un objeto errroy y llamamos a next
    if (!jwtToken) {
        const error = new Error('no token provided');
        error.status = 401;
        next(error);
        return;
      }
    
    //comprobar que el token es valido, usamos el metodo verify (se le pasa el token , la firma y un callback(error y contenido del token))

    jwt.verify(jwtToken, process.env.JWT_SECRET, (err, payload) => {
        if (err) {
          err.status = 401;
          next(err);
          return;
        }
        req.apiAuthUserId = payload._id;
        next();
      });
}