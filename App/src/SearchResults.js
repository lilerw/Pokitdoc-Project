import React, {Component} from 'react';
import OneResult from './OneResult';
import MapG from './MapG';
import './SearchResults.css';

class SearchResults extends Component{
  constructor(props){
    super(props);
    this.makeRequest = this.makeRequest.bind(this);
  }

  makeRequest(){
    var xhr = new XMLHttpRequest();
    xhr.open('GET', "http://127.0.0.1:8081/by-city/Charleston", false);
    xhr.send();
    return JSON.parse(xhr.responseText);
  }

  render(){
    //const o_string = makeRequest();

    return(
      <div id="results-panel">
        <div id="info-panel">
            <OneResult name="Ryan Lile" something="some" phone="(555)555-555"/>
            <OneResult name="Bill Guy" something="Thing" phone="(555)555-555"/>
            <OneResult name="Mike Ball" something="this" phone="(555)555-555"/>
            <OneResult name="Tim Kay" something="this" phone="(555)555-555"/>
            <OneResult name="Tim Kay" something="this" phone="(555)555-555"/>
        </div>
        <div id="map-panel">
          <MapG address="121 King Charles Cir, Summerville SC" />
        </div>
      </div>
    );
  }
}

export default SearchResults;
