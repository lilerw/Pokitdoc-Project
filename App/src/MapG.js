import React, {Component} from 'react';
import './MapG.css';

class MapG extends Component{


  render(){

    var address_string = (this.props.address.substring(0,2) === 'Po')? encodeURIComponent(this.props.address.slice(-9).substring(0,5)) : encodeURIComponent(this.props.address);
    console.log(address_string);
    if(address_string === null || address_string === '') address_string = "USA";
    const google_key = "AIzaSyCAjIVFES2R_5l51C1LkoOOWDGWHmtJqBo";
    var src_str = "https://www.google.com/maps/embed/v1/place?key="+ google_key +
    "&q="+address_string;

    return(
        <iframe
          frameBorder="0"
          src={src_str} allowFullScreen>
        </iframe>

    )
  }
}

export default MapG;
