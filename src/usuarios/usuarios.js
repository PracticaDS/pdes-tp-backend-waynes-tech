import _ from 'lodash'
/* eslint-disable no-underscore-dangle */

let currentId = 0;
let usuariosInternal = {}
const usuarios = {
  getAll: () => _.cloneDeep(_.values(usuariosInternal)),
  add: ({ username, estado = true }) => {
    currentId += 1;
    const newUser = { id: currentId, username, estado };
    usuariosInternal[newUser.id] = newUser;
    return _.clone(newUser)
  },
  get: id => _.clone(usersInternal[_.toNumber(id)]),
  update: (id, body) => {
    const usuario = usuarios.get(id);
    if (_.isString(body.username)) usuario.description = body.description;
    usuariosInternal[id] = usuario;
    return _.clone(usuario)
  },
  clear: () => {
    usuariosInternal = {}
  }
}

export default usuarios