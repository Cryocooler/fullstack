import React, { useState, useEffect } from 'react'
import personService from './services/persons'
import Filter from './components/Filter'
import Persons from './components/Persons'
import PersonForm from './components/PersonForm'
import Notif from './components/Notif'

const Error = ( {message} ) => {
  if (message === null) {
    return null
  }
  return(
    <div className ="error">
    {message}
    </div>
  )
}


const App = () => {
  //initial state, phonebook with one entry
  const [ persons, setPersons ] = useState([]) 
  const [ newName, setNewName ] = useState('')
  const [ newNumber, setNewNumber ] = useState('')
  const [ newFilter, setNewFilter ] = useState('')
  const [ success, setSuccessMessage ] = useState(null)
  const [errorMessage, setErrorMessage ] = useState(null)
  console.log('persons', persons)
  console.log('iftest', persons.map(person => person.name).includes('Arto Hellas'))


  useEffect(() => {
      personService
      .getAll()
      .then(initialPersons => {
        setPersons(initialPersons)
        })
      }, [])
    console.log('render', persons.length, 'persons')


  const handleNameChange = (event) => {
    console.log('target', event.target.value)
    setNewName(event.target.value)
  }

  const addName = (event) => {
    event.preventDefault()
    setNewName(event.target.value)
    const nameObject = {
      name : newName,
      number : newNumber
    }
    if (persons.map(person => person.name).includes(newName)) {
      window.confirm(`${newName} is already added to phonebook, do you want to relace the old number with a new one?`)
      const updatedPerson = persons.find(p => p.name === newName)
      const changedNumber = {...updatedPerson, number: newNumber}
      
      personService
      .update(updatedPerson.id, changedNumber)
      .then(response => {setPersons(persons.map(name => name.id !== updatedPerson.id ? name: response))
        setSuccessMessage(`Changed number for ${newName}`)
        setTimeout(() => {
          setSuccessMessage(null)
        }, 2000)
       })
        .catch(error => {
        setErrorMessage(
          `Information of ${updatedPerson.name} was already removed from server `
        )
        setTimeout(() => {
          setErrorMessage(null)
        }, 3000)
      })
    } else {  
        personService
        .create(nameObject)
        .then(response => {
          console.log(response)
          setNewName('')
          setNewNumber('')
          personService
          .getAll()
          .then(updatedPersons => {
            setPersons(updatedPersons)
            setSuccessMessage(`Added ${newName}`)
            setTimeout(() => {
              setSuccessMessage(null)
            }, 2000)
            

        }) 

        
      })
      .catch(error => {
        setErrorMessage(`${newName} was already removed from server`)
        setTimeout(() => {
          setErrorMessage(null)
        }, 2000)
      })
   
      
     

      
    } 
  }
  
  const deleteName = (id) => {
    console.log('person id', persons.filter(person => person.id === id)[0].name)
    if (window.confirm(`Delete  ${persons.filter(person => person.id === id)[0].name} ?`) )
    
    personService
    .remove(id)
    .then(response => {
      console.log(response)
      setPersons(persons.filter(person => person.id !== id))
      
    })
  }

  console.log('mapped id', persons.map(person => person.id))


 
  const handleFilter = (event) => {
    console.log('filteri', event.target.value)
    setNewFilter(event.target.value)
    const slice = persons.filter(person => person.name.toLowerCase().includes(newFilter.toLowerCase()))

    console.log('slice', slice)

  }

  const handleNumberChange = (event) => {
    console.log('')
    setNewNumber(event.target.value)
  }

  return (
    <div>
      <h2>Phonebook</h2>
      <Notif message = {success} />
      <Error message = {errorMessage} />
      <Filter input = {newFilter} handleChange = {handleFilter} />
      <h2>Add a new </h2>
      <PersonForm formTrigger = {addName}
                  inputName = {newName}
                  inputNumber = {newNumber}
                  personChange = {handleNameChange}
                  numberChange = {handleNumberChange}
                  
                  
        />
    
      <h2>Numbers</h2>
  
       
      <Persons persons = {persons} 
      appliedFilter = {newFilter}
      removePerson = {deleteName} />
      
    </div>
  )
}

export default App