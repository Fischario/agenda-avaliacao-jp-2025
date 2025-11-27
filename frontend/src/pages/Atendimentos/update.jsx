import { useState } from "react"
import { useLocation, useNavigate } from "react-router-dom";
import { updateAtendimento } from "../../api/atendimentos";


export default function UpdateAtendimento() {
    const navigate = useNavigate()
    const [atendimento, setAtendimentos] = useState({
        dia: '',
        hora: '',
        valor: '',
        concluido: true
    })

    const location = useLocation()
    const { atendimento: prevAtendimentos } = location.state


    const handleChange = (e) => {
        const { id, value } = e.target;
        setAtendimentos({
            ...atendimento,
            [id]: value
        })
    }

    const handleReset = (e) => {
        e.preventDefault()
        setAtendimentos({ ...prevAtendimentos })
    }

    const handleSave = async (e) => {
        e.preventDefault()
        const response = await updateAtendimento(prevAtendimentos.id, atendimento)

        if (response.status === 200) {
            navigate('/atendimentos')
            console.log("Atendimento alterado com sucesso")
        } else {
            console.log("Erro ao alterar atendimento")
            console.log(response)
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
                <button type="reset" onClick={handleReset}>Limpar</button>
                <button type="submit" onClick={handleSave}>Enviar</button>
            </form>
        </main>
    )
}