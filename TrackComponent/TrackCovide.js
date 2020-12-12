import { FormControl, MenuItem, Select } from '@material-ui/core';
import React, { useEffect, useState } from 'react';
import CardInfo from './CardInfo';
import CountriesTrack from './CountriesTrack';
import LineGraph from './LineGraph';
import Map from './Map';
import "./trackCovid.css";
import "leaflet/dist/leaflet.css";
import { sortData, prettyPrintStat } from "./util";
import numeral from "numeral";

function TrackCovide() {
const [country, setInputCountry] = useState("worldwide");
const [countryInfo, setCountryInfo] = useState({});
const [countries, setCountries] = useState([]);
const [mapCountries, setMapCountries] = useState([]);
const [tableData, setTableData] = useState([]);
const [casesType, setCasesType] = useState("cases");
const [mapCenter, setMapCenter] = useState({ lat: 34.80746, lng: -40.4796 });
const [mapZoom, setMapZoom] = useState(3);

 useEffect(() => {
   fetch("https://disease.sh/v3/covid-19/all")
     .then((response) => response.json())
     .then((data) => {
       setCountryInfo(data);
     });
 }, []);

 useEffect(() => {
   const getCountriesData = async () => {
     fetch("https://disease.sh/v3/covid-19/countries")
       .then((response) => response.json())
       .then((data) => {
         const countries = data.map((country) => ({
           name: country.country,
           value: country.countryInfo.iso2,
         }));
         let sortedData = sortData(data);
         setCountries(countries);
         setMapCountries(data);
         setTableData(sortedData);
       });
   };

   getCountriesData();
 }, []);


 const onCountryChange = async (e) => {
   const countryCode = e.target.value;

   const url =
     countryCode === "worldwide"
       ? "https://disease.sh/v3/covid-19/all"
       : `https://disease.sh/v3/covid-19/countries/${countryCode}`;
   await fetch(url)
     .then((response) => response.json())
     .then((data) => {
       setInputCountry(countryCode);
       setCountryInfo(data);
       setMapCenter([data.countryInfo.lat, data.countryInfo.long]);
       setMapZoom(4);
     });
 };


return (
  <div className="track_all">
    <div className="track_header">
      <div className="track_header_title">
        <h1 className="track_header_title_h1">Sujina -</h1>
        <h1> Covid-19 Tracker</h1>
      </div>
      <div className="track_header_dropDown">
        <FormControl className="track_header_dropDown_form">
          <Select
            onChange={onCountryChange}
            className="track_header_dropDown_form_select"
            value={country}
            variant="outlined"
          >
            <MenuItem value="worldwide">Worldwide</MenuItem>
            {countries.map((country) => (
              <MenuItem value={country.value}>{country.name}</MenuItem>
            ))}
          </Select>
        </FormControl>
      </div>
    </div>
    <div className="track_cards">
      <CardInfo
        isRed
        onClick={(e) => setCasesType("cases")}
        title="Cases"
        active={casesType === "cases"}
        cases={prettyPrintStat(countryInfo.todayCases)}
        total={"total :" + prettyPrintStat(countryInfo.cases)}
        styleColor="red"
      />
      <CardInfo
        onClick={(e) => setCasesType("recovered")}
        title="Recovered"
        active={casesType === "recovered"}
        cases={prettyPrintStat(countryInfo.todayRecovered)}
        total={"total :" + prettyPrintStat(countryInfo.recovered)}
        styleColor="green"
      />
      <CardInfo
        isRed
        onClick={(e) => setCasesType("deaths")}
        title="Deaths"
        styleColor="red"
        active={casesType === "deaths"}
        cases={prettyPrintStat(countryInfo.todayDeaths)}
        total={"total :" + prettyPrintStat(countryInfo.deaths)}
      />
    </div>
    <div className="track_body">
      <div className="track_body_map">
        <Map
          countries={mapCountries}
          casesType={casesType}
          center={mapCenter}
          zoom={mapZoom}
        />
      </div>
      <div className="track_body_left">
        <CountriesTrack countries={tableData} />
        <LineGraph casesType={casesType} />
      </div>
    </div>
    <div className="final_info_track">
      <p>Morocco</p>
      <a href="https://www.linkedin.com/in/bargady-ahmed-082b30177">
        @Ahmed Bargady
      </a>
    </div>
  </div>
);
}

export default TrackCovide
