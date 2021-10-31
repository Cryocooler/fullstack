import React from 'react'




const Course = ({course}) => {
  const {id, name, parts} = course
  console.log('id', id)
  console.log('name', name)
  console.log('parts', parts)

  return(
    <div>
      
      <Header name = {name} />
      <Content parts = {parts}/>
      <Total parts = {parts} />
    </div>
    
  )
}

const Header = ({name})=> {
  console.log('name')

  return (
    <div>
      <h1>
      {name}
      </h1>
    </div>
  )
}

const Content = ({parts}) => {
  const part = parts.map(parts => parts.exercises)
  console.log('part', part)
  return (
    <div>
    <Part parts = {parts}/>


   
    </div>
  )
}

const Part = ({parts}) => {
  console.log('part prop!!!!', parts) 
  console.log('test', parts.map(part => part.content))
 
  return (
    <div>
      {parts.map(part => 
      <p key = {part.id}>
        {part.name} {part.exercises}
      </p>
      )}
    </div>
  )
}

const Total = ({parts}) => {
  // receive parts object, map part exercises to an array that is reduced with sum
  
  return (
    <div>
     <b>Total of {(parts.map(part => part.exercises)).reduce((x,y) => x + y, 0)} exercises</b>
    </div>
  )
}

export default Course