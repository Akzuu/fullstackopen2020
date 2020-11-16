import React, { useState } from 'react'

const Person = (props) => {
  return (
    <div>
      {props.name}: {props.number}
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

const NewPersonForm = ({ addNote, newName, handlePersonsChange, newNumber, handleNumberChange }) => {
  return (
    <div>
      <form onSubmit={ addNote }>
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

const Persons = ({ personsToShow }) => {
  return (
    <div>
        <ul>
          {personsToShow().map((person) => <Person key={person.id} name={person.name} number={person.number} />)}
        </ul>
    </div>
  )
}

const App = () => {
  const [ persons, setPersons] = useState([
    { 
      id: 0,
      name: 'Arto Hellas',
      number: '0123456789'
    },
    { 
      id: 1, 
      name: 'Ada Lovelace', 
      number: '39-44-5323523' },
    { 
      id: 2, 
      name: 'Dan Abramov', 
      number: '12-43-234345' },
    { 
      id: 3,
      name: 'Mary Poppendieck',
      number: '39-23-6423122'
    }
  ]) 
  const [ newName, setNewName ] = useState('')
  const [ newNumber, setNewNumber ] = useState('')
  const [ newFilter, setNewFilter ] = useState('')

  const addNote = (event) => {
    event.preventDefault()

    if (persons.some(e => e.name === newName || e.number === newNumber)) {
      alert(`Name "${newName}" or number "${newNumber}" is already added to phonebook`)
      return
    }
    
    const person = {
      id: persons.length,
      name: newName,
      number: newNumber,
    }

    setPersons(persons.concat(person))
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
      <NewPersonForm addNote={addNote} newName={newName} handlePersonsChange={handlePersonsChange} newNumber={newNumber} handleNumberChange={handleNumberChange} />
      <h2>Numbers</h2>
      <Persons personsToShow={personsToShow}/>
    </div>
  )

}

export default App;
