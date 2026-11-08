import { useState } from 'react'
import heroImg from './assets/hero.png'
import reactLogo from './assets/react.svg'
import viteLogo from './assets/vite.svg'
import './App.css'

const Hello = (props) => {
    console.log(props)
    return (
        <>
            <p>Hello {props.name} of age {props.age}</p>
        </>
    )
}
const App = () => {
    const date = new Date()
    const name = "Ophelia"
    const a = 10
    const b = 20
  return (
    <>
          <h1>Greetings <Hello name="George" age={26} /></h1>
          <h1>Greetings <Hello name={name} age={a + b} /></h1>
    </>
  )
}

export default App
