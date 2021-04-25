'use strict'
// veo el conector con la bbdd
const mongoose = require('mongoose');

//cuando ocurra un evento error en la conexion me de un error
mongoose.connection.on('error', err => {
    console.log('Error de conexión', err);
    //termina la aplicacion nodepop
    process.exit(1);
  });
//cuando se conecta a la bbd que lo indique
  mongoose.connection.once('open', () => {
    console.log('Conectado a MongoDB en', mongoose.connection.name);
  });

  
mongoose.connect(process.env.MONGODB_CONNECTION_STR,{
    useNewUrlParser: true,
    useUnifiedTopology: true
});

//exporto para cargar en la app
module.exports = mongoose.connection;