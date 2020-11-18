import React, { useEffect, useState } from 'react'
import personService from './services/persons'
import './App.css'

const Person = (props) => {
  return (
    <div>
      {props.name}: {props.number}
      <button onClick={props.removeNumber}>Delete</button>
    </div>
  )
}

const SearchForm = ({ newFilter, handleFilterChange }) => {
  return (
    <div>
      <form>
        <div>
          Filter phonebook with name:
          <input
            value={ newFilter }
            onChange={ handleFilterChange }
            />
        </div>
      </form>
    </div>
  )
}

const NewPersonForm = ({ addPerson, newName, handlePersonsChange, newNumber, handleNumberChange }) => {
  return (
    <div>
      <form onSubmit={ addPerson }>
        <div>
          name: <input 
            value={ newName }
            onChange={ handlePersonsChange }
          />
        </div>
        <div>
          number: 
          <input
            value={ newNumber }
            onChange= { handleNumberChange }
          />
        </div>
        <div>
          <button type="submit">add</button>
        </div>
      </form>
    </div>
  )
}

const Persons = ({ personsToShow, removeNumber }) => {
  return (
    <div>
        <ul>
          {personsToShow().map((person) => <Person key={person.id} name={person.name} 
                                            number={person.number} removeNumber={() => removeNumber(person.id, person.name)} />)}
        </ul>
    </div>
  )
}

const Notification = ({ message, error = false }) => {
  if (message === null) {
    return null
  }

  if (error) {
    return (
      <div className="error">
        {message}
      </div>
    )
  }
  return (
    <div className="notification">
      {message}
    </div>
  )
}

const App = () => {
  const [persons, setPersons] = useState([]) 
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [newFilter, setNewFilter] = useState('')
  const [notification, setNotification] = useState(null)
  const [err, setErr] = useState(false)

  useEffect(() => {
    personService.getAll().then((res) => {
      setPersons(res)
    })
  }, [])

  const addPerson = async (event) => {
    event.preventDefault()

    if (persons.some(e => e.number === newNumber)) {
      setErr(true)
      setNotification(`Number "${newNumber}" is already added to phonebook`)
      return
    } else if (persons.some(e => e.name === newName) 
        && window.confirm(`${newName} is already added to phonebook, replace the old nubmer with a new one?`)) {
      // Well, I shouldn't loop through numbers twice but... Too bad!
      const per = persons.find(e => e.name === newName)
      const changedPer = {...per, number: newNumber}


      const res = await personService.update(per.id, changedPer)

      setPersons(persons.map(person => person.id !== per.id ? person : res.data))
      setNotification(`Person ${newName} updated!`)
    } else {
      const person = {
        name: newName,
        number: newNumber,
      }
  
      const res = await personService.create(person)
      setPersons(persons.concat(res.data))
      setNotification(`Person ${newName} added!`)
    }

    setTimeout(() => {
      setErr(false)
      setNotification(null)
    }, 5000)
  }

  const handlePersonsChange = (event) => {
    setNewName(event.target.value);
  }
  
  const handleNumberChange = (event) => {
    setNewNumber(event.target.value);
  }

  const handleFilterChange = (event) => {
    setNewFilter(event.target.value);
  }

  const removeNumber = async (id, name) => {
    if (window.confirm(`Delete ${name} number?`)) {

      try {
        await personService.delete(id)
      } catch (e) {
        setErr(true)
        setNotification(`Person ${name} was already removed from the server!`)

        setTimeout(() => {
          setErr(false)
          setNotification(null)
        }, 5000)
      }
      
      setPersons(persons.filter((person) => id !== person.id))
    }
  }

  const personsToShow = () => {
    if (!newFilter) {
      return persons
    }

    return persons.filter((person) => {
      const re = new RegExp(newFilter, 'i')
      if (person.name.search(re) !== -1) return true
      return false
    })
  }

  return (
    <div>
      <h2>Phonebook</h2>
      <SearchForm newFilter={newFilter} handleFilterChange={handleFilterChange} />
      <h2>Add new a new person</h2>
      <Notification message={notification} error={err} />
      <NewPersonForm addPerson={addPerson} newName={newName} handlePersonsChange={handlePersonsChange} 
        newNumber={newNumber} handleNumberChange={handleNumberChange} />
      <h2>Numbers</h2>
      <Persons personsToShow={personsToShow} removeNumber={removeNumber}/>
    </div>
  )

}

export default App;
