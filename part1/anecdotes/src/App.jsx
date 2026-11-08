import { useState } from 'react'
const Anecdote = ({anecdote, voteCount}) => {
    return(
        <>
            <h1>Anecdote of the day</h1>
            {anecdote}
            <p>Vote count: {voteCount}</p>
        </>
    )
}
const Button = ({onClick, text}) => <button onClick={onClick}>{text}</button>
const BestAnecdote = ({anecdote}) => {
    return (
        <>
            <h1>Best Anecdote</h1>
            {anecdote}
        </>
    )
}
function App() {
  const [selected, setSelected] = useState(0)
  const [maxim, setMaxim] = useState(0)
  const anecdotes = [
    'If it hurts, do it more often.',
    'Adding manpower to a late software project makes it later!',
    'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
    'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
    'Premature optimization is the root of all evil.',
    'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.',
    'Programming without an extremely heavy use of console.log is same as if a doctor would refuse to use x-rays or blood tests when diagnosing patients.',
    'The only way to go fast, is to go well.'
  ]
  const [votes, setVotes] = useState(new Array(anecdotes.length).fill(0))
  const getRandomInt = (min, max) => {
      min = Math.ceil(min)
      max = Math.floor(max)
      return Math.floor(Math.random() * (max - min) + min)
  }
  const handleAnecdote = () => setSelected(getRandomInt(0, anecdotes.length))
  const handleVote = () => {
      const copy = [...votes]
      copy[selected]++
      if(copy[selected] > copy[maxim]) {
          setMaxim(selected)
      }
      setVotes(copy)
  }
  return (
    <div>
      <Anecdote anecdote={anecdotes[selected]} voteCount={votes[selected]} />
      <Button onClick={handleAnecdote} text="next anecdote" />
      <Button onClick={handleVote} text="vote" />
      <BestAnecdote anecdote={anecdotes[maxim]}/>
    </div>
  )
}

export default App
