import _ from 'lodash'


let currentId = 0;
let storeGame = {
    ganancias: {},
    celdas: []
};
const configGame = {
  getAll: () => _.cloneDeep(_.values(storeGame)),
  add: ({ username, estado = true }) => {
    currentId += 1;
    const newUser = { id: currentId, username, estado };
    storeGame[newUser.id] = newUser;
    return _.clone(newUser)
  },
  get: id => _.clone(usersInternal[_.toNumber(id)]),
  update: (id, body) => {
    const usuario = usuarios.get(id);
    if (_.isString(body.username)) usuario.description = body.description;
    storeGame[id] = usuario;
    return _.clone(usuario)
  },
  clear: () => {
    storeGame = {}
  }
}

export default configGame