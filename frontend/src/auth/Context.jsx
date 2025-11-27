import { createContext, useEffect, useState } from "react";
import { jwtDecode } from 'jwt-decode'

const isTokenValid = (token) => {
    try {
        const decoded = jwtDecode(token)
        const currentTime = Date.now() / 1000
        return decoded.exp > currentTime
    } catch (error) {
        return false
    }
}

export const pegarIdCliente = (token) => {
    const decoded = jwtDecode(token)
    return decoded.id
}

export const AuthContext = createContext()

export const AuthProvider = ({ children }) => {
    const [token, setToken] = useState(null)
    // const [clienteId, setClienteId] = useState(null)

    const login = (token) => {
        setToken(token)
        localStorage.setItem('token', token)
        localStorage.setItem('clienteLogado', pegarIdCliente(token))
    }

    const logout = () => {
        setToken(null)
        localStorage.removeItem('token')
        localStorage.removeItem('clienteLogado')
    }

    useEffect(() => {
        const storageToken = localStorage.getItem('token')
        if (storageToken && isTokenValid(storageToken)) {
            setToken(storageToken)
        }
        else {
            setToken(null)
            localStorage.removeItem('token')
        }
    }, [])

    return (
        <AuthContext.Provider value={{ token, login, logout }}>
            {children}
        </AuthContext.Provider>
    )
}