import './style.css'
import { useEffect, useState } from 'react'
import { getTodosAtendimentos } from '../../api/atendimentos'

function TodosAtendimentos() {
    const [conteudo, setConteudo] = useState([])

    useEffect(() => {
        async function carregar() {
            const todosAtendimentos = await getTodosAtendimentos()
            setConteudo(todosAtendimentos)
        }
        carregar()
    }, [])

    return (
        <main>
            {
                conteudo.length == 0
                    ? <div>
                        <label>Nada</label>
                    </div>
                    : conteudo.map(atendimento =>
                        <div className='card char' key={atendimento.id}>
                            <h2>Data: {atendimento.dia}</h2>
                            <h2>Hora: {atendimento.hora}</h2>
                            <h2>Valor: {atendimento.valor}</h2>
                            <h2>Concluido: {atendimento.concluido ? 'Sim' : 'Não'}</h2>
                        </div>)
            }
        </main>
    )
}

export default TodosAtendimentos