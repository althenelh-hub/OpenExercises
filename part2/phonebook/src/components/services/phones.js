import axios from 'axios'
const baseUrl = '/api'

const getPhones = () => {
    console.log(`${baseUrl}/phones`)
    return axios.get(`${baseUrl}/phones`).then(response => {
        console.log(response.data)
        return response.data
    })
}
const create = (phone) => {
    return axios.post(`${baseUrl}/persons`, phone).then(response => {
        return response.data
    })
}
const deletePhone = (id) => {
    return axios.delete(`${baseUrl}/persons/${id}`).then(response => response.data)
}
const updateNumber = (id, phoneObject) => {
    return axios.put(`${baseUrl}/persons/${id}`, phoneObject).then(response => response.data)
}
export default {
    getPhones,
    create,
    deletePhone,
    updateNumber
}
