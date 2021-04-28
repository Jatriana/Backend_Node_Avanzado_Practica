const jwt = require('jsonwebtoken');


class LoginController {
/**
   * POST /loginJWT
   */
 async postJWT(req, res, next) {
    try {
      const { email, password } = req.body;
  
      // buscar el usuario en la BD
      const usuario = await Usuario.findOne({ email })
      
      // si no lo encontramos --> error
      // si no coincide la clave --> error
      if (!usuario || !(await usuario.comparePassword(password)) ) {

        const error = new Error('invalid credentials');
        error.status = 401;
        next(error);
        return;
      }
  
      // si el usuario existe y la clave coincide

      // crear un token JWT (firmado)
    //   jwt.sign({ _id: usuario._id }, process.env.JWT_SECRET, { expiresIn: '2h' }, (err, jwtToken) => {
    //     if (err) {
    //       next(err);
    //       return;
    //     }
    //     // devolveselo al cliente
    //     res.json({ token: jwtToken});
    //   });
      

      
    } catch(err) {
      next(err);
    }
  }
}


module.exports = new LoginController();