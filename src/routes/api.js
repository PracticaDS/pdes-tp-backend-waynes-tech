const UsuarioController = require('../controllers/usuarioController');

module.exports = (app) => {

  app.route('/').get(UsuarioController.getUsuarios);

  app.route('/:username').get(UsuarioController.getUsuario);
  
  app.route('/:username').post(UsuarioController.agregarUsuario);

  app.route('/:username/fabrica').post(UsuarioController.crearFabrica);

  app.route('/:username/fabricas/:idFabrica').get(UsuarioController.getFabrica);
  
  app.route('/:username/fabricas/:idFabrica').delete(UsuarioController.borrarFabrica);

  app.route('/:username/fabricas/:idFabrica').put(UsuarioController.actualizarFabrica);

};
