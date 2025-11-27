import { useState } from 'react';
import { createAtendimento } from "../../api/atendimentos"
import { useNavigate } from "react-router-dom"

export default function CreateAtendimento() {
    const navigate = useNavigate()
    const [atendimento, setAtendimento] = useState({
        dia: '',
        hora: '',
        valor: '',
        concluido: true,
        clienteId: localStorage.getItem('clienteLogado')
    })

    const handleChange = (e) => {
        const { id, value } = e.target;
        setAtendimento({
            ...atendimento,
            [id]: value
        })
    }

    const handleSave = async (e) => {
        e.preventDefault()
        const response = await createAtendimento(atendimento)
        if (response.status == 201) {
            navigate('/atendimentos')
        }
    }

    return (
        <main>
            <form>
                <div>
                    <label>Dia: </label>
                    <input type="date" name="dia" id="dia" value={atendimento.dia} onChange={handleChange} />
                </div>
                <div>
                    <label>Hora: </label>
                    <input type="time" name="hora" id="hora" value={atendimento.hora} onChange={handleChange} />
                </div>
                <div>
                    <label>Valor: </label>
                    <input type="text" name="valor" id="valor" value={atendimento.valor} onChange={handleChange} />
                </div>
                <div>
                    <label>Concluido: </label>
                    <select name="concluido" id="concluido" value={atendimento.concluido} onChange={handleChange}>
                        <option value="true">Sim</option>
                        <option value="false">Não</option>
                    </select>
                </div>
                <button type="submit" onClick={handleSave}>Enviar</button>
                <button type="reset">Limpar</button>
            </form>
        </main>
    )
}