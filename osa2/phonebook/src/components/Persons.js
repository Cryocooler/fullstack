import React from 'react'


const Persons = ({ persons, appliedFilter, removePerson }) => {
    
    return(
       <div>
         {persons.filter(person => person.name.toLowerCase().includes(appliedFilter.toLowerCase())).map(person =>
            <div key = {person.name}> 
            {person.name} {person.number}
            <button onClick = {()=> removePerson(person.id)}> delete</button> </div> )}
       </div>
  
    )
  }


export default Persons