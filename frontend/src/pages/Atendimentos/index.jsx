import './style.css'
import { useEffect, useState } from 'react'
import { deleteAtendimento, getAtendimentos } from '../../api/atendimentos'
import { Link, useNavigate } from 'react-router-dom'

function Atendimentos() {
    const navigate = useNavigate()
    const [conteudo, setConteudo] = useState([])

    const handleUpdate = async (atendimento) => {
        navigate('/update/atendimento', { state: { atendimento } })
    }

    const handleDelete = async (id) => {
        const response = await deleteAtendimento(id)

        if (response.status != 204) {
            console.log('deu pra deletar não, foi mal aí')
            return
        }

        setConteudo(atendimentos => atendimentos.filter(atendimento => atendimento.id != id))
    }

    useEffect(() => {
        async function carregar() {
            const todosAtendimentos = await getAtendimentos()
            setConteudo(todosAtendimentos)
        }
        carregar()
    }, [])

    return (
        <main>
            <Link to={'/create/atendimento'}>
                <button>Criar</button>
            </Link>
            {
                conteudo.length == 0
                    ? <div>
                        <label>Nada</label>
                    </div>
                    : conteudo.map(atendimento =>
                        <div className='card char' key={atendimento.id}>
                            <h2>{atendimento.dia}</h2>
                            <h2>{atendimento.hora}</h2>
                            <h2>{atendimento.valor}</h2>
                            <div className='actions'>
                                <button type='button' onClick={() => handleUpdate(atendimento)}>Alterar</button>
                                <button type='button' onClick={() => handleDelete(atendimento.id)}>Deletar</button>
                            </div>
                        </div>)
            }
        </main>
    )
}

export default Atendimentos