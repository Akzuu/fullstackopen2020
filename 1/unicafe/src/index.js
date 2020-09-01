import React, { useState } from 'react'
import ReactDOM from 'react-dom'

const StaticsLine = ({text, value, unit}) => <div>{text} {value} {unit} <br /></div>

const Statics = ({good, bad, neutral}) => {
  const all = good + bad + neutral;

  if (all === 0) {
    return <div> No deedback given </div>
  }

  return <div>
    <StaticsLine text={"good"} value={good} />
    <StaticsLine text={"neutral"} value={neutral} />
    <StaticsLine text={"bad"} value={bad} />
    <StaticsLine text={"all"} value={all} />
    <StaticsLine text={"average"} value={(good - bad) / all} />
    <StaticsLine text={"positive"} value={(good / all) * 100} unit={"%"} />
  </div>
}

const Button = (props) => (
  <button onClick={props.handleClick}>
    {props.text}
  </button>
)

const App = () => {
  // tallenna napit omaan tilaansa
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)

  return (
    <div>
      <h1>give feedback</h1>
      <Button handleClick={() => setGood(good+1)} text="good" />
      <Button handleClick={() => setNeutral(neutral+1)} text="neutral" />
      <Button handleClick={() => setBad(bad+1)} text="bad" />

      <h1>statics</h1>
      <Statics good={good} bad={bad} neutral={neutral} />
    </div>
  )
}

ReactDOM.render(<App />, 
  document.getElementById('root')
)