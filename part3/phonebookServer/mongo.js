// JavaScript source code
const mongoose = require('mongoose')
if (process.argv.length < 3) {
    console.log('enter password')
    process.exit(1)
}
const password = process.argv[2]
const url = `mongodb://OpenDB_walkuncle:${password}@ajxxfa.h.filess.io:27018/OpenDB_walkuncle`
mongoose.connection.on('connect', () => {
    console.log('connected')
})
mongoose.connect(url, { family: 4 })
const PhoneSchema = mongoose.Schema({
    name: String,
    number: String
})
const Phone = new mongoose.model('Phone', PhoneSchema)
if (process.argv.length == 5) {
    console.log('third')
    console.log(process.argv[3])
    console.log(process.argv[4])
    const phone = new Phone({
        name: process.argv[3],
        number: process.argv[4]
    })
    phone.save().then(result => console.log('success'))
    mongoose.connection.close()
}
else if (process.argv.length == 3) {
    console.log('second')
    Phone.find({}).then(result => {
        result.map(phone => console.log(`${phone.name} ${phone.number}`))
        mongoose.connection.close()
    })
}
