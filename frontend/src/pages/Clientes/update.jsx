import { useState } from "react"
import { useLocation, useNavigate } from "react-router-dom";
import { updateCliente } from "../../api/clientes";


export default function UpdateCliente() {
    const navigate = useNavigate()
    const [cliente, setClientes] = useState({
        nome: '',
        email: '',
        senha: '',
        ativo: true
    })

    const location = useLocation()
    const { cliente: prevClientes } = location.state


    const handleChange = (e) => {
        const { id, value } = e.target;
        setClientes({
            ...cliente,
            [id]: value
        })
    }

    const handleReset = (e) => {
        e.preventDefault()
        setClientes({ ...prevClientes, senha: '' })
    }

    const handleSave = async (e) => {
        e.preventDefault()
        const response = await updateCliente(prevClientes.id, cliente)

        if (response.status === 200) {
            navigate('/clientes')
            console.log("Cliente alterado com sucesso")
        } else {
            console.log("Erro ao alterar cliente")
            console.log(response)
        }

    }

    return (
        <main>
            <form>
                <div>
                    <label>Nome:</label>
                    <input type="text" name="nome" id="nome" value={cliente.nome} onChange={handleChange} />
                </div>
                <div>
                    <label>Email:</label>
                    <input type="email" name="email" id="email" value={cliente.email} onChange={handleChange} />
                </div>
                <div>
                    <label>Senha:</label>
                    <input type="password" name="senha" id="senha" value={cliente.senha} onChange={handleChange} />
                </div>
                <button type="reset" onClick={handleReset}>Limpar</button>
                <button type="submit" onClick={handleSave}>Enviar</button>
            </form>
        </main>
    )
}