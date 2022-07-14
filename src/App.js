import {useState, useEffect} from 'react'
import axios from 'axios';

function App() {
  const [input, setInput] = useState([]);
  const [countries, setCountries] = useState([]);
  const [state, setState] = useState(false);
  const [toggle, setToggle] = useState([]);

  useEffect(() => {
    const url = 'https://restcountries.com/v3.1/all'

    axios
      .get(url)
      .then(response => {
          setCountries([...countries, response.data]);
      })
  }, [])

  const handleInput = (e) => {
    const search = e.target.value.toLowerCase()
    if(search === ''){
      setInput([])
    } else {
      const filterArray = countries[0].filter(elem => elem.name.common.toLowerCase().indexOf(search) === 0)
      setInput(filterArray)
    }
  }

  const handleCountry = (e) => {
    setState(!state)
    setToggle(input[e.target.id]);
  }

  const render = () => {
    if(input.length > 10){
      return (
        <p>{'To Many Matches, Specify Another Filter'}</p>
      )
    } else if (input.length < 10 && input.length > 1){
      return (
        input.map((country,index) => <li key={`country-${index}`}>{country.name.common} <button onClick={handleCountry} id={index}>Show Country</button></li>)
      )
    } else {
      return (
        input.map((country,index) => 
          <li key={`country-${index}`}>
            <h2 >{country.name.common}</h2>
            <p><strong>Capital: </strong>{country.capital}</p>
            <p><strong>Population: </strong>{country.population}</p>
            <p><strong>Languages: </strong>{country.languages !== undefined ? Object.values(country.languages).map((elem,index) => <span key={`lang-${index}`}>{elem} / </span>):''}</p>
            <img src={country.flags.png} alt="Country Flag" style={{height: "40px"}} />
          </li>)
      )
    }
  }

  return (
    <div>
      <h1>Search a Country</h1>
      <br />
      <p>Filter</p>
      <input onChange={handleInput} />
      <br />
      <ul>{render()}</ul>
      <ul>{state ? 
        <li>
          <h2 >{toggle.name.common}</h2>
          <p><strong>Capital: </strong>{toggle.capital}</p>
          <p><strong>Population: </strong>{toggle.population}</p>
          <p><strong>Languages: </strong>{toggle.languages !== undefined ? Object.values(toggle.languages).map((elem,index) => <span key={`lang-${index}`}>{elem} / </span>):''}</p>
          <img src={toggle.flags.png} alt="Country Flag" style={{height: "40px"}} />
        </li> : ''}
      </ul>
    </div>
  );
}

export default App;
