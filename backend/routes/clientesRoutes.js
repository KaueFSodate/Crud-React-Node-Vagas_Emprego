const express = require('express')
const router = express.Router()
const clientesController = require('../controllers/clientesController')

// MiddleWare
const autenticado = require('../helpers/verificarToken')

router.get('/', clientesController.listar)
router.get('/:id', clientesController.listarId)
router.post('/', clientesController.cadastrar)
router.post('/login', clientesController.login)
router.put('/:id', autenticado, clientesController.editar)
router.delete('/:id', autenticado, clientesController.deletar)

module.exports = router