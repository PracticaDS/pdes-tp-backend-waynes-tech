const { OK, NO_CONTENT, NOT_FOUND, CREATED } = require('http-status-codes');
const mongoose = require('mongoose');
const Usuario = require('../schemas/usuario');

const builderJuego = (body) => ({
  id: body.id || mongoose.Types.ObjectId(),
  nombre: body.nombre,
  celdas: body.celdas || []  
});

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
  },
  
  getFabrica: (req, res, next) => {
    Usuario
      .findOne({ username: req.params.username })
      .then((usuario) => {
        const fabrica = usuario.fabricas.find(f => f.id.toString() === req.params.idFabrica);
        if (!fabrica) return res.status(NOT_FOUND).json();
        return res.status(OK).json(fabrica);
      })
      .catch(next);
  },

  crearFabrica: (req, res, next) => {
    const fabrica = builderJuego(req.body);
    Usuario
      .findOneAndUpdate(
        { username: req.params.username },
        { $push: { fabricas: fabrica } },
        { new: true, useFindAndModify: false }
      )
      .then((usuario) => {
        if (!usuario) return res.status(NOT_FOUND).json();
        return res.status(CREATED).json(usuario);
      })
      .catch(next);
  },
};

module.exports = UsuarioController;
