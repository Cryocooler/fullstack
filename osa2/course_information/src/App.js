import React from 'react'
import Course from './components/Course'



const App = () => {
  const courses = [
    {
      name: 'Half Stack application development',
      id: 1,
      parts: [
        {
          name: 'Fundamentals of React',
          exercises: 10,
          id: 1
        },
        {
          name: 'Using props to pass data',
          exercises: 7,
          id: 2
        },
        {
          name: 'State of a component',
          exercises: 14,
          id: 3
        },
        {
          name: 'Redux',
          exercises: 11,
          id: 4
        }
      ]
    }, 
    {
      name: 'Node.js',
      id: 2,
      parts: [
        {
          name: 'Routing',
          exercises: 3,
          id: 1
        },
        {
          name: 'Middlewares',
          exercises: 7,
          id: 2
        }
      ]
    }
  ]
  console.log('course', courses[0])
  

  return (
    <div>
      {courses.map(course => <Course course = {course}/>)}
   </div>
  )
}
  /*return (
    <div>
     <Header course = {course} />
     <Content part1 = {part1} exercises1 = {exercises1}
              part2 = {part2} exercises2 = {exercises2}
              part3 = {part3} exercises3 = {exercises3}
              />
     <Total exercises = {exercises1 + exercises2 + exercises3} />
    </div>
  )
}*/

export default App