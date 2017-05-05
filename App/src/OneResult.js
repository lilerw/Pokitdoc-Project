import React, {Component} from 'react';
import './OneResult.css'
class OneResult extends Component{

  render(){
    return(
      <div className="one-result" id={this.props.doc.npi} onClick={this.props.onClick}>
        <span id="name"> {this.props.doc.full_name} </span> <br/>
        Specialty: {this.props.doc.specialty_primary}<br/>
        Phone: {this.props.doc.phone}<br/>
        Location: {this.props.location}
      </div>
    );
  }
}

export default OneResult;
