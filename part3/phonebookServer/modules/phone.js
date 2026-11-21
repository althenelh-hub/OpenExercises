const mongoose = require('mongoose')
const url = process.env.MONGODB_URL
mongoose.set('strictQuery', false)
mongoose.connect(url, { family: 4 })
  .then(() => {
    console.log('connected')
  })
  .catch(error => {
    console.log('failed to connect to the database', error)
  })
const phoneSchema = new mongoose.Schema({
  name: {
    type: String,
    minLength: 3
  },
  number: {
    type: String,
    minLength: 8,
    validate: {
      validator: (v) => {
        return /^\d{2,3}-\d{5,}/.test(v)
      },
      message: props => `${props.number} is invalid number format`
    }
  }
})
phoneSchema.set('toJSON', {
  transform: (document, returnObject) => {
    returnObject.id = returnObject._id
    delete returnObject._id
    delete returnObject.__v
  }
})
module.exports = mongoose.model('Phone', phoneSchema)
