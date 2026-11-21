// JavaScript source code
//-------------------------------------------------------------------------------------------------------------
//modules
const express = require('express')
const morgan = require('morgan')
require('dotenv').config()
const Phone = require('./modules/phone.js')
//-----------------------------------------------------------------------------------------------------------------
//tokens for morgan
morgan.token('body', (request) => {
  return JSON.stringify(request.body)
})
//-------------------------------------------------------------------------------------------------------------------
//HTTP server and its middleware
const app = express()
app.use(express.static('dist'))
app.use(express.json())
app.use(morgan(':method :url :status :res[content-length] - :response-time ms :body'))
//----------------------------                          Endpoints          ---------------------------------------------------------
//---------------------------------------------------------------------------------------------------------------------------------
//receive all phones
app.get('/api/phones', (request, response) => {
  Phone.find({}).then(phones => {
    console.log(phones)
    response.json(phones)
  })
})
//----------------------------------------------------------------------------------------------------------------------------------
//get the number of currently store phones
app.get('/info', (request, response) => {
  const requestDatetime = new Date().toString()
  Phone.countDocuments({}).then(result => {
    response.send(`<div>phonebook currently has ${result} phones</div>
             <div>${requestDatetime}</div>`)
  })
  console.log('all good')
})
//-----------------------------------------------------------------------------------------------------------------------------------
//get a specific phone
app.get('/api/persons/:id', (request, response, next) => {
  Phone.findById(request.params.id)
    .then(phone => {
      response.json(phone)
    })
    .catch(error => next(error))
})
//--------------------------------------------------------------------------------------------------------------------------------
// add a phone
app.post('/api/persons', (request, response, next) => {
  const body = request.body
  const name = body.name
  const number = body.number
  if(!body) {
    return response.status(400).json({ 'error': 'no data' })
  }
  if(!number) {
    return response.status(400).json({ 'error': 'request misses number' })
  }
  if(!name) {
    return response.status(400).json({ 'error': 'request misses name' })
  }
  const phone = new Phone({
    'name': name,
    'number': number,
  })
  phone.save()
    .then(savedPhone => {
      response.json(savedPhone)
    })
    .catch(error => next(error))
})
app.put('/api/persons/:id', (request, response, next) => {
  const { number } = request.body
  Phone.findById(request.params.id)
    .then(phone => {
      phone.number = number
      phone.save().then(updatedPhone => {
        response.json(updatedPhone)
      })
    })
    .catch(error => next(error))
})
app.delete('/api/persons/:id', (request, response, next) => {
  Phone.findByIdAndDelete(request.params.id)
    .then(() => {
      response.status(204).end()
    })
    .catch(error => next(error))
})
//-----------------------------------------------------------------------------
//error handlers
const errorHandler = (error, request, response, next) => {
  if (error.name === 'CastError') {
    return response.status(400).json({ 'error': 'malformmated id' })
  }
  if (error.name === 'ValidationError') {
    console.log(error.message)
    if (request.body.name.length < 3) {
      return response.status(400).json({ 'error': 'shortName' })
    }
    else if (!/^\d{2,3}-\d{5,}/.test(request.body.number)) {
      return response.status(400).json({ 'error': 'wrongNumber' })
    }
  }
  console.log(error)
  next(error)
}
app.use(errorHandler)
const PORT = process.env.PORT
app.listen(PORT, () => {
  console.log('I am working')
})