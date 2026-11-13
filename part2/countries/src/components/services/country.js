// JavaScript source code
import axios from 'axios'
const baseUrl = `https://studies.cs.helsinki.fi/restcountries/api`
const getNames = () => {
    return axios
        .get(`${baseUrl}/all`)
        .then(response => {
            return response.data.map(c => {
                return { 'official': c.name.official, 'common': c.name.common }
            })
            

        })
        
}
const getCountry = name => {
    return axios.get(`${baseUrl}/name/${name}`)
        
}
export default {getNames, getCountry}