import { useState, useEffect } from 'react'
import axios from 'axios'
import Filter from './components/Filter'
import PersonForm from './components/PersonForm'
import Persons from './components/Persons'

const App = () => {
	const [persons, setPersons] = useState([])

	const [filter, setFilter] = useState('')

  const [newName, setNewName] = useState('')

  const [newNumber, setNewNumber] = useState('')

  useEffect(() => {
	axios
		.get('http://localhost:3001/persons')
		.then(response => {
			console.log('promise fulfilled')
			setPersons(response.data)
	})
  }, [])

  const personsToShow = filter === '' ? persons
  		: persons.filter(person => person.name.toLowerCase().includes(filter.toLowerCase()))

const handleFilter = (event) => {
	setFilter(event.target.value)
}

  const handleNameChange = (event) => {
	console.log(event.target.value);
 	setNewName(event.target.value);
  }

  const handleNumberChange = (event) => {
	console.log(event.target.value);
 	setNewNumber(event.target.value);
  }

  const handleSubmit = (event) => {
	event.preventDefault()
	if (newName)
	{
		const isDuplicate = persons.some(person => {
			if (person.name === newName)
				return true
			return false
		})
		if (isDuplicate)
			alert(`${newName} is already added to phonebook`)
		else
		{
			const personObject = {
				name: newName,
				number: newNumber,
				id: persons.length + 1,
			}
			setPersons(persons.concat(personObject));
		}
	}
  }

  return (
	<div>
      <h2>Phonebook</h2>
	  <Filter handleFilter={handleFilter} />
	  <h3>add a new</h3>
	  <PersonForm handleNameChange={handleNameChange} handleNumberChange={handleNumberChange} handleSubmit={handleSubmit} />
      <h3>Numbers</h3>
	  <Persons personsToShow={personsToShow} />
    </div>
  )
}

export default App
