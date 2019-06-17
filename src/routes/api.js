import { Router } from 'express'
import _ from 'lodash'
import usuarios  from '../usuarios/usuarios'
import ganancias from '../configGame/ganancias'
import celdas    from '../configGame/celdas'

const router = Router()

function validate(condition, message) {
    return (req, res, next) => {
      if (!condition(req, res)) {
        res.status(400).json({ status: 'error', message })
      } else {
        next();
      }
    }
  }

/***************************************ABM USUARIO******************************************************* */
const validateTodoBody = validate(req => _.isString(req.body.username), 'El username es requerido');

function findUsuario(id, res, ifFound) {
  const usuario = usuarios.get(id);
  if (!usuario) res.status(404).json({ status: 'not-found' })
  ifFound(usuario)
}

router.get('/', (req, res) => {
  res.json({ status: 'ok' })
})

router.get('/usuarios', (req, res) => {
  res.json(usuarios.getAll())
})

router.get('/usuarios/:id', (req, res) => {
  findUsuario(req.params.id, res, usuario => res.json(usuario))
})

router.post('/usuarios', [
    validateTodoBody,
    (req, res) => res.json(usuarios.add(req.body))
  ])
  
  router.put('/usuarios/:id', [
    validateTodoBody,
    (req, res) => findUsuario(req.params.id, res, 
      () => res.json(usuarios.update(req.params.id, req.body)))
  ])
  
  router.delete('/usuarios', (req, res) => {
    usuarios.clear();
    res.json(usuarios.getAll());
  })
  
  router.delete('/usuarios/:id', (req, res) => {
    findUsuario(req.params.id, res, (_) => {
      usuarios.delete(req.params.id);
      res.status(204).send();
    })
  })
/***************************************ABM USUARIO******************************************************* */

/***************************************ABM GANANCIAS******************************************************* */
router.get('/ganancias', (req, res) => {
  res.json(ganancias.getAll())
})

function findGanancia(id, res, ifFound) {
  const ganancia = ganancias.get(id);
  if (!ganancia) res.status(404).json({ status: 'not-found' })
  ifFound(ganancia)
}

router.get('/ganancias/:id', (req, res) => {
  findGanancia(req.params.id, res, ganancia => res.json(ganancia))
})

router.post('/ganancias', [
    (req, res) => res.json(ganancias.add(req.body))
])
  
  router.put('/ganancias/:id', [
    (req, res) => findGanancia(req.params.id, res, 
      () => res.json(ganancias.update(req.params.id, req.body)))
  ])
  
  router.delete('/ganancias', (req, res) => {
    ganancias.clear();
    res.json(ganancias.getAll());
  })
  
  router.delete('/ganancias/:id', (req, res) => {
    findGanancia(req.params.id, res, (_) => {
      ganancias.delete(req.params.id);
      res.status(204).send();
    })
  })
/***************************************ABM GANANCIAS******************************************************* */

/***************************************ABM JUEGO********************************************************** */

const convertResult = (idJuego, celdas) => {
  const lista = [];
  for (var i=0; i< celdas.length; i++){
    lista.push(celdas[i].celda);
  };
  const ganancia = ganancias.get(idJuego);
  return {
    "idjuego":idJuego,
    "ganancias":(ganancia === undefined ? 0 : ganancia.ganancias),
    "celdas":lista 
  };
};

router.get('/fabrica', (req, res) => {
  const idJuego = _.toNumber(req.query.idJuego);
  res.json( convertResult( idJuego, celdas.getAll(idJuego)) );
});

const updateGame = (req) => {
    /* borro las celdas que son del juego solamente */
    celdas.clear(req.body.idJuego);
    /* borro las ganancias del juego */
    ganancias.clear(req.body.idJuego);
    /* vuelvo agregar las celdas */
    for (var i=0; i< req.body.celdas.length; i++){
      celdas.add(req.body.idJuego, req.body.celdas[i] );
    };
    /* agregar ganancias */
    ganancias.add(req.body.idJuego, req.body.ganancias);
  return celdas.getAll(req.body.idJuego);
}

router.post('/fabrica', [
  (req, res) => res.json( convertResult(req.body.idJuego, updateGame(req)) )
]);


export default router