const UsuarioController = require('../controllers/usuarioController');

module.exports = (app) => {

  app.route('/api/hello').get(UsuarioController.getHello);

  app.route('/api').get(UsuarioController.getUsuarios);

  app.route('/api/:username').get(UsuarioController.getUsuario);
  
  app.route('/api/:username').post(UsuarioController.agregarUsuario);

  app.route('/api/:username').delete(UsuarioController.borrarUsuario);

  app.route('/api/:username/fabrica').post(UsuarioController.crearFabrica);

  app.route('/api/:username/fabricas/:idFabrica').get(UsuarioController.getFabrica);
  
  app.route('/api/:username/fabricas/:idFabrica').delete(UsuarioController.borrarFabrica);

  app.route('/api/:username/fabricas/:idFabrica').put(UsuarioController.actualizarFabrica);

  app.route('/api/:username/ganancias/:idFabrica').get(UsuarioController.getGanancias);

  app.route('/api/:username/celdas/:idFabrica').put(UsuarioController.agregarCelda);
};