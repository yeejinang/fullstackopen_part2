import { useState, useEffect } from 'react'
import axios from 'axios'

const WeatherData = ({capital}) => {
	const [weather, setWeather] = useState([])

	useEffect(() => {
		const api_key = process.env.REACT_APP_API_KEY;

		axios.get(`https://api.openweathermap.org/data/2.5/weather?q=${capital}&units=metric&appid=${api_key}`)
			.then((response) => {setWeather(response.data)
			console.log(response.data)})
			.catch(error => console.log(error))
	}, [capital])

	const icon_url = weather.weather?.[0]?.icon

	return  (
		<div>
			<h3>Weather in {capital}</h3>
			<p>temperature {weather.main?.temp} Celcius</p>
			{icon_url && <img alt="weather_icon" src={`http://openweathermap.org/img/wn/${icon_url}.png`}/>}
			<p>wind {weather.wind?.speed} m/s</p>
		</div>
	)
}

const CountryInfo = ({country}) => {
	return (
	<div>
		<h1>{country.name.common}</h1>
		<p>capital {country.capital}</p>
		<p>area {country.area}</p>
		<h3>languages: </h3>
		<ul>
			{ Object.values(country.languages).map(language => <li key={language}>{language}</li>)}
		</ul>
		<img src={country.flags.png} alt={`${country.name.common} flags`} />
		<WeatherData capital={country.capital} />
	</div>)
}

const DisplayResult = ({countriesToShow, setFilter}) => {
	if (countriesToShow.length === 1)
		return (<CountryInfo country={countriesToShow[0]}/>)
	else if (countriesToShow.length <= 10)
		return (countriesToShow.map(country => 
			<CountriesList country={country} key={country.name.common} setFilter={setFilter}/>))
	else
		return (<p>Too many matches, specify another filter</p>)
}

const CountriesList = ({country, setFilter}) => {
	return (
		<div>
			<p>{country.name.common}
				<button value={country.name.common} onClick={e => setFilter(e.target.value)}>show</button>
			</p>
		</div>
	)
} 
const App = () => {
	const [countries, setCountries] = useState([])

	const [filter, setFilter] = useState('')

	useEffect(() => {
		axios.get('https://restcountries.com/v3.1/all').then(response => {
			console.log('promise fulfilled')
			setCountries(response.data)})
	},[])

	const countriesToShow = filter === '' ? countries : countries.filter(country => country.name.common.toLowerCase().includes(filter.toLowerCase()))

	return (
		<div>
			<p>find countries<input onChange={e => setFilter(e.target.value)}/></p>
			<DisplayResult countriesToShow={countriesToShow} setFilter={setFilter}/>
		</div>
	);
};

export default App;