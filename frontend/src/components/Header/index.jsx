import { useContext } from 'react'
import './style.css'
import { Link } from 'react-router-dom'
import { AuthContext } from '../../auth/Context'

export default function Header() {

    const { token } = useContext(AuthContext)

    return (
        <header>
            <h1>Fullstack</h1>
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
                    </>
                }
                <Link to={'/login'}>
                    <h2>Login</h2>
                </Link>
            </nav>
        </header>
    )
}