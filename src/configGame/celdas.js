import _ from 'lodash'
/* eslint-disable no-underscore-dangle */


let celdasInternal = [];
const celdas = {

  /* Devuelve todas las celdas de un juego de un usuario */
  getAll: (idJuego) => {
   return _.cloneDeep(_.values(celdasInternal.filter( c => c.idJuego === idJuego )));
  },


  get: ({ idJuego, idColumna, idFila }) => 
  _.clone(celdasInternal.filter( c => c.idJuego === idJuego && c.idFila === idFila  && c.idColumna === idColumna )),

  clear: (idJuego) => {
    const celdasOtroJuego = celdasInternal.filter( c => c.idJuego !== idJuego);
    celdasInternal = [];
    celdasInternal = celdasOtroJuego;
  },

  ponerMaquina: (aMaquina) => {
    if(aMaquina !== undefined){
      const maquina = {
          image: aMaquina.image,
          direccion: aMaquina.direccion,
          materiales: aMaquina.materiales
      };
      return maquina;
    }else{
      return null;
    }
  },

  add: (idJuego, {idColumna, idFila, maquina } ) => {
    const newCel = { idJuego: idJuego, 
    celda:{ idColumna: idColumna, idFila: idFila, maquina: celdas.ponerMaquina(maquina) } 
    };
    celdasInternal.push(newCel);
    return _.clone(newCel);
  }

}

export default celdas