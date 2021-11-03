import React, { useState, useEffect } from 'react'
import axios from 'axios'


const Countries = ({countries, appliedFilter}) => {
  //console.log('passed countries', countries)

  const sliceCountry = 
    countries.filter(country => country.name.common.toLowerCase()
      .includes(appliedFilter.toLowerCase()))
  
  const countryCount = sliceCountry.map(country => country.name.common).length
  //const countryLang = sliceCountry.map(country => country.languages)
  
  const Country = sliceCountry
  const langs = Country.map(country => country.languages)
  console.log('langs',typeof(langs[0]))


  

  
  

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
    
    const handleClick = () => {
      console.log('hahahahah')
    }

    return(
      <div>
          {sliceCountry.map(country => 
            <div> {country.name.common}
            <button onClick = {handleClick}>show</button> </div> )}
            
        </div>
    
    )

  } else if (countryCount === 1) {
     
    return(
      
        <div>
         {sliceCountry.map(country => 
         <div>
           <h1>{country.name.common}</h1>
           <div>capital {country.capital}</div>
           <div>population {country.population}</div>
           <h2>languages</h2>
           <ul>
           {Object.values(country.languages)
           .map(language => 
           <li>{language}</li>)}
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
  const [newFilter, setNewFilter] = useState('swi')
  const [clicked, setClicked] = useState()
  // If conditional needs to be in the app component. The countries array is filtered 
  // based on the filter hook in app and passed to country component renderer. 
  // There needs to be a button for switch case 2. Clicking the button changes the filter
  // to the clicked country scope => case 3 of 1 country... or make a component for rendering
  // a single country instead of if statements in the countries rendering?
  useEffect(() => {
    console.log('effect')
    axios
      .get('https://restcountries.com/v3.1/all')
      .then(response => {
        console.log('promise fulfilled')
        setCountries(response.data)
      })
  }, [])
  console.log('render', countries.length, 'countries')
  //console.log('map country to name', countries.map(country => country.name))
  const handleFilter = (event) => {
    console.log('filtered', event.target.value)
    setNewFilter(event.target.value)
  }



  return (
    <div>
      find countries
      <input value = {newFilter} onChange = {handleFilter}/>
      <Countries countries = {countries} appliedFilter = {newFilter} />
    </div>
  )
}

export default App
