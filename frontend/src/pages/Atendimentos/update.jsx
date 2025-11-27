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
            console.log("Usuário alterado com sucesso")
        } else {
            console.log("Erro ao criar Usuário")
            console.log(response)
        }

    }

    return (
        <main>
            <form>
                <div>
                    <label>Nome:</label>
                    <input type="text" name="nome" id="nome" value={atendimento.nome} onChange={handleChange} />
                </div>
                <div>
                    <label>Email:</label>
                    <input type="email" name="email" id="email" value={atendimento.email} onChange={handleChange} />
                </div>
                <div>
                    <label>Senha:</label>
                    <input type="password" name="senha" id="senha" value={atendimento.senha} onChange={handleChange} />
                </div>
                <button 
                    type="reset"
                    onClick={handleReset}
                >Limpar</button>
                <button
                    type="submit"
                    onClick={handleSave}
                >Enviar</button>
            </form>
        </main>
    )
}