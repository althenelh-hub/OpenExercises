import { useState } from 'react'
const Button = ({onClick, text}) => {
    return(
        <button onClick={onClick}>{text}</button>
    )
}
const Mark = ({mark, text}) => {
    return (
        
            <tr>
                <td>{text}</td>
                <td>{mark}</td>
            </tr>
        
    )
}
const Statistics = ({badMark, neutralMark, goodMark }) => {
    const findAverage = () => {
        if (countIsZero()) {
            return 0
        }
        return (goodMark - badMark) / (goodMark + badMark + neutralMark)
    }
    const findPositive = () => {
        if (countIsZero()) {
            return '0%'
        }
        return (goodMark / (badMark + neutralMark + goodMark)) + '%'

    }
    const countIsZero = () => {
        return total() === 0
    }
    const total = () => badMark + neutralMark + goodMark
    if (countIsZero()) {
        return (
            <div>No feedBack given</div>
        )
    }
    return (
        <>
            <h2>statistics</h2>
            <table>
                <tbody>
                    <tr>
                        <th>Mark name</th>
                        <th>Mark count</th>
                    </tr> 
                    <Mark mark={goodMark} text="good: " />
                    <Mark mark={neutralMark} text="neutral: " />
                    <Mark mark={badMark} text="bad: " />
                    <Mark mark={total()} text="all: " />
                    <Mark mark={findAverage()} text="average: " />
                    <Mark mark={findPositive()} text="positive: " />
                </tbody>
            </table>
        </>
    )
}
function App() {
  const [goodMark, setGood] = useState(0)
  const [badMark, setBad] = useState(0)
  const [neutralMark, setNeutral] = useState(0)
  const handleGood = () => {
      setGood(goodMark+1)
  }
  const handleBad = () => {
      setBad(badMark + 1)
      
  }
  const handleNeutral = () => {
      setNeutral(neutralMark+1)
  }
  return (
    <>
      <h1>Give feedback</h1>
      <Button onClick={ handleGood } text="good" />
      <Button onClick={ handleNeutral} text="neutral" />
      <Button onClick={ handleBad } text="bad" />
      <Statistics badMark={badMark} neutralMark={neutralMark} goodMark={goodMark} />
    </>
  )
}
export default App
