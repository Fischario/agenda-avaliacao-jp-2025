import api from "./api"

export const getAtendimentos = async () => {
    const response = await api.get('api/v1/atendimentos')

    if (response.status != 200) {
        throw new Error(response.status)
    }

    return response.data.atendimentos
}

export const getTodosAtendimentos = async () => {
    const response = await api.get('api/v1/todosatendimentos')

    if (response.status != 200) {
        throw new Error(response.status)
    }

    return response.data.atendimentos
}

export const createAtendimento = async (atendimento) => {
    const response = await api.post('api/v1/atendimento', atendimento)
    
    if (response.status != 201) {
        throw new Error(response.status)
    }

    return response
}

export const updateAtendimento = async (id, atendimento) => {
    const response = await api.put(`api/v1/atendimento/${id}`, atendimento)

    if (response.status != 200) {
        throw new Error(response.status)
    }

    return response
}

export const deleteAtendimento = async (id) => {
    const response = await api.delete(`api/v1/atendimento/${id}`)

    if (response.status != 204) {
        throw new Error(response.status)
    }

    return response
}