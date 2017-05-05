import React, {Component} from 'react';
import './MoreInfo.css';

class MoreInfo extends Component{
  constructor(props){
    super(props);
    console.log(this.props.doc);
  }

  renderNoDoc(){
    return(
        <h1> Select a doctor to get more infomation about them.</h1>
    );
  }

  renderDoc(){
    return(
      <span>
        <h1> {this.props.doc.full_name}</h1>
        <table id="info_table">
        <tbody>
          <tr>
            <td>NPI: </td>
            <td>{this.props.doc.npi}</td>
          </tr>
          <tr>
            <td>gender: </td>
            <td>{this.props.doc.gender}</td>
          </tr>
          <tr>
            <td>degree: </td>
            <td>{(this.props.doc.degree !== null)? this.props.doc.degree : "None"}</td>
          </tr>
          <tr>
            <td>hospital privileges: </td>
            <td>{(this.props.doc.hospital_privileges !== null)? this.props.doc.hospital_privileges : "None"}</td>
          </tr>
          <tr>
            <td>languages:</td>
            <td>{(this.props.doc.languages !== null)? this.props.doc.languages : "None"}</td>
          </tr>
          <tr>
            <td>specialty: </td>
            <td>{this.props.doc.specialty.map(cl => {
              return cl.classification;
            })}</td>
          </tr>
          <tr>
            <td>criminal history:</td>
            <td>{(this.props.doc.criminal_history !== null)? this.props.doc.criminal_history : "None"}</td>
          </tr>
          <tr>
            <td>disciplinary history:</td>
            <td>{(this.props.doc.disciplinary_history !== null)? this.props.doc.disciplinary_history : "None"}</td>
          </tr>
          <tr>
            <td>med school:</td>
            <td>{(this.props.doc.med_school !== null)? this.props.doc.med_school : "None"}</td>
          </tr>




          </tbody>
        </table>

      </span>
    );
  }

  render(){
    return(
      <span>
        {(this.props.doc === undefined || this.props.doc.length === 0)?
          this.renderNoDoc()
          : this.renderDoc()}
      </span>
    );
  }
}

export default MoreInfo;
