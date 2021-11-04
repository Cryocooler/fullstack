import React, { useState, useEffect } from 'react'
import axios from 'axios'



const Weather = ( {defineState, apiKey,weatherCap} ) => {
  console.log('apikey', apiKey)

  /*useEffect(() => {
    console.log('effect')
    axios
      .get(`https://weatherstack.com/current?access_key=${apiKey}&query=${weatherCap}`)
      .then(response => {
        console.log('promise fulfilled')
        defineState(response.data)
      })
  }, []) */


  return (0
    )
}





const Filter = ( {input, onChange} ) => {


  return(
    <div>
      find countries
      <input value = {input} onChange = {onChange} />
    </div>
  )
}





const Countries = ({countries, appliedFilter, stateHandler, weatherState}) => {
  //console.log('passed countries', countries)

  const filteredCountries = 
    countries.filter((country, id) => country.name.common.toLowerCase()
    .includes(appliedFilter.toLowerCase()))
  
  const countryCount = filteredCountries.length
  //const countryLang = sliceCountry.map(country => country.languages)
  

  


  

  
  

  //console.log('country language', countryLang[0].map(language => language.name))
  //console.log('languages', sliceCountry.map(country => country.languages
   // .map(language => language.name)))
    
  if (countryCount > 10)  {
    return (
      <div>
        too many matches, specify another filter
      </div>
    )
  } else if (countryCount < 10 && countryCount > 1 )  {
    console.log('error triggered by cc 10 && > 1')
    

    return(
      <div>
          {filteredCountries.map((country)=> 
            <div key = {country.id}>  {country.name.common}
            <button onClick = {() => stateHandler(country.name.common)}>show</button> </div> )}
            
        </div>
    
    )

  } else if (countryCount === 1) {
     // infinite loop weatherState(filteredCountries.map(country => country.capital))
    return(
       
        <div>
         {filteredCountries.map(country => 
         <div key = {country.id}>
           <h1>{country.name.common}</h1>
           <div>capital {country.capital}</div>
           <div>population {country.population}</div>
           <h2>languages</h2>
           <ul>
           {Object.values(country.languages)
           .map(language => 
           <li key = {language.id}>{language}</li>)}
           </ul>
            <img src = {country.flags["png"]} alt = "flag" width = "120" height = "120"/>
         
         
           
          
           </div>
          )}



        </div>
  )
  }
  else {
    return(
      <div>
        <p>NO MATCHES</p>
      </div>
    )
  }
}

const App = () =>  {
  const [countries, setCountries] = useState([])
  const [newFilter, setNewFilter] = useState('')
  const [weatherCap, setWeatherCap] = useState([])
  // If conditional needs to be in the app component. The countries array is filtered 
  // based on the filter hook in app and passed to country component renderer. 
  // There needs to be a button for switch case 2. Clicking the button changes the filter
  // to the clicked country scope => case 3 of 1 country... or make a component for rendering
  // a single country instead of if statements in the countries rendering?
  // easiest to update filter state in the country component based on click.
  useEffect(() => {
    console.log('effect')
    axios
      .get('https://restcountries.com/v3.1/all')
      .then(response => {
        console.log('promise fulfilled')
        setCountries(response.data)
      })
  }, [])


  // Weather for capital. WEather data fetching implemented in separate component.
  // I thought that I could pass weatherstate to countries and update the state there when 
  // 1 country is filtered, but this triggers mass updates for setState.

  console.log('render', countries.length, 'countries')
  //console.log('map country to name', countries.map(country => country.name))
  const handleFilter = (event) => {
    console.log('filtered', event.target.value)
    setNewFilter(event.target.value)

  }

  const api_key = process.env.REACT_APP_API_KEY
  console.log('api key', api_key)
  console.log('weathercap', weatherCap)

  return (
    <div>
      
      <Filter input = {newFilter} onChange = {handleFilter}/>
      <Countries countries = {countries}
       appliedFilter = {newFilter}
        stateHandler = {setNewFilter}
        weatherState = {setWeatherCap} />
        

     
    </div>
  )
}

export default App
