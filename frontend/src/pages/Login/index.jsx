import { useContext, useState } from 'react';
import './style.css'
import { useNavigate } from 'react-router-dom';
import { loginCliente } from '../../api/clientes';
import { AuthContext } from '../../auth/Context';

export default function Login() {

    const { login } = useContext(AuthContext)
    const navigate = useNavigate();
    const [email, setEmail] = useState('')
    const [senha, setSenha] = useState('')

    const handleBackClick = () => {
        navigate('/');
    };

    const handleLogin = async (e) => {
        e.preventDefault()
        // verificar se os valor ta certo | email e senha
        try {
            const response = await loginCliente(email, senha)
            login(response.token)
            navigate('/');
        } catch (error) {
            console.error('email ou senha inválidos')
            // ver esse tal de toast
        }
    }

    return (
        <div className="login-container">
            <form className="login-form">
                <h2>Login</h2>
                <div className="input-group">
                    <label htmlFor="email">Email:</label>
                    <input type="text" id="email" required value={email} onChange={(e) => setEmail(e.target.value)} />
                </div>
                <div className="input-group">
                    <label htmlFor="senha">Senha:</label>
                    <input type="password" id="senha" required value={senha} onChange={(e) => setSenha(e.target.value)} />
                </div>
                <p>Não possui conta? <spam className="signup">Cadastre-se</spam></p>
                <button className="button" type="submit" onClick={handleLogin}>Entrar</button>
                <button className="button back-button" onClick={handleBackClick}>
                    Voltar
                </button>
            </form>
        </div>
    );
}