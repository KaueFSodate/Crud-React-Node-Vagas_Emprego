const express = require('express')
const router = express.Router()
const vagasController = require('../controllers/vagasController')

// MiddleWare
const autenticado = require('../helpers/verificarToken')

router.get('/', vagasController.listarVagas)
router.get('/minhasVagas', autenticado, vagasController.listarMinhasVagas)
router.get('/:id',  vagasController.listarId)
router.post('/', autenticado, vagasController.cadastrar)
router.put('/editar/:id', autenticado, vagasController.editar)
router.delete('/:id', autenticado, vagasController.deletar)

module.exports = router