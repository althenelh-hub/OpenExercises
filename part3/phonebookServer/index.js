// JavaScript source code
const express = require('express')
const morgan = require('morgan')
const cors = require('cors')
const app = express()
morgan.token('body', (request, response) => {
    return JSON.stringify(request.body)
})
app.use(cors())
app.use(express.static('dist'))
app.use(express.json())
app.use(morgan(':method :url :status :res[content-length] - :response-time ms :body'))


let phones = [
    { 
      "id": "1",
      "name": "Arto Hellas", 
      "number": "040-123456"
    },
    { 
      "id": "2",
      "name": "Ada Lovelace", 
      "number": "39-44-5323523"
    },
    { 
      "id": "3",
      "name": "Dan Abramov", 
      "number": "12-43-234345"
    },
    { 
      "id": "4",
      "name": "Mary Poppendieck", 
      "number": "39-23-6423122"
    }
]

app.get('/phones', (request, response) => {
    response.json(phones)
})
app.get('/info', (request, response) => {
    const requestDatetime = new Date().toString()
    response.send(`<div>phonebook currently has ${phones.length} phones</div>
                   <div>${requestDatetime}</div>`)
    console.log('all good')
})
app.get('/api/persons/:id', (request, response) => {
    const id = request.params.id
    const phone = phones.find(ph => ph.id === id)
    if(phone) {
        console.log(phone)
        return response.json(phone)
    }
    response.status(404).end()
    
    
})
const randomInt = (minValue, maxValue) => {
    return Math.floor(Math.random(minValue, maxValue)*(maxValue-minValue)) + minValue
}
app.post('/api/persons', (request, response) => {
    const id = String(randomInt(1,10000))
    const body = request.body
    const name = body.name
    const number = body.number
    if(!body) {
        return response.status(400).json({"error": "no data"})
    }
    if(!number) {
        return response.status(400).json({"error": "request misses number"})
    }
    if(!name) {
        return response.status(400).json({"error": "request misses name"})
    }
    if(phones.some(ph => ph.name === name)) {
        return response.status(400).json({"error": `${name}\`s phone is already exist in the phonebook`})
    }
    const phone = {
        "name": name,
        "number": number,
        "id": id
    }
    phones = phones.concat(phone)
    response.json(phone)
})
app.delete('/api/persons/:id', (request, response) => {
    const id = request.params.id
    phones = phones.filter(ph => ph.id !== id)
    response.status(204).end()
})
const PORT = 3001
app.listen(PORT, () => {
    console.log('I am working')
})