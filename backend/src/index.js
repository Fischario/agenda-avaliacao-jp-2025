import express from 'express'
import routerClientes from './router/clientes.js';
import routerAtendimentos from './router/atendimentos.js'
import database from './config/database.js';
import cors from 'cors'

const app = express();

app.use(express.json())
app.use(cors())

app.use('/api/v1', routerClientes)
app.use('/api/v1', routerAtendimentos)

const porta = 9999

database.db
    .sync({ force: false })
    .then((_) => {
        app.listen(porta, () => {
            console.info(`servidor se infiltrando na máfia dos ratos na porta ${porta}`)
        })
    })
    .catch((e) => {
        console.log('deu ruim mané, não deu pra conectar com o banco: ' + e)
    })
