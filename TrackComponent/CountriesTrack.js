import React from "react";
import numeral from "numeral";
import './countriesTrack.css';

function CountriesTrack({countries}) {
 return (
   <>
     <h2>Live Cases By Country</h2>
     <div className="table">
       {countries.map((country) => (
         <tr>
           <td>{country.country}</td>
           <td>
             <strong>{numeral(country.cases).format("0,0")}</strong>
           </td>
         </tr>
       ))}
     </div>
   </>
 );
}

export default CountriesTrack;
