import { useState, useEffect } from 'react'
import phoneService from './components/services/phones.js'
import './index.css'
import Notification from './components/Notification.jsx'
const Filter = (props) => {
    return (
        <div>filter show with: <input value={props.value} onChange={ props.onChange } /></div>
    )
}
const PhoneForm = (props) => {
    return (
        <>
            <h1>add a new number</h1>
            <form onSubmit={props.addPhone}>
                <div>name: <input value={props.phone.name} onChange={props.handleNameChange} /></div>
                <div>number: <input value={props.phone.number} onChange={props.handleNumberChange} /></div>
                <button type="submit">Add phone</button>
            </form>
        </>
    )
}
const Phone = (props) => {
    return (
        <div>
            {props.phoneName} {props.phoneNumber}
            <button onClick={props.deletePhone}>delete</button>
        </div>
    )
}
const Phones = (props) => {
    return (
        <>
            <h1>Numbers</h1>
            {props.arr.map(phone => <Phone deletePhone={() => props.deletePhone(phone.id)} key={ phone.name } phoneName={phone.name} phoneNumber={ phone.number } />)}
        </>
    )
}

function App() {
    const [phonenumbers, setPhoneNumbers] = useState([])
    const [phoneName, setPhoneName] = useState('')
    const [filterTerm, setFilter] = useState('')
    const [phoneNumber, setPhoneNumber] = useState('')
    const [notification, setNotification] = useState('Halo')
    const [notificationType, setNotificationType] = useState('Accept')
    const handleFilterTerm = (event) => {
        setFilter(event.target.value)
    }
    useEffect(() => {
        phoneService.getPhones().then(response => setPhoneNumbers(response))
    }, [])
    const addPhone = (event) => {
        event.preventDefault()
        const phoneObject = phonenumbers.find(number => number.name === phoneName)
        if (phoneObject) {
            if(confirm(`${phoneName} is already added to the phoneboook. Do you wish to update their phone number`)) {
                const newObject = { ...phoneObject, number: phoneNumber}
                phoneService.updateNumber(newObject.id, newObject)
                    .then(response => {
                        setNotification(`${phoneName} phone number was successfully changed`)
                        setNotificationType('Accept')
                        setTimeout(() => setNotification(null), 5000)
                        setPhoneNumbers(phonenumbers.map(number => number.name === phoneName ? response : number))
                        setPhoneName('')
                        setPhoneNumber('')
                    })
                    .catch(error => {
                        setNotification(`${phoneName} was removed from the server`)
                        setNotificationType('Error')
                        setTimeout(() => setNotification(null), 5000)
                        setPhoneNumbers(phonenumbers.filter(number => number.name !== phoneName))
                        setPhoneName('')
                        setPhoneNumber('')
                        
                    })
            }
        }
        else {
            const phoneObject = { name: phoneName, number: phoneNumber }
            phoneService.create(phoneObject).then(data => {
                setPhoneNumbers(phonenumbers.concat(data))
                setNotification(`${phoneName} was successfully added to the phonebook`)
                setNotificationType('Accept')
                setTimeout(() => setNotification(null), 3000)
                setPhoneNumber('')
                setPhoneName('')
            })
        }
    }
    const handleNameChange = (event) => {
        setPhoneName(event.target.value)
    }
    const handleNumberChange = (event) => {
        setPhoneNumber(event.target.value)
    }
    const deletePhone = id => {
        const phoneObject = phonenumbers.find(phone => phone.id === id)
        if(window.confirm(`Are you sure you want to delete ${phoneObject.name}`)) {
            phoneService.deletePhone(id)
                .then(data => setPhoneNumbers(phonenumbers.filter(number => number.id !== data.id)))
                .catch(error => alert(`You cannot delete ${phoneObject.name} because of ${error}`))
        }
    }
    const filteredNumbers = phonenumbers.filter(phone => phone.name.includes(filterTerm))
    return (
        <>
            <h1>phonebook</h1>
            <Notification message={notification} notificationType={notificationType}/>
            <Filter value={filterTerm} onChange={handleFilterTerm} />
            <PhoneForm addPhone={addPhone} phone={{ name: phoneName, number: phoneNumber }}
                handleNameChange={handleNameChange} handleNumberChange={handleNumberChange} />  
            <Phones arr={filteredNumbers } deletePhone={deletePhone} />

        </>
        
    )
    
}

export default App
