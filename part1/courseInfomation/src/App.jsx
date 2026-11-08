import { useState } from 'react'

const Header = (headerText) => {
    return (
        <h1>{headerText.name}</h1>
    )
}
const Part = (partInfo) => {
    return (
        <p>{partInfo.name} {partInfo.count}</p>
    )
}
const Content = (props) => {
    let temp = props.arr
    return (
        <>
            <Part name={temp[0].name} count={temp[0].exercises}/>
            <Part name={temp[1].name} count={temp[1].exercises}/>
            <Part name={temp[2].name} count={temp[2].exercises}/>
        </>
    )
}
const Total = (exercise) => {
    let sum = 0
    exercise.arr.forEach(value => {
        sum += value.exercises 
    })
    return (
        <p>Number of exercises {sum}</p>
    )
}
const App = () => {
    const course = {
        "name": "Half Stack application development",
        "parts":[
            {
                "name": "Fundamentals of React",
                "exercises": 10
            },
            {
                "name": "Using props to pass data",
                "exercises": 7
            }, {
                "name": "State of the component",
                "exercises": 14
            }
        ]
    }
    return (
        <div>
            <Header name={course['name']} />
            <Content arr={course['parts']} />
            <Total arr={course['parts']} />
        </div>
    )
}

export default App
