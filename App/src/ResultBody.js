import React, {Component} from 'react';
import MapG from './MapG';
import OneResult from './OneResult';
import MoreInfo from './MoreInfo';
import './ResultBody.css';
import axios from 'axios';

class ResultBody extends Component{
  constructor(props){
    super(props);
    this.state={
      city: this.props.location,
      selected_doc: [],
      results: [],
      loading: true,
    };

  }

  getWebServiceURL(){
    if(this.props.location === '' && this.props.specialty === ''){
      return('http://127.0.0.1:8081/webget')
    }
    else if(this.props.location === ''){
      //console.log('specialty');
      return ('http://127.0.0.1:8081/webgetspecialty/'+this.props.specialty);
    }
    else if(this.props.specialty === ''){
      //console.log('zip');
      return ('http://127.0.0.1:8081/webgetzip/'+this.props.location);
    }
    else{
      //console.log('both');
      return('http://127.0.0.1:8081/webget/'+this.props.location+'/'+this.props.specialty);
    }
  }

  componentDidMount(){
    axios.get(this.getWebServiceURL())
      .then(res => {
        //console.log(res.data);
        console.log('inthen');
        const results = (res.data !== 'None')? res.data.map(obj => obj): res.data;
        console.log(results);
        this.setState({
          results: results,
          loading: false,
          error: null
        });
      })
      .catch(err => {
        console.log('in catch');
      //Something went wrong save the error in state and re-render
        this.setState({
          loading: false,
          error: err
        });
      });
  }

  renderLoading() {
    return <div>Loading...</div>;
  }

  renderError() {
    return(
      <div id="results">
        Uh oh: {this.state.error.message}
      </div>
    );
  }

  getCorrectAddress(doc){
    //console.log(doc.full_name);
    //console.log("providedzip: " +this.props.location);

    for(var x = 0; x < doc.locations.length; x++){
        var compare_zip = (this.props.location.length > 5)? doc.locations[x].zipcode: doc.locations[x].zipcode.substring(0,5);
        //console.log("loc.zipcode: "+compare_zip);
      if(compare_zip === this.props.location){
        //console.log("match");
        return doc.locations[x].address_lines +' '+ doc.locations[x].city+' '+doc.locations[x].state+' '+ doc.locations[x].zipcode;
      }
    }
    return doc.locations[0].address_lines +' '+ doc.locations[0].city+' '+doc.locations[0].state+' '+ doc.locations[0].zipcode;

  }

  renderResults(){
    console.log('renderResults');
    if(this.state.error){
      console.log('error');
      return this.renderError();
    }
    console.log('if none');
    if(this.state.results === 'None'){
      console.log('in if none');
      return(
        <span>
          <h1>NO DOCTORS WITH SELECTED FILTERS</h1>
          <a href="index.html"><h1>Try Different Filters</h1></a>
        </span>
      );
    }
    console.log(this.state.results);
    return(
      <span>
        {this.state.results.map(doc => {
          var address = this.getCorrectAddress(doc);
          let boundItemClick = this.onResultClick.bind(this, address, doc);
          return <OneResult key={doc.npi} doc={doc} location={address} onClick={boundItemClick} />
          }
        )}
      </span>
    );
  }

  onResultClick(address, doc, e){
    this.setState({city: address,
                    selected_doc: doc});
    var elements = document.getElementsByClassName("one-result");
    for (var i=0;i<elements.length; i++){
      elements[i].style.backgroundColor="white";
    }
    document.getElementById(doc.npi).style.backgroundColor="cyan";
  }



  render(){
    return(
      <div id="result_container">
        <div id="results">
          {this.state.loading ?
            this.renderLoading()
            : this.renderResults()}
        </div>
        <div id="map">
          <MapG address={this.state.city} />
        </div>
        <div id="info_panel">
          <MoreInfo doc={this.state.selected_doc}/>
        </div>
      </div>
    );
  }
}

export default ResultBody;
