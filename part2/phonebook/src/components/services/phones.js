import axios from 'axios'
const baseUrl = ''

const getPhones = () => {
    return axios.get(`${baseUrl}/phones`).then(response => response.data)
}
const create = (phone) => {
    return axios.post(`${baseUrl}/api/persons`, phone).then(response => response.data)
}
const deletePhone = (id) => {
    return axios.delete(`${baseUrl}/api/persons/${id}`).then(response => response.data)
}
const updateNumber = (id, phoneObject) => {
    return axios.put(`${baseUrl}/${id}`, phoneObject).then(response => response.data)
}
export default {
    getPhones,
    create,
    deletePhone,
    updateNumber
}
