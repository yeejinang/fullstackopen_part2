import { useState, useEffect } from 'react'
import axios from 'axios'

const App = () => {
	const [countries, setCountries] = useState([])

	const [filter, setFilter] = useState('')

	const handleFilter = (event) => {
		setFilter(event.target.value);
	}

	useEffect(() => {
		axios.get('https://restcountries.com/v3.1/all').then(response => {
			console.log('promise fulfilled')
			setCountries(response.data)})
	}, [])

	const countriesToShow = filter === '' ? countries : countries.filter(country => country.name.common.toLowerCase().includes(filter.toLowerCase()))

	return (
		<div>
			<p>find countries<input onChange={handleFilter}/></p>
			{ countriesToShow.length <= 10 ? countriesToShow.map(country => <p key={country.name.common}>{country.name.common}</p>) 
				: <p>Too many matches, specify another filter</p>}
		</div>
	);
};

export default App;