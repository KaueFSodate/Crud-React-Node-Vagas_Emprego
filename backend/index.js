// Variaveis globais
require('dotenv').config();

const express = require('express')
const app = express()
const PORT = process.env.PORT;

const cors = require('cors')


// Configuração BD
const con = require('./BD/conexao')
const clientes = require('./models/clientes')

// Variaveis das rotas
const clientesRoutes = require('./routes/clientesRoutes')
const vagasRoutes = require('./routes/vagasRoutes')

// Utilizar json
app.use(express.json())
app.use(cors())

// Routes
app.use('/vagas', vagasRoutes)
app.use('/', clientesRoutes)


// Iniciar aplicação
con.sync().then(() => {
    app.listen(PORT, () => {
        console.log(`Server rodando na porta ${PORT}`)
    })
}).catch((error) => {console.log(error)})