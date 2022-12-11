import { useState, useEffect } from 'react'
import Filter from './components/Filter'
import PersonForm from './components/PersonForm'
import Persons from './components/Persons'
import personsServices from './services/persons'
import Notification from './components/Notification'
import './index.css'

const App = () => {
	const [persons, setPersons] = useState([])
	const [filter, setFilter] = useState('')
	const [newName, setNewName] = useState('')
	const [newNumber, setNewNumber] = useState('')
	const [msg, setNewMsg] = useState('')
	const [error, setError] = useState(false)

  useEffect(() => {
	personsServices.getAll()
		.then(initialPersons => setPersons(initialPersons))
  }, [])

//   const personsToShow = filter === '' ? persons
//   		: persons.filter(person => person.name.toLowerCase().includes(filter.toLowerCase()))

// const countriesToShow = filter === '' ? countries : countries.filter(country => country.name.common.toLowerCase().includes(filter.toLowerCase()))

const personsToShow = filter === '' ? persons : persons.filter(person => person.name.toLowerCase().includes(filter.toLowerCase()))

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
								.then(() => {
									setError(false)
									setNewMsg(`${newName}'s number was updated!`)
									setTimeout(() => {
										setNewMsg(null)}, 5000)
								})
								.then(setPersons(persons.map(person => {
									if (person.id === personInfo.id)
										return {...person, number: newNumber}
									return person
								})))
								.catch(err => {
									setError(true)
									setNewMsg(`Information was removed from server!`)
									console.log(`Information of ${newName} was removed from server!`)
								})
			}
			else
				alert(`${newName} is already added to phonebook`)
		}
		else
		{
			const personObject = {
				name: newName,
				number: newNumber,
				// id: Math.max(persons.map(person => {return person.id})) + 1,
			}
			personsServices.create(personObject)
				.then((result) => {
					console.log(result)
					setError(false)
					setNewMsg(`Added ${newName} into phonebook!`)
					setTimeout(() => {setNewMsg(null)}, 5000)
					personObject.id = result.id
					setPersons(persons.concat(personObject))})
				.catch(error => {
					console.log(error.response.data.error)
					setError(true)
					setNewMsg(error.response.data.error)
				});
		}
	}
  }

  const handleDelete = (name, id) => {
	window.confirm(`confirm delete ${name}?`)
	console.log(id)
	personsServices.remove(id).then(setPersons(persons.filter((person) => person.id !== id)))
  }

  return (
	<div>
		{msg && <Notification message={msg} error={error}/>}
      <h2>Phonebook</h2>
	  <Filter setFilter={setFilter} />
	  <h3>add a new</h3>
	  <PersonForm handleNameChange={handleNameChange} handleNumberChange={handleNumberChange} handleSubmit={handleSubmit} />
      <h3>Numbers</h3>
	  <Persons personsToShow={personsToShow} handleDelete={handleDelete}/>
    </div>
  )
}

export default App
