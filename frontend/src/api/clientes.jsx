import api from "./api"

export const getClientes = async () => {
    const response = await api.get('api/v1/clientes')

    if (response.status != 200) {
        throw new Error(response.status)
    }

    return response.data.clientes
}

export const createCliente = async (cliente) => {
    const response = await api.post('api/v1/cliente', cliente)
    
    if (response.status != 201) {
        throw new Error(response.status)
    }

    return response
}

export const updateCliente = async (id, cliente) => {
    const response = await api.put(`api/v1/cliente/${id}`, cliente)

    if (response.status != 200) {
        throw new Error(response.status)
    }

    return response
}

export const deleteCliente = async (id) => {
    const response = await api.delete(`api/v1/cliente/${id}`)

    if (response.status != 204) {
        throw new Error(response.status)
    }

    return response
}

export const loginCliente = async (email, senha) => {
    const response = await api.post('api/v1/login', { email, senha })

    if (response.status != 200) {
        throw new Error(response.status)
    }

    return response.data
}