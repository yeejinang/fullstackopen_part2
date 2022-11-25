import { useState, useEffect } from 'react'
import Filter from './components/Filter'
import PersonForm from './components/PersonForm'
import Persons from './components/Persons'
import personsServices from './services/persons'

const App = () => {
	const [persons, setPersons] = useState([])

	const [filter, setFilter] = useState('')

  const [newName, setNewName] = useState('')

  const [newNumber, setNewNumber] = useState('')

  useEffect(() => {
	personsServices.getAll()
		.then(initialPersons => setPersons(initialPersons))
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
		let personInfo
		const isDuplicate = persons.some(person => {
			if (person.name === newName)
			{
				personInfo = person
				return true
			}
			return false
		})
		if (isDuplicate)
		{
			if (newNumber !== personInfo.number)
			{
				window.confirm(`${newName} is already added to phonebook, replace the old number with the new one?`)
				personsServices.update(personInfo.id, {...personInfo , number: newNumber})
								.then(setPersons(persons.map(person => {
									if (person.id === personInfo.id)
										return {...person, number: newNumber}
									return person
								})))
			}
			else
				alert(`${newName} is already added to phonebook`)
		}
		else
		{
			const personObject = {
				name: newName,
				number: newNumber,
				id: Math.max(persons.map(person => {return person.id})) + 1,
			}
			personsServices.create(personObject)
				.then(setPersons(persons.concat(personObject)));
		}
	}
  }

  const handleDelete = (name, id) => {
	window.confirm(`confirm delete ${name}?`)
	personsServices.remove(id).then(setPersons(persons.filter((person) => person.id !== id)))
  }

  return (
	<div>
      <h2>Phonebook</h2>
	  <Filter handleFilter={handleFilter} />
	  <h3>add a new</h3>
	  <PersonForm handleNameChange={handleNameChange} handleNumberChange={handleNumberChange} handleSubmit={handleSubmit} />
      <h3>Numbers</h3>
	  <Persons personsToShow={personsToShow} handleDelete={handleDelete}/>
    </div>
  )
}

export default App
