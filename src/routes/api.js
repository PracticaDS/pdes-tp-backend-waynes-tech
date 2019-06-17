const UsuarioController = require('../controllers/usuarioController');

module.exports = (app) => {

  app.route('/').get(UsuarioController.getUsuarios);

  app.route('/:username').get(UsuarioController.getUsuario);
  
  app.route('/:username').post(UsuarioController.agregarUsuario);
  

};
