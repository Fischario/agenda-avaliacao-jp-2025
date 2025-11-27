import { useState } from "react"
import { createCliente } from "../../api/clientes"
import { useNavigate } from "react-router-dom"

export default function CreateCliente() {
    const navigate = useNavigate()
    const [ cliente, setCliente ] = useState({
        nome: '',
        email: '',
        senha: ''
    })

    const handleChange = (e) => {
        const { id, value } = e.target;
        setCliente({
            ...cliente,
            [id]: value
        })
    }

    const handleSave = async (e) => {
        e.preventDefault()
        const response = await createCliente(cliente)
        if (response.status == 201) {
            navigate('/clientes')
        }
    }

    return (
        <main>
            <form>
                <div>
                    <label>Nome: </label>
                    <input type="text" name="nome" id="nome" value={cliente.nome} onChange={handleChange}/>
                </div>
                <div>
                    <label>Email: </label>
                    <input type="email" name="email" id="email" value={cliente.email} onChange={handleChange}/>
                </div>
                <div>
                    <label>Senha: </label>
                    <input type="password" name="senha" id="senha" value={cliente.senha} onChange={handleChange}/>
                </div>
                <button type="submit" onClick={handleSave}>Enviar</button>
                <button type="reset">Limpar</button>
            </form>
        </main>
    )
}