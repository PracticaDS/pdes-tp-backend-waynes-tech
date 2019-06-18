const { OK, NO_CONTENT, NOT_FOUND, CREATED } = require('http-status-codes');
const mongoose = require('mongoose');
const Usuario = require('../schemas/usuario');

const builderFabrica = (body) => ({
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
    const fabrica = builderFabrica(req.body);
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

  borrarFabrica: (req, res, next) => {
    Usuario
      .findOne({ username: req.params.username })
      .then((usuario) => {
        const fabrica = usuario.fabricas.find(f => f.id.toString() === req.params.idFabrica);
        if (!fabrica) return res.status(NOT_FOUND).json();

        return Usuario.findOneAndUpdate(
          { username: req.params.username },
          { $pull: { fabricas: fabrica } },
          { new: true, useFindAndModify: false }
        ).then(() => res.status(NO_CONTENT).json());
      })
      .catch(next);
  },

  actualizarFabrica: (req, res, next) => {
    Usuario
      .findOne({ username: req.params.username })
      .then((usuario) => {
        const fabricaAntes = usuario.fabricas.find(f => f.id.toString() === req.params.idFabrica);
        if (!fabricaAntes) return res.status(NOT_FOUND).json();

        const fabricaActualizada = builderFabrica(req.body, fabricaAntes.id);
        Usuario.findOneAndUpdate(
          { username: req.params.username },
          { $pull: { fabricas: fabricaAntes } },
          { new: true, useFindAndModify: false }
        ).then(() => {
          Usuario.findOneAndUpdate(
            { username: req.params.username },
            { $push: { fabricas: fabricaActualizada } },
            { new: true, useFindAndModify: false }
          ).catch(next);
        }).catch(next);

        return res.status(OK).json(fabricaActualizada);
      })
      .catch(next);
  }
};

module.exports = UsuarioController;
