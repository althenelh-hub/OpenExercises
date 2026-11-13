import { useState, useEffect } from 'react'
import axios from 'axios'
import countryService from './components/services/country.js'



const CountryRow = ({ name, expand }) => {
    return (
        <div>{name} <button onClick={() => expand(name) } >show</button></div>
    )
}
const CountryList = ({ arr, expand }) => {
    return (
        <div>
            {arr.map(c => <CountryRow key={c} expand={ expand } name={ c } />)}
        </div>
    )
}
const CountryFilter = ({ name, handleName}) => {
    return (
        <div>filter <input value={name} onChange={handleName} /></div>

    )
}
const CountryView = ({ country }) => {
    return (
        <>
            <h1>{country.name.official}</h1>
            <p>Capital {country.capital[0]}</p>
            <p>Area {country.area}</p>
            <h1>Languages</h1>
            <ul>
                {Object.values(country.languages).map(language => <li key={language} >{language}</li>)}
            </ul>
            <img src={country.flags.png} />
        </>
    )
}



function App() {
    const [countries, setCountries] = useState([])
    const [countryName, setCountryName] = useState('')
    const [filteredCountries, setFilteredCountries] = useState([])
    const [country, setCountry] = useState(null)
    //--------------------------------------------------------------------------------------------------------
    //get name of the countries
    useEffect(() => {
        countryService.getNames().then(response => { setCountries(response) })
        
    }, [])
    //-----------------------------------------------------------------------------------------------------------
    //fetches additional information about country
    const handleExpand = name => {
        countryService.getCountry(name)
            .then(response => {
                setFilteredCountries([name])
                setCountry(response.data)
            })
    }
    //----------------------------------------------------------------------------------------------------------------
    //update filter
    const handleCountryName = (event) => {
        const name = event.target.value
        //filter
        const filterTerm = name.toLowerCase()
        const filteredArr = countries
            .filter(c => c.official.toLowerCase().includes(filterTerm) || c.common.toLowerCase().includes(filterTerm))
            .map(c => c.official)
        //show view of the country by using filter
        if (filteredArr.length === 1) {
            //avoid re-renderig of the same country
            if (country === null || filteredArr[0] !== country.name.official) {
                handleExpand(filteredArr[0])
            }
        }
        //avoids absense of the view after filtering the same country more than one time
        else if (filteredCountries.length === 1) {
            setCountry(null)
            setFilteredCountries(filteredArr)
        }
        //sets filter
        else {
            setFilteredCountries(filteredArr)
        }
        setCountryName(name)
    }
    //---------------------------------------------------------------------------------------------------------------
    //rendering
    if (filteredCountries.length > 10) {
        return (
            <>
                <CountryFilter name={countryName} handleName={ handleCountryName } />
                too many matches
            </>
        )
    }
    else if (filteredCountries.length === 1) {
        return (
            <>
                <CountryFilter name={countryName} handleName={handleCountryName} />
                <CountryView country={country} />
            </>
        )
    }
    else if (filteredCountries.length === 0) {
        return (
            <>
                <CountryFilter name={countryName} handleName={handleCountryName} />
                no matches
            </>
        )
    }
    else {
        return (
            <>
                <CountryFilter name={countryName} handleName={handleCountryName} />
                <CountryList arr={filteredCountries} expand={handleExpand} />
            </>
        )
    }
    
    
}

export default App
