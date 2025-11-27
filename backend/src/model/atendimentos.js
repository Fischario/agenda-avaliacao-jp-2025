import database from "../config/database.js"

class Atendimento {
    constructor() {
        this.model = database.db.define('atendimentos', {
            id: {
                type: database.db.Sequelize.INTEGER,
                primaryKey: true,
                autoIncrement: true
            },
            dia: {
                type: database.db.Sequelize.DATE
            },
            hora: {
                type: database.db.Sequelize.TIME
            },
            valor: {
                type: database.db.Sequelize.FLOAT
            },
            concluido: {
                type: database.db.Sequelize.BOOLEAN
            },
            clienteId: {
                type: database.db.Sequelize.INTEGER,
                references: {
                    model: 'clientes',
                    key: 'id'
                }
            }
        })
    }
}

export default new Atendimento().model