import Atendimento from '../model/atendimentos.js'

class ServiceAtendimento {
    async FindAll() {
        return await Atendimento.findAll()
    }
    async FindOne(id) {
        if (!id) {
            throw new Error('Favor informar o id')
        }

        const atendimento = await Atendimento.findByPk(id)

        if (!atendimento) {
            throw new Error(`Atendimento ${id} não encontrado`)
        }

        return atendimento
    }
    async Create(dia, hora, valor, concluido) {
        if (!dia || !hora || !valor) {
            throw new Error('Favor preencher todos os campos')
        }

        await Atendimento.create({ dia, hora, valor, concluido})
    }
    async Update(id, dia, hora, valor, concluido) {
        if (!id) {
            throw new Error('Favor informar o id')
        }

        const atendimento = await Atendimento.findByPk(id)

        if (!atendimento) {
            throw new Error(`Atendimento ${id} não encontrado`)
        }

        if (!dia || !hora || !valor) {
            throw new Error('Favor preencher todos os campos')
        }

        atendimento.dia = dia || atendimento.dia
        atendimento.hora = hora || atendimento.hora
        atendimento.valor = valor || atendimento.valor
        atendimento.concluido = concluido || atendimento.concluido

        await atendimento.save()
    }
    async Delete(id) {
        if (!id) {
            throw new Error('Favor informar o id')
        }

        const atendimento = await Atendimento.findByPk(id)

        if (!atendimento) {
            throw new Error(`Atendimento ${id} não encontrado`)
        }

        await atendimento.destroy()
    }
}

export default new ServiceAtendimento()