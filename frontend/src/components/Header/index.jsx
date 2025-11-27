import './style.css'
import { useContext } from 'react'
import { Link } from 'react-router-dom'
import { AuthContext } from '../../auth/Context'

export default function Header() {

    const { token } = useContext(AuthContext)

    return (
        <header>
            <h1>Avaliação Agenda</h1>
            <nav>
                <Link to={'/'}>
                    <h2>Home</h2>
                </Link>
                {
                    !token ? null :
                    <>
                        <Link to={'/clientes'}>
                            <h2>Clientes</h2>
                        </Link>

                        <Link to={'/atendimentos'}>
                            <h2>Atendimentos</h2>
                        </Link>
                        
                        <Link to={'/todosatendimentos'}>
                            <h2>Todos Atendimentos</h2>
                        </Link>
                    </>
                }
                <Link to={'/login'}>
                    <h2>Login</h2>
                </Link>
            </nav>
        </header>
    )
}