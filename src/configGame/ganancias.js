import _ from 'lodash'
/* eslint-disable no-underscore-dangle */

let gananciasInternal = [];
const ganancias = {
  getAll: () => _.cloneDeep(_.values(gananciasInternal)),

  add: (idJuego, ganancias) => {
    const newGan = { idJuego: idJuego, ganancias: ganancias };
    gananciasInternal.push(newGan);
    return _.clone(newGan);
  },

  get: id => _.clone(gananciasInternal.filter( g => g.idJuego === id )[0]),
  
  update: (id, body) => {
    const ganancia = ganancias.get(id);
    //if (_.isString(body.ganancia)) 
    ganancia.ganancias = body.ganancia;
    gananciasInternal[id] = ganancia;
    return _.clone(ganancia)
  },
  clear: (idJuego) => {
    const gananciasOtroJuego = gananciasInternal.filter( c => c.idJuego !== idJuego);
    gananciasInternal = [];
    gananciasInternal = gananciasOtroJuego;
  }
}

export default ganancias