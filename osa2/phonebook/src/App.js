import React, { useState } from 'react'

const Filter = ({input, handleChange}) =>
{
  return(
    <div>
      filter shown with 
      <input value = {input} onChange = {handleChange} />

    </div>

  )
}

const PersonForm = ({formTrigger, inputName, inputNumber, personChange, numberChange}) => {

  return(
    <div>
      <form onSubmit = {formTrigger} >
        <div>
          name: <input value = {inputName} onChange = {personChange}/>
        </div>
        <div>
          number: <input value = {inputNumber} onChange = {numberChange} />
        </div>
        <div>
          <button type="submit">add</button>
        </div>
      </form>
    </div>

  )
}

const Persons = ({ persons, appliedFilter }) => {
  console.log('passed persons', persons.filter(person => person.name.toLowerCase().includes(appliedFilter.toLowerCase())))
  return(
     <div>
       {persons.filter(person => person.name.toLowerCase().includes(appliedFilter.toLowerCase())).map(person =>
          <div key = {person.name}> 
          {person.name} {person.number} </div> )}
     </div>

  )
}

const App = () => {
  //initial state, phonebook with one entry
  const [ persons, setPersons ] = useState([
    { name: 'Arto Hellas', number: '040-123456', id: 1 },
    { name: 'Ada Lovelace', number: '39-44-5323523', id: 2 },
    { name: 'Dan Abramov', number: '12-43-234345', id: 3 },
    { name: 'Mary Poppendieck', number: '39-23-6423122', id: 4 }
  ]) 
  const [ newName, setNewName ] = useState('')
  const [ newNumber, setNewNumber ] = useState('')
  const [ newFilter, setNewFilter ] = useState('')
  console.log('persons', persons)
  console.log('iftest', persons.map(person => person.name).includes('Arto Hellas'))


  const handleNameChange = (event) => {
    console.log('target', event.target.value)
    setNewName(event.target.value)
  }

  const addName = (event) => {
    event.preventDefault()
    setNewName(event.target.value)
    const nameObject = {
      name : newName,
      id : newName,
      number : newNumber
    }
   
    
    if (persons.map(person => person.name).includes(newName)) {
      window.alert(`${newName} is already added to phonebook`)
      setNewName('')
      setNewNumber('')
    } else {
      setPersons(persons.concat(nameObject))
      setNewName('')
      setNewNumber('')
    } 
  }
  
  const handleNumberChange = (event) => {
    console.log('phnu', event.target.value)
    setNewNumber(event.target.value)
  }
 
  const handleFilter = (event) => {
    console.log('filteri', event.target.value)
    setNewFilter(event.target.value)
    const slice = persons.filter(person => person.name.toLowerCase().includes(newFilter.toLowerCase()))

    console.log('slice', slice)

  }

  return (
    <div>
      <h2>Phonebook</h2>
      <Filter input = {newFilter} handleChange = {handleFilter} />
      <h2>Add a new </h2>
      <PersonForm formTrigger = {addName}
                  inputName = {newName}
                  inputNumber = {newNumber}
                  personChange = {handleNameChange}
                  numberChange = {handleNumberChange}
        />
    
      <h2>Numbers</h2>
  
       
      <Persons persons = {persons} appliedFilter = {newFilter} />
      
    </div>
  )
}

export default App