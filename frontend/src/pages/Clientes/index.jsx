import './style.css'
import { useEffect, useState } from 'react'
import { deleteCliente, getClientes } from '../../api/clientes'
import { Link, useNavigate } from 'react-router-dom'

function Clientes() {
    const navigate = useNavigate()
    const [conteudo, setConteudo] = useState([])

    const handleUpdate = async (cliente) => {
        navigate('/update/cliente', { state: { cliente } })
    }

    const handleDelete = async (id) => {
        const response = await deleteCliente(id)

        if (response.status != 204) {
            console.log('deu pra deletar não, foi mal aí')
            return
        }

        setConteudo(clientes => clientes.filter(cliente => cliente.id != id))
    }

    useEffect(() => {
        async function carregar() {
            const todosClientes = await getClientes()
            setConteudo(todosClientes)
        }
        carregar()
    }, [])

    return (
        <main>
            <Link to={'/create/cliente'}>
                <button>Criar</button>
            </Link>
            {
                conteudo.length == 0
                    ? <div>
                        <label>Nada</label>
                    </div>
                    : conteudo.map(cliente =>
                        <div className='card char' key={cliente.id}>
                            <h2>Nome: {cliente.nome}</h2>
                            <h2>Email: {cliente.email}</h2>
                            <div className='actions'>
                                <button type='button' onClick={() => handleUpdate(cliente)}>Alterar</button>
                                <button type='button' onClick={() => handleDelete(cliente.id)}>Deletar</button>
                            </div>
                        </div>)
            }
        </main>
    )
}

export default Clientes