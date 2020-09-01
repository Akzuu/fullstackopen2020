import React, { useState } from 'react'
import ReactDOM from 'react-dom'

const Button = (props) => (
  <button onClick={props.handleClick}>
    {props.text}
  </button>
)


const App = (props) => {
  const [points, setPoints] = useState(0)
  const [selected, setSelected] = useState(0)

  const pointsCopy = {...points};

  let index = selected;

  let anecdoteWithMostVotesIndex = 0;
  Object.keys(pointsCopy).forEach(key => {
    if (pointsCopy[key] > pointsCopy[anecdoteWithMostVotesIndex]) {
      anecdoteWithMostVotesIndex = key;
    }
  });

  return (
    <div>
      <h1>Random anectode</h1>
      {props.anecdotes[selected]}
      <br />
      This anecdote has {points[index] ? points[index] : 0} votes.
      <br />
      <br />
      <Button handleClick={() => {
        pointsCopy[index] ? pointsCopy[index] += 1 : pointsCopy[index] = 1;
        setPoints(pointsCopy);
      } } text="Vote" />
      <br />
      <Button handleClick={() => {
        index = Math.floor(Math.random() * props.anecdotes.length);
        setSelected(index);
        }} text="Next random anecdote" />

      <h1>Anecdote with the most votes</h1>
      {props.anecdotes[anecdoteWithMostVotesIndex]} <br />
      This anecdote has {points[anecdoteWithMostVotesIndex] ? points[anecdoteWithMostVotesIndex] : 0} votes.
    </div>
  )
}

const anecdotes = [
  'If it hurts, do it more often',
  'Adding manpower to a late software project makes it later!',
  'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
  'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
  'Premature optimization is the root of all evil.',
  'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.'
]

ReactDOM.render(
  <App anecdotes={anecdotes} />,
  document.getElementById('root')
)