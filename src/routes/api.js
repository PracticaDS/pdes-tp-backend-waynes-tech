import { Router } from 'express'
import _ from 'lodash'
import usuarios from '../usuarios/usuarios'

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
  findTodo(req.params.id, res, usuario => res.json(usuario))
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


export default router