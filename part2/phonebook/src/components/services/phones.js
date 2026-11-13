import axios from 'axios'
const baseUrl = 'http://localhost:3001/persons'

const getPhones = () => {
    return axios.get(baseUrl).then(response => response.data)
}
const create = (phone) => {
    return axios.post(baseUrl, phone).then(response => response.data)
}
const deletePhone = (id) => {
    return axios.delete(`${baseUrl}/${id}`).then(response => response.data)
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
