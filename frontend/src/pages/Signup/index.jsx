import { useContext, useState } from 'react';
import './style.css'
import { useNavigate } from 'react-router-dom';
import { createCliente, loginCliente } from '../../api/clientes';
import { AuthContext } from '../../auth/Context';

export default function Signup() {

    const { login } = useContext(AuthContext)
    const navigate = useNavigate();

    const [nome, setNome] = useState('')
    const [email, setEmail] = useState('')
    const [senha, setSenha] = useState('')

    const handleBackClick = () => {
        navigate('/');
    };

    const handleLogin = () => {
        navigate('/login')
    }

    const handleSignup = async (e) => {
        e.preventDefault()
        try {
            const cliente = { nome, email, senha }
            await createCliente(cliente)
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
                <h2>Cadastro</h2>
                <div className="input-group">
                    <label htmlFor="nome">Nome:</label>
                    <input type="text" id="nome" required value={nome} onChange={(e) => setNome(e.target.value)} />
                </div>
                <div className="input-group">
                    <label htmlFor="email">Email:</label>
                    <input type="text" id="email" required value={email} onChange={(e) => setEmail(e.target.value)} />
                </div>
                <div className="input-group">
                    <label htmlFor="senha">Senha:</label>
                    <input type="password" id="senha" required value={senha} onChange={(e) => setSenha(e.target.value)} />
                </div>
                <p>Já possui conta?<button onClick={handleLogin} className="signup">Login</button></p>
                <button className="button" type="submit" onClick={handleSignup}>Cadastre-se</button>
                <button className="button back-button" onClick={handleBackClick}>Voltar</button>
            </form>
        </div>
    );
}