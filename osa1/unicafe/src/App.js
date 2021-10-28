import React, { useState } from 'react'


const Header = () => {
  return(
    <div>
      <h1>Give feedback</h1>
    </div>
  )
}

const Button = ({handleClick, text}) => {
  return(
    <div>
      
      <button onClick = {handleClick}>
      {text}
        </button>
      


    </div>
  )
}


const Statistics = (props) => {
  console.log(props.state)
  
  const N = props.state[0] + props.state[1] + props.state[2]
  if (N !== 0) {
    return(
      <div>
        <table>
          <tbody>
          
            <StatisticsLine text = "good" metric = {props.state[0]} />
            <StatisticsLine text = "neutral" metric = {props.state[1]} />
            <StatisticsLine text = "bad" metric = {props.state[2]} />
            <StatisticsLine text = "average" metric = {(props.state[0]*1 
              + props.state[1]*0 + props.state[1]*(-1))/ N} />
            <StatisticsLine text = "positive" metric = {100*(props.state[0]/N) + '%'}  />
        
          </tbody>
        </table>
        
      {/*
    
      <p>good {props.state[0]}</p>
      <p>neutral {props.state[1]} </p>
      <p>bad {props.state[2]}</p>
      <p>all {all}</p>
      <p>average {(props.state[0]*1 + props.state[1]*0 + props.state[1]*(-1))/
      all}</p>
      <p>positive {100 *(props.state[0]/all)} %</p>
      */}
    </div>
  )
      }
    return (
      <p>No feedback given</p>
    ) 
} 

const StatisticsLine = (props) => {
  return(
    <p>{props.text} {props.metric}</p>
  )
}


const App = () => {
  // save clicks of each button to its own state
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)

  return (
    <div>
      <Header />
      <Button handleClick = {() => setGood(good + 1)} text = "good" /> 
      <Button handleClick = {() => setNeutral(neutral + 1)} text = "neutral" /> 
      <Button handleClick = {() => setBad(bad + 1)} text = "bad" /> 
   
      <h1>Statistics</h1>
      <Statistics state = {[good, neutral, bad]} />
    </div>
  )
}

export default App