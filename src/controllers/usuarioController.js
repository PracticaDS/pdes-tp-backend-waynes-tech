const { OK, NO_CONTENT, NOT_FOUND } = require('http-status-codes');
const Usuario = require('../schemas/usuario');

const UsuarioController = {
  getUsuarios: (_, res, next) => {
    Usuario
      .find()
      .then(usuarios => res.status(OK).json(usuarios))
      .catch(next);
  },

  getUsuario: (req, res, next) => {
    const { username } = req.params;
    Usuario
      .findOne({ username })
      .then((usuario) => {
        if (!usuario) {
          return res.status(NOT_FOUND).json();
        }
        return res.status(OK).json(usuario);
      })
      .catch(next);
  },

  agregarUsuario: (req, res, next) => {
    const { username } = req.params;
    Usuario
      .findOne({ username })
      .then((usuario) => {
        if (!usuario) {
          return new Usuario({ username })
            .save()
            .then(usuarioNuevo => res.status(OK).json(usuarioNuevo));
        }
        else {
          return res.status("El usuario ya ha sido creado").json();
        }
      })
      .catch(next);
  }
};

module.exports = UsuarioController;
