import Cliente from '../model/clientes.js'
import jwt from 'jsonwebtoken'
import bcrypt from 'bcrypt'

const JWT_SEGREDO = 'AS3nh4d0L0uvr3Er4loUvr3'
const SALT = 12

class ServiceCliente {
    async FindAll() {
        return await Cliente.findAll()
    }
    async FindOne(id) {
        if (!id) {
            throw new Error('Favor informar o id')
        }

        const cliente = await Cliente.findByPk(id)

        if (!cliente) {
            throw new Error(`Cliente ${id} não encontrado`)
        }

        return cliente
    }
    async Create(nome, email, senha) {
        if (!nome || !email || !senha) {
            throw new Error('Favor preencher todos os campos')
        }

        const senhaCriptografada = await bcrypt.hash(String(senha), SALT)

        await Cliente.create({ nome, email, senha: senhaCriptografada})
    }
    async Update(id, nome, email, senha) {
        if (!id) {
            throw new Error('Favor informar o id')
        }

        const cliente = await Cliente.findByPk(id)

        if (!cliente) {
            throw new Error(`Cliente ${id} não encontrado`)
        }

        if (!nome || !email || !senha) {
            throw new Error('Favor preencher todos os campos')
        }

        cliente.nome = nome || cliente.nome
        cliente.email = email || cliente.email
        cliente.senha = senha ? await bcrypt.hash(String(senha), SALT) : cliente.senha

        await cliente.save()
    }
    async Delete(id) {
        if (!id) {
            throw new Error('Favor informar o id')
        }

        const cliente = await Cliente.findByPk(id)

        if (!cliente) {
            throw new Error(`Cliente ${id} não encontrado`)
        }

        await cliente.destroy()
    }
    async Login(email, senha) {
        if (!email || !senha) {
            throw new Error('Email ou senha inválidos')
        }

        const cliente = await Cliente.findOne({ where: { email } })

        if (!cliente 
            || !(await bcrypt.compare(String(senha), cliente.senha))
        ) {
            throw new Error('Email ou senha inválidos')
        }

        return jwt.sign({ id: cliente.id, nome: cliente.nome }, JWT_SEGREDO, { expiresIn: 60 * 60 })
    }
}

export default new ServiceCliente()