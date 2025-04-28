import React from 'react';
import { useState,useEffect } from 'react';
import Countries from './component/Countries';
import './App.css';


const url="https://restcountries.com/v3.1/all" ;  //prothome link ta declear krte hbe 

const App = () => {
const[isLoading,setIsLoading]=useState(true);  //then ei 3ta useState declear cz load,err egla link erupor depend krei hbe
const[error,setError]=useState(null);        //means age amra url nibo then oitar state decide krbo                  
const[countries,setCountries]=useState([]);
const[filteredCountries,setFilteredCountries]=useState([countries]);

const fetchData = async(url)=>{   
  setIsLoading(true);     //eta function jeta niche call kora hoise useEffect er vitore
try{
  const response=await fetch(url);           //url ta k fetch kre response e rakhbo
  const data = await response.json();         // response k json e convert kre data te rakhbo
setCountries(data);  
setFilteredCountries(data);             // setcountries a data set kre dibo taile shb countries data te chole ashbe 
setIsLoading(false);
setError(null);
}
catch(error){
  setIsLoading(false);
setError(error);
}
console.log(countries);
};

useEffect(()=>{
  fetchData (url);
},[]);

const handleRemoveCountry=(name)=>{
const filter=filteredCountries.filter((country)=>country.name.common !==name);setFilteredCountries(filter)
  };
    return <>
    <h2>Country App</h2>
    {isLoading && <p> . . . is Loading </p>}
    {error && <h2>{error.message}</h2> }
    {countries && (<Countries countries={filteredCountries} onRemoveCountry={handleRemoveCountry}/>)}
    </>
  };  
export default App;
